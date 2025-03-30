// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";;
// import { prisma } from "@/lib/db";
// import LeaveTable from "./leave-table";

// export const dynamic = 'force-dynamic';

// export default async function LeavePage() {
//   const leaveRequests = await prisma.leave.findMany({
//     include: {
//       employee: {
//         include: {
//           user: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   const serializedData = leaveRequests.map((leave) => ({
//     ...leave,
//     startDate: leave.startDate.toISOString(),
//     endDate: leave.endDate.toISOString(),
//     employee: {
//       ...leave.employee,
//       user: {
//         ...leave.employee.user,
//         createdAt: leave.employee.user.createdAt.toISOString(),
//         updatedAt: leave.employee.user.updatedAt.toISOString(),
//       },
//     },
//   }));

//   const simpleLeaveRequests = serializedData.map(leave => ({
//     id: leave.id,
//     employeeName: leave.employee.user.name,
//     leaveType: leave.leaveType,
//     startDate: leave.startDate,
//     endDate: leave.endDate,
//     status: leave.status
//   }));
  

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Leave Management</h1>
       
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Pending Leave Requests</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <LeaveTable leaveRequests={simpleLeaveRequests} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }












import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import LeaveTable from "./leave-table";
import { requireCompany } from "@/app/utils/hooks"; 

export const dynamic = 'force-dynamic';

export default async function LeavePage() {
  const company = await requireCompany();
  if (!company?.id) {
    console.error("Failed to retrieve company information for leave requests.");
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Leave Management</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <LeaveTable leaveRequests={[]} />
          </CardContent>
        </Card>
      </div>
    );
  }

  const leaveRequests = await prisma.leave.findMany({
    where: {
      employee: {
        companyProfileId: company.id,
      },
    },
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

  // 3. Serialize and simplify the data (existing logic)
  // Note: Consider if full serialization is needed if only simpleLeaveRequests is used
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
    employeeName: leave.employee?.user?.name ?? 'Unknown Employee',
    leaveType: leave.leaveType,
    startDate: leave.startDate,
    endDate: leave.endDate,
    status: leave.status
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leave Management</h1>
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
