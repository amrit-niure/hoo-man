

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { requireUser } from "@/app/utils/hooks";
import { LeaveHistoryTable } from "./leave-history";
import { ApplyLeaveForm } from "./apply-leave-form";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function EmployeeLeavePage() {
 const user = await requireUser();
  const employee = await prisma.employee.findUnique({
    where: { userId: user?.id },
    include: {
      leaveRequests: {
      orderBy: { createdAt: 'desc' }
      }
    }
    });

  const currentYear = new Date().getFullYear();

  const totalLeaveDaysTaken = employee?.leaveRequests
    .filter(
      leave =>
        leave.status === "APPROVED" &&
        new Date(leave.startDate).getFullYear() === currentYear
    )
    .reduce((total, leave) => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      const daysTaken =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1; // Include the start day
      return total + daysTaken;
    }, 0) || 0;

  const remainingLeaves = 20 - totalLeaveDaysTaken;

  if (!employee) return <div>Employee not found</div>;

  const serializedLeaves = employee.leaveRequests.map(leave => ({
    ...leave,
    startDate: leave.startDate.toISOString(),
    endDate: leave.endDate.toISOString(),
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Leave Application</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>New Leave Request</CardTitle>
          <p className="text-sm text-muted-foreground">You have <Badge  className="mx-2">{remainingLeaves}</Badge> days of leave remaining this year.</p>
        
        </CardHeader>
        <CardContent>
          <ApplyLeaveForm employeeId={employee.id} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
        </CardHeader>
        <CardContent>
          <LeaveHistoryTable leaves={serializedLeaves} />
        </CardContent>
      </Card>
    </div>
  );
}