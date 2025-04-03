import { prisma as db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { generatePayslips } from "@/app/actions/payroll";
import { getCurrentUser } from "@/lib/current-user";
import { PayrollRunHeader } from "../components/payroll-run-header";
import { PayslipTable } from "../components/payslip-table";
import { ProcessPayrollButton } from "../components/process-payroll-button";
import { processPayroll } from "../actions";

export default async function PayrollRunPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || !user.companyProfileId) {
    redirect("/login");
  }
  const payrollRunId = await params;
  const payrollRun = await db.payrollRun.findUnique({
    where: { id: payrollRunId.id, companyProfileId: user.companyProfileId },
    include: {
      payslips: {
        include: {
          employee: {
            select: {
              id: true,
              name: true,
              email: true,
              bankDetails: {
                where: { isPrimary: true },
                select: {
                  bankName: true,
                  accountNumber: true
                }
              }
            },
          },
        },
      },
      processedBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!payrollRun) {
    notFound();
  }

  // Server action to process payroll
  const processPayrollAction = async () => {
    "use server";
    try {
      await processPayroll(payrollRun.id);
      // Revalidate the page after successful processing
      redirect(`/admin/new/payroll/${payrollRun.id}?success=true`);
    } catch (error) {
      console.error("Payroll processing failed:", error);
      redirect(`/admin/new/payroll/${payrollRun.id}?error=true`);
    }
  };

  // Server action to generate payslips
  const generatePayslipsAction = async () => {
    "use server";
    try {
      await generatePayslips(payrollRun.id);
      // Revalidate the page after generation
      redirect(`/admin/new/payroll/${payrollRun.id}`);
    } catch (error) {
      console.error("Payslip generation failed:", error);
      redirect(`/admin/new/payroll/${payrollRun.id}?error=generation`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <PayrollRunHeader 
        run={payrollRun} 
        onProcess={processPayrollAction} 
        onGeneratePayslips={generatePayslipsAction} 
      />

      <div className="mt-8">
        <PayslipTable 
          payslips={payrollRun.payslips.map(p => ({
            ...p,
            employee: {
              ...p.employee,
              hasBankAccount: p.employee.bankDetails.length > 0
            }
          }))} 
        />
      </div>
      {/* {payrollRun.status === "READY_FOR_PROCESSING" && (
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <ProcessPayrollButton payrollRunId={payrollRun.id} />
      </div>
    )} */}
    </div>
  );
}