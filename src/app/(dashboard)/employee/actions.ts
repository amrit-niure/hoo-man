// app/actions/attendance.ts
"use server";
import "server-only";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { response } from "@/app/utils/response";
import { requireUser } from "@/app/utils/hooks";

export async function clockIn() {
  try {
    const user = await requireUser();
    if (!user || !user.employee) {
      return response(false, "Unauthorized or employee not found", null);
    }

    // Check if there's already an active attendance for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId: user.employee.id,
        clockInTime: {
          gte: today,
        },
      },
    });

    if (existingAttendance) {
      return response(false, "Already clocked in today", null);
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId: user.employee.id,
        clockInTime: new Date(),
        totalHours: 0,
      },
    });

    revalidatePath("/attendance");
    revalidatePath("/employee/clock-in-out");
    return response(true, "Successfully clocked in", attendance);
  } catch (error) {
    console.error("Error clocking in:", error);
    return response(false, "Error clocking in", error);
  }
}

export async function clockOut() {
  try {
    const user = await requireUser();
    if (!user || !user.employee) {
      return response(false, "Unauthorized or employee not found", null);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId: user.employee.id,
        clockInTime: {
          gte: today,
        },
      },
    });

    if (!activeAttendance) {
      return response(false, "No active attendance found", null);
    }

    const clockOutTime = new Date();
    const totalHours = 
      (clockOutTime.getTime() - activeAttendance.clockInTime.getTime()) / 
      (1000 * 60 * 60);

    const updatedAttendance = await prisma.attendance.update({
      where: { id: activeAttendance.id },
      data: {
        clockOutTime,
        totalHours,
      },
    });

    revalidatePath("/attendance");
    revalidatePath("/employee/clock-in-out");
    return response(true, "Successfully clocked out", updatedAttendance);
  } catch (error) {
    console.error("Error clocking out:", error);
    return response(false, "Error clocking out", error);
  }
}

export async function getAttendanceHistory(period: "day" | "week" | "month") {
  try {
    const user = await requireUser();
    if (!user || !user.employee) {
      return response(false, "Unauthorized or employee not found", null);
    }

    const today = new Date();
    let startDate = new Date();

    switch (period) {
      case "day":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(today.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(today.getMonth() - 1);
        break;
    }

    const attendances = await prisma.attendance.findMany({
      where: {
        employeeId: user.employee.id,
        clockInTime: {
          gte: startDate,
        },
      },
      orderBy: {
        clockInTime: "desc",
      },
    });

    return response(true, "Successfully fetched attendance history", attendances);
  } catch (error) {
    console.error("Error fetching attendance history:", error);
    return response(false, "Error fetching attendance history", error);
  }
}

// For company admin to view all employee attendances
export async function getCompanyAttendances(period: "day" | "week" | "month") {
  try {
    const user = await requireUser();
    if (!user || !user.company) {
      return response(false, "Unauthorized or company not found", null);
    }

    const today = new Date();
    let startDate = new Date();

    switch (period) {
      case "day":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(today.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(today.getMonth() - 1);
        break;
    }

    const attendances = await prisma.attendance.findMany({
      where: {
        employee: {
          companyProfileId: user.company.id
        },
        clockInTime: {
          gte: startDate,
        },
      },
      include: {
        employee: {
          select: {
            name: true,
            position: true,
            department: true,
          }
        }
      },
      orderBy: {
        clockInTime: "desc",
      },
    });

    return response(true, "Successfully fetched company attendances", attendances);
  } catch (error) {
    console.error("Error fetching company attendances:", error);
    return response(false, "Error fetching company attendances", error);
  }
}
