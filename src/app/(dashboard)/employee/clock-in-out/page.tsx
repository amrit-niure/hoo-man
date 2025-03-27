
import { prisma } from "@/lib/db";
import AttendanceDashboard from "./components/attendance-dashbaord";
import { requireUser } from "@/app/utils/hooks";



async function getData() {
  const user = await requireUser();
  if (!user || !user.employee) {
    return {
      currentAttendance: null,
      recentAttendances: [],
      monthlyAttendances: [],
      user: null,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get current attendance
  const currentAttendance = await prisma.attendance.findFirst({
    where: {
      employeeId: user.employee.id,
      clockInTime: {
        gte: today,
      },
    },
    orderBy: {
      clockInTime: "desc",
    },
  });

  // Get recent attendances
  const recentAttendances = await prisma.attendance.findMany({
    where: {
      employeeId: user.employee.id,
      clockInTime: {
        gte: new Date(new Date().setDate(today.getDate() - 30)),
      },
    },
    orderBy: {
      clockInTime: "desc",
    },
  });

  // Get monthly attendances for calendar
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthlyAttendances = await prisma.attendance.findMany({
    where: {
      employeeId: user.employee.id,
      clockInTime: {
        gte: firstDayOfMonth,
      },
    },
    orderBy: {
      clockInTime: "desc",
    },
  });

  return {
    currentAttendance,
    recentAttendances,
    monthlyAttendances,
  };
}

export default async function AttendancePage() {
  const data = await getData();
  
  return <AttendanceDashboard initialData={data} />;
}
