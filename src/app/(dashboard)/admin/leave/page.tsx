// app/leaves/page.tsx (Server Component)
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import LeaveTable from "./leave-table";

export const dynamic = 'force-dynamic';

// type LeaveWithEmployee = Leave & {
//   employee: Employee & {
//     user: User;
//   };
// };

export default async function LeavePage() {
  const leaveRequests = await prisma.leave.findMany({
    include: {
      employee: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedData = leaveRequests.map((leave) => ({
    ...leave,
    startDate: leave.startDate.toISOString(),
    endDate: leave.endDate.toISOString(),
    employee: {
      ...leave.employee,
      user: {
        ...leave.employee.user,
        createdAt: leave.employee.user.createdAt.toISOString(),
        updatedAt: leave.employee.user.updatedAt.toISOString(),
      },
    },
  }));

  const simpleLeaveRequests = serializedData.map(leave => ({
    id: leave.id,
    employeeName: leave.employee.user.name,
    leaveType: leave.leaveType,
    startDate: leave.startDate,
    endDate: leave.endDate,
    status: leave.status
  }));
  

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <LeaveTable leaveRequests={simpleLeaveRequests} />
        </CardContent>
      </Card>
    </div>
  );
}