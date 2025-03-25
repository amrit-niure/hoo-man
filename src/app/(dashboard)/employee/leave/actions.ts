
"use server"
import { prisma } from "@/lib/db";
import { LeaveType } from "@prisma/client";
import { revalidatePath } from "next/cache";

// actions/leave-actions.ts (Add this to existing actions)
export async function submitLeaveRequest(data: {
    employeeId: string;
    leaveType: LeaveType;
    startDate: Date;
    endDate: Date;
    reason: string;
  }) {
    try {
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