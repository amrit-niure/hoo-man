import { requireUser } from "@/app/utils/hooks";
import { prisma } from "@/lib/db";
import EmployeeDocumentsClient from "./document-page";


export default async function EmployeeDocumentsPage() {

  const user = await requireUser();
  if (!user?.employee) return null;
  const employee = await prisma.employee.findUnique({
    where: { id: user?.employee.id },
    select: {
      id: true,
      name: true,
      documents: true,
    },
  });

  const companyDocumentsData = await prisma.employee.findUnique({
    where: { id: user?.employee.id },
    select: {
      CompanyProfile: {
        select: {
          documents: true,
        },
      },
    },
  });

  const companyDocuments = companyDocumentsData?.CompanyProfile?.documents || [];

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return <EmployeeDocumentsClient
    employeeId={employee.id} 
    employeeName={employee.name} 
    documentUrls={employee.documents} 
    companyDocuments={companyDocuments} // Pass company documents if needed
  />;
}