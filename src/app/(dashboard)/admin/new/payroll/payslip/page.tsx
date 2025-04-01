import { prisma as db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { PayslipCard } from "../components/payslip-card";

export default async function PayslipsPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }

  const employee = await db.employee.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!employee) {
    return <div>Employee record not found</div>;
  }

  const payslips = await db.payslip.findMany({
    where: { employeeId: employee.id },
    orderBy: { payPeriodEnd: "desc" },
    include: {
      payrollRun: {
        select: {
          name: true,
          payPeriodStart: true,
          payPeriodEnd: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Payslips</h1>

      <div className="grid gap-4">
        {payslips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No payslips yet</p>
          </div>
        ) : (
          payslips.map((payslip) => (
            <PayslipCard key={payslip.id} payslip={payslip} />
          ))
        )}
      </div>
    </div>
  );
}