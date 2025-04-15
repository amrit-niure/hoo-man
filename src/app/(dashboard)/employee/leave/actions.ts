"use server"
import { prisma } from "@/lib/db";
import { LeaveType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function submitLeaveRequest(data: {
  employeeId: string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
}) {
  try {
    // Calculate the number of leave days requested
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const leaveDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

    const totalLeaveEntitlement = 20;

    // Fetch all approved leave records for the employee
    const approvedLeaves = await prisma.leave.findMany({
      where: {
        employeeId: data.employeeId,
        status: "APPROVED",
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });

    // Calculate the total leave days already taken
    const leaveDaysTaken = approvedLeaves.reduce((total, leave) => {
      const leaveStart = new Date(leave.startDate);
      const leaveEnd = new Date(leave.endDate);
      const daysTaken = Math.ceil(
        (leaveEnd.getTime() - leaveStart.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
      return total + daysTaken;
    }, 0);

    // Calculate the remaining leave balance
    const remainingLeaveBalance = totalLeaveEntitlement - leaveDaysTaken;

    // Check if the employee has enough leave balance
    if (remainingLeaveBalance < leaveDays) {
      return { success: false, error: "Insufficient leave balance" };
    }

    // Create the leave record
    await prisma.leave.create({
      data: {
        ...data,
        status: "PENDING",
      },
    });

    revalidatePath("/employee/leaves");
    return { success: true };
  } catch (error) {
    console.error("Error submitting leave request:", error);
    return { success: false, error: "Failed to submit leave request" };
  }
}