import { generatePayslipPDF } from "@/app/(dashboard)/admin/new/payroll/pdf-generator";
import { getCurrentUser } from "@/lib/current-user";
import { prisma as db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const payslip = await db.payslip.findUnique({
    where: { id: params.id },
    include: {
      employee: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!payslip) {
    return new NextResponse("Payslip not found", { status: 404 });
  }

  // Generate PDF
  const pdfBlob = await generatePayslipPDF(payslip);

  return new NextResponse(pdfBlob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=payslip-${payslip.id}.pdf`,
    },
  });
}