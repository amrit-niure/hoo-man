// actions/leave-actions.ts (Server Actions)
"use server";

import { revalidatePath } from "next/cache";
import { LeaveStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function updateLeaveStatus(leaveId: string, status: LeaveStatus) {
  try {
    await prisma.leave.update({
      where: { id: leaveId },
      data: { status },
    });
    revalidatePath("/leaves");
    return { success: true };
  } catch (error) {
    console.error("Error updating leave status:", error);
    return { success: false, error: "Failed to update leave status" };
  }
}