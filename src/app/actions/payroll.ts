"use server";

import { getCurrentUser } from "@/lib/current-user";
import {  prisma as db } from "@/lib/db";
import { revalidatePath } from "next/cache";


// Create a new payroll run
export async function createPayrollRun(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !user.companyProfileId) {
    throw new Error("Unauthorized");
  }

  const { name, description, payPeriodStart, payPeriodEnd } = Object.fromEntries(formData);

  const payrollRun = await db.payrollRun.create({
    data: {
      name: name as string,
      description: description as string,
      payPeriodStart: new Date(payPeriodStart as string),
      payPeriodEnd: new Date(payPeriodEnd as string),
      status: "DRAFT",
      processedById: user.id,
      companyProfileId: user.companyProfileId,
      totalGross: 0,
      totalNet: 0,
      totalTax: 0,
      totalSuper: 0,
    },
  });

  revalidatePath("/dashboard/payroll");
  return payrollRun;
}

// Process payroll run via Stripe
export async function processPayrollRun(payrollRunId: string) {
  const user = await getCurrentUser();
  if (!user || !user.companyProfileId) {
    throw new Error("Unauthorized");
  }

  // Get payroll run with all payslips and employee details
  const payrollRun = await db.payrollRun.findUnique({
    where: { id: payrollRunId, companyProfileId: user.companyProfileId },
    include: {
      payslips: {
        include: {
          employee: {
            include: {
              bankDetails: true,
            },
          },
        },
      },
    },
  });

  if (!payrollRun) {
    throw new Error("Payroll run not found");
  }

  // Update status to processing
  await db.payrollRun.update({
    where: { id: payrollRunId },
    data: { status: "PROCESSING" },
  });

  try {
    // Create Stripe batch transfer
    // const transferGroup = `payroll_${payrollRunId}`;
    // const transfers = payrollRun.payslips.map((payslip: any) => ({
    //   amount: Math.round(payslip.netAmount * 100), // Convert to cents
    //   currency: "aud",
    //   destination: payslip.employee.bankDetails[0]?.accountNumber, // Use primary bank account
    //   metadata: {
    //     payslipId: payslip.id,
    //     employeeId: payslip.employeeId,
    //     payrollRunId: payrollRunId,
    //   },
    //   transfer_group: transferGroup,
    // }));

    // Process payments via Stripe
    // const transferResults = await Promise.all(
    //   transfers.map(async (transfer) => {
    //     return await stripe.transfers.create(transfer);
    //   })
    // );

    // Update payroll run and mark as completed
    await db.payrollRun.update({
      where: { id: payrollRunId },
      data: {
        status: "COMPLETED",
        processedAt: new Date(),
      },
    });

    // Update all payslips as processed
    await db.payslip.updateMany({
      where: { payrollRunId: payrollRunId },
      data: {
        paymentStatus: "PROCESSED",
        paymentDate: new Date(),
      },
    });

    revalidatePath("/dashboard/payroll");
    return { success: true };
  } catch (error) {
    // Update payroll run as failed if error occurs
    await db.payrollRun.update({
      where: { id: payrollRunId },
      data: { status: "FAILED" },
    });

    throw error;
  }
}

// Generate payslips for a payroll run
export async function generatePayslips(payrollRunId: string) {
  const user = await getCurrentUser();
  if (!user || !user.companyProfileId) {
    throw new Error("Unauthorized");
  }

  const payrollRun = await db.payrollRun.findUnique({
    where: { id: payrollRunId, companyProfileId: user.companyProfileId },
  });

  if (!payrollRun) {
    throw new Error("Payroll run not found");
  }

  // Get all active employees
  const employees = await db.employee.findMany({
    where: {
      companyProfileId: user.companyProfileId,
      status: "ACTIVE",
    },
    include: {
      taxInformation: true,
      superannuation: true,
      attendances: {
        where: {
          clockInTime: { gte: payrollRun.payPeriodStart },
          clockOutTime: { lte: payrollRun.payPeriodEnd },
        },
      },
      leaveRequests: {
        where: {
          status: "APPROVED",
          startDate: { lte: payrollRun.payPeriodEnd },
          endDate: { gte: payrollRun.payPeriodStart },
        },
      },
    },
  });

  // Calculate payslips for each employee
  const payslips = await Promise.all(
    employees.map(async (employee) => {
      // Calculate total hours worked
      const totalHours = employee.attendances.reduce(
        (sum, attendance) => sum + (attendance.totalHours || 0),
        0
      );

      // Get employee's hourly rate (you might want to store this in the employee model)
      const hourlyRate = 25; // Default rate, should be configurable

      // Calculate gross pay
      const grossAmount = totalHours * hourlyRate;

      // Calculate tax (simplified - you'd want to implement proper tax calculation)
      const taxAmount = grossAmount * 0.2; // 20% tax for example

      // Calculate superannuation
      const superRate = employee.superannuation?.contributionRate || 0.11;
      const superAmount = grossAmount * superRate;

      // Calculate leave deductions (simplified)
      const leaveDeductions = employee.leaveRequests.length * hourlyRate * 8; // Assuming 8 hours per day

      // Calculate net pay
      const netAmount = grossAmount - taxAmount - superAmount - leaveDeductions;

      // Create payslip
      return await db.payslip.create({
        data: {
          employeeId: employee.id,
          payPeriodStart: payrollRun.payPeriodStart,
          payPeriodEnd: payrollRun.payPeriodEnd,
          grossAmount,
          netAmount,
          deductions: taxAmount + superAmount + leaveDeductions,
          taxAmount,
          superAmount,
          leaveDeductions,
          hourlyRate,
          hoursWorked: totalHours,
          paymentMethod: "BANK_TRANSFER",
          paymentStatus: "PENDING",
          paymentDate: "", 
          payrollRunId: payrollRun.id,
        },
      });
    })
  );

  // Update payroll run totals
  const totalGross = payslips.reduce((sum, payslip) => sum + payslip.grossAmount, 0);
  const totalNet = payslips.reduce((sum, payslip) => sum + payslip.netAmount, 0);
  const totalTax = payslips.reduce((sum, payslip) => sum + payslip.taxAmount, 0);
  const totalSuper = payslips.reduce((sum, payslip) => sum + payslip.superAmount, 0);

  await db.payrollRun.update({
    where: { id: payrollRunId },
    data: {
      totalGross,
      totalNet,
      totalTax,
      totalSuper,
    },
  });

  revalidatePath(`/dashboard/payroll/${payrollRunId}`);
  return payslips;
}