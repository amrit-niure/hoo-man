// app/employee/[id]/documents/actions.ts
"use server";

import { requireUser } from "@/app/utils/hooks";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateEmployeeDocuments(
documents: string[] | null) {
    const user = await requireUser();
    if (!user?.employee) return null;
    const employeeId = user?.employee.id;
  try {

    await prisma.employee.update({
      where: { id: employeeId },
      data: documents !== null ? { documents: { push: documents } } : {},
    });

    revalidatePath(`/employee/${employeeId}/documents`);
    revalidatePath(`/employee/${employeeId}`);
    return { success: true, message: "Documents updated successfully" };
  } catch (error) {
    console.error("Error updating documents:", error);
    return { success: false, message: "Failed to update documents" };
  }
}