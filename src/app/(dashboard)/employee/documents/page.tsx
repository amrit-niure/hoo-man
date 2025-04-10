// app/(dashboard)/employee/documents/page.tsx

import { getCurrentUser } from "@/lib/current-user";
import { prisma as db } from "@/lib/db";
import { DocumentsPage } from "./document-page";

interface Document {
  id: string;
  name: string;
  uploadedBy: string;
  uploadedAt: string;
  size: string;
  type: string;
  category: string;
  url?: string;
}

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return null;

  const documents = await db.payslip.findMany({
    where: { employeeId: user.id },
    orderBy: { createdAt: "desc" }
  });

  const formattedDocuments: Document[] = documents.map(doc => ({
    id: doc.id,
    name: `Payslip ${doc.payPeriodStart.toISOString().split("T")[0]} - ${doc.payPeriodEnd.toISOString().split("T")[0]}`,
    uploadedBy: "System", // Replace with actual logic if available
    uploadedAt: doc.createdAt.toISOString(),
    size: `$2005 KB`, // Assuming size is in bytes
    type: "Payslip", // Replace with actual logic if available
    category: "Payroll", // Replace with actual logic if available
    url: (doc.metadata as { url: string }).url // Explicitly cast metadata to include url
  }));

  return <DocumentsPage initialDocuments={formattedDocuments} />;
}