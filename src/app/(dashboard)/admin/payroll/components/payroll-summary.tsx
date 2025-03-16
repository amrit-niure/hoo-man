"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function PayrollSummary() {
  const departments = [
    {
      name: "Engineering",
      employees: 78,
      totalSalary: 124500,
      averageSalary: 6225,
      percentOfTotal: 38.3,
    },
    {
      name: "Marketing",
      employees: 45,
      totalSalary: 67500,
      averageSalary: 5625,
      percentOfTotal: 20.8,
    },
    {
      name: "Sales",
      employees: 62,
      totalSalary: 86800,
      averageSalary: 5425,
      percentOfTotal: 26.7,
    },
    {
      name: "Finance",
      employees: 24,
      totalSalary: 36000,
      averageSalary: 6000,
      percentOfTotal: 11.1,
    },
    {
      name: "HR",
      employees: 18,
      totalSalary: 27000,
      averageSalary: 5400,
      percentOfTotal: 8.3,
    },
    {
      name: "Operations",
      employees: 18,
      totalSalary: 25200,
      averageSalary: 5040,
      percentOfTotal: 7.8,
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Department</TableHead>
          <TableHead>Employees</TableHead>
          <TableHead>Total Salary</TableHead>
          <TableHead>Average Salary</TableHead>
          <TableHead>% of Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departments.map((department) => (
          <TableRow key={department.name}>
            <TableCell className="font-medium">{department.name}</TableCell>
            <TableCell>{department.employees}</TableCell>
            <TableCell>${department.totalSalary.toLocaleString()}</TableCell>
            <TableCell>${department.averageSalary.toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress value={department.percentOfTotal} className="h-2 w-20" />
                <span className="text-sm">{department.percentOfTotal}%</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
