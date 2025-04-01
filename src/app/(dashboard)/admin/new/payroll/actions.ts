"use server";
import { prisma as db } from "@/lib/db";
import { calculateTax } from "./calculate-tax";
import { getCurrentUser } from "@/lib/current-user";
export async function calculateEmployeeHours(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ) {
    const attendances = await db.attendance.findMany({
      where: {
        employeeId,
        clockInTime: { gte: startDate },
        clockOutTime: { lte: endDate },
      },
    });
  
    return attendances.reduce((total, record) => {
      return total + (record.totalHours || 0);
    }, 0);
  }


  // actions/payroll.ts
export async function createPayslip(
  employeeId: string,
  payrollRunId: string,
  periodStart: Date,
  periodEnd: Date
) {
  // 1. Get employee data
  const employee = await db.employee.findUnique({
    where: { id: employeeId },
    include: {
      taxInformation: true,
      superannuation: true,
      bankDetails: true,
    },
  });

  if (!employee) throw new Error("Employee not found");

  // 2. Calculate hours worked
  const hoursWorked = await calculateEmployeeHours(employeeId, periodStart, periodEnd);

  // 3. Calculate pay components
  const hourlyRate = 25; // Should come from employee record
  const grossPay = hoursWorked * hourlyRate;
  
  // Tax calculation (simplified)
  const taxAmount = calculateTax(grossPay);
  
  // Superannuation (Australia)
  const superRate = employee.superannuation?.contributionRate || 0.11;
  const superAmount = grossPay * superRate;

  // 4. Create payslip
  return await db.payslip.create({
    data: {
      employeeId,
      payrollRunId,
      payPeriodStart: periodStart,
      payPeriodEnd: periodEnd,
      grossAmount: grossPay,
      taxAmount,
      superAmount,
      leaveDeductions: 0, // Can add leave calculations
      netAmount: grossPay - taxAmount,
      hourlyRate,
      hoursWorked,
      paymentStatus: "PENDING",
      paymentMethod: "BANK_TRANSFER",
      deductions: 0, // Default value for deductions
      paymentDate: new Date(), // Set payment date to current date
    },
  });
}












// actions/payroll.ts
export async function createAndProcessPayrollRun(
  formData: FormData
) {
  const user = await getCurrentUser();
  if (!user || !user.companyProfileId) {
    throw new Error("Unauthorized");
  }

  // 1. Create the payroll run record
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
      totalGross: 0, // Default value
      totalNet: 0,   // Default value
      totalTax: 0,   // Default value
      totalSuper: 0, // Default value
    },
  });

  // 2. Get all active employees
  const employees = await db.employee.findMany({
    where: { 
      companyProfileId: user.companyProfileId,
      status: "ACTIVE" 
    },
  });

  // 3. Generate payslips for each employee
  const payslips = await Promise.all(
    employees.map(employee => 
      createPayslip(
        employee.id, 
        payrollRun.id, 
        payrollRun.payPeriodStart, 
        payrollRun.payPeriodEnd
      )
    )
  );

  // 4. Calculate totals
  const totals = payslips.reduce((acc, payslip) => ({
    gross: acc.gross + payslip.grossAmount,
    net: acc.net + payslip.netAmount,
    tax: acc.tax + payslip.taxAmount,
    super: acc.super + payslip.superAmount,
  }), { gross: 0, net: 0, tax: 0, super: 0 });

  // 5. Update payroll run with totals
  await db.payrollRun.update({
    where: { id: payrollRun.id },
    data: {
      totalGross: totals.gross,
      totalNet: totals.net,
      totalTax: totals.tax,
      totalSuper: totals.super,
      status: "READY_FOR_PROCESSING",
    },
  });

  return payrollRun;
}

import { stripe } from "@/lib/stripe";

export async function processPayroll(payrollRunId: string) {
  const user = await getCurrentUser();
  if (!user?.companyProfileId) throw new Error("Unauthorized");

  // 1. Get payroll run with validation
  const payrollRun = await db.payrollRun.findUnique({
    where: { 
      id: payrollRunId,
      companyProfileId: user.companyProfileId,
      status: "READY_FOR_PROCESSING"
    },
    include: {
      payslips: {
        include: {
          employee: {
            include: {
              bankDetails: {
                where: { isPrimary: true, verified: true }
              }
            }
          }
        }
      }
    }
  });

  if (!payrollRun) throw new Error("Payroll run not found");

  // 2. Validate all payslips have verified bank accounts
  const invalidPayslips = payrollRun.payslips.filter(
    p => !p.employee.bankDetails[0]?.verified
  );

  if (invalidPayslips.length > 0) {
    await db.payrollRun.update({
      where: { id: payrollRunId },
      data: { status: "FAILED" }
    });
    return {
      success: false,
      error: `${invalidPayslips.length} employees need to verify bank details`
    };
  }

  // 3. Update status to processing
  await db.payrollRun.update({
    where: { id: payrollRunId },
    data: { status: "PROCESSING" }
  });

  try {
    // 4. Process payments
    const transferGroup = `payrun_${payrollRunId}`;
    const payments = await Promise.all(
      payrollRun.payslips.map(async (payslip) => {
        const bankAccount = payslip.employee.bankDetails[0];
        if (!bankAccount?.stripeBankToken) {
          throw new Error(`No verified bank account for employee ${payslip.employeeId}`);
        }

        // Create transfer
        const transfer = await stripe.transfers.create({
          amount: Math.round(payslip.netAmount * 100),
          currency: "aud",
          destination: bankAccount.stripeBankToken,
          transfer_group: transferGroup,
          metadata: {
            payslip_id: payslip.id,
            employee_id: payslip.employeeId,
            payroll_run_id: payrollRunId
          }
        });

        return transfer.id;
      })
    );

    // 5. Update records
    await db.$transaction([
      db.payslip.updateMany({
        where: { payrollRunId },
        data: {
          paymentStatus: "PROCESSED",
          paymentDate: new Date(),
          stripePaymentId: payments.join(",")
        }
      }),
      db.payrollRun.update({
        where: { id: payrollRunId },
        data: {
          status: "COMPLETED",
          processedAt: new Date(),
          stripeBatchId: transferGroup
        }
      })
    ]);

    return { success: true };
  } catch (error) {
    // 6. Handle failures
    await db.payrollRun.update({
      where: { id: payrollRunId },
      data: { status: "FAILED" }
    });

    console.error("Payroll processing failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Payment processing failed"
    };
  }
}