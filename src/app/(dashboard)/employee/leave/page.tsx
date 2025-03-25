// app/employee/leaves/page.tsx (Server Component)
import { Leave, LeaveStatus, LeaveType, Employee } from "@prisma/client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { requireUser } from "@/app/utils/hooks";
import { LeaveHistoryTable } from "./leave-history";
import { ApplyLeaveForm } from "./apply-leave-form";

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