import React from "react";
import EmployeeList from "./components/employee-list";
import { prisma } from "@/lib/db";
import { requireCompany } from "@/app/utils/hooks";

export default async function Employees() {
  const company = await requireCompany();
  const ourEmployees = await prisma.employee.findMany({
    where: {
      companyProfileId: company.id,
    },
  });
  return (
    <div>
      <EmployeeList ourEmployees={ourEmployees} />
    </div>
  );
}
