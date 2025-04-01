


// app/employee/bank-details/page.tsx
import { prisma as db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

import BankDetailsForm from "./bank-details-form";
export default async function BankDetailsPage() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }

  const employee = await db.employee.findUnique({
    where: { userId: user.id },
    include: { bankDetails: true },
  });

  const defaultValues = employee?.bankDetails?.[0]
    ? {
        accountName: employee.bankDetails[0].accountName,
        accountNumber: employee.bankDetails[0].accountNumber,
        bsb: employee.bankDetails[0].bsbNumber.replace(/(\d{3})(\d{3})/, "$1-$2"),
        bankName: employee.bankDetails[0].bankName,
      }
    : undefined;

  return <BankDetailsForm defaultValues={defaultValues} />;
}