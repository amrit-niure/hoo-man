import { prisma as db } from "@/lib/db";
import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import { PayrollRunCard } from "./components/payroll-run-card";
import { CreatePayrollRunDialog } from "./components/payroll-run-dialog";

export default async function PayrollPage() {
  const user = await getCurrentUser();
  console.log(user);
  if (!user || !user.companyProfileId) {
    return <div>Unauthorized</div>;
  }

  const payrollRuns = await db.payrollRun.findMany({
    where: { companyProfileId: user.companyProfileId },
    orderBy: { payPeriodStart: "desc" },
    include: {
      processedBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Payroll Management</h1>
        <CreatePayrollRunDialog />
      </div>

      <div className="grid gap-4">
        {payrollRuns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No payroll runs yet</p>
          </div>
        ) : (
          payrollRuns.map((run) => (
            <Link key={run.id} href={`/admin/new/payroll/${run.id}`}>
              <PayrollRunCard run={run} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}