// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ArrowLeft, Download, Eye, FileText, Search } from "lucide-react"

// export default function EmployeePayslipsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [yearFilter, setYearFilter] = useState("2025")

//   const payslips = [
//     {
//       id: "PS-2025-001",
//       date: "May 15, 2025",
//       period: "May 1 - May 15, 2025",
//       grossPay: 3600,
//       tax: 720,
//       superannuation: 342,
//       netPay: 2538,
//     },
//     {
//       id: "PS-2025-002",
//       date: "Apr 30, 2025",
//       period: "Apr 16 - Apr 30, 2025",
//       grossPay: 3600,
//       tax: 720,
//       superannuation: 342,
//       netPay: 2538,
//     },
//     {
//       id: "PS-2025-003",
//       date: "Apr 15, 2025",
//       period: "Apr 1 - Apr 15, 2025",
//       grossPay: 3600,
//       tax: 720,
//       superannuation: 342,
//       netPay: 2538,
//     },
//     {
//       id: "PS-2025-004",
//       date: "Mar 31, 2025",
//       period: "Mar 16 - Mar 31, 2025",
//       grossPay: 3600,
//       tax: 720,
//       superannuation: 342,
//       netPay: 2538,
//     },
//     {
//       id: "PS-2025-005",
//       date: "Mar 15, 2025",
//       period: "Mar 1 - Mar 15, 2025",
//       grossPay: 3600,
//       tax: 720,
//       superannuation: 342,
//       netPay: 2538,
//     },
//   ]

//   const filteredPayslips = payslips.filter((item) => {
//     const matchesSearch =
//       item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.period.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesYear = item.date.includes(yearFilter)
//     return matchesSearch && matchesYear
//   })

//   return (
//     <div className="container pb-10">
//       <div className="mb-8 flex flex-col ">
//         <Button variant="ghost" size="sm" asChild className="mr-2 w-fit">
//           <Link href="/employee">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Link>
//         </Button>
//         <h1 className="text-3xl font-bold">My Payslips</h1>
//       </div>

//       <Tabs defaultValue="all" className="w-full">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//           <TabsList className="mb-4 sm:mb-0">
//             <TabsTrigger value="all">All Payslips</TabsTrigger>
//             <TabsTrigger value="recent">Recent</TabsTrigger>
//             <TabsTrigger value="ytd">Year to Date</TabsTrigger>
//           </TabsList>
//           <div className="flex w-full sm:w-auto space-x-2">
//             <div className="relative w-full sm:w-auto">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search payslips..."
//                 className="w-full sm:w-[200px] pl-8"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Select value={yearFilter} onValueChange={setYearFilter}>
//               <SelectTrigger className="w-full sm:w-[120px]">
//                 <SelectValue placeholder="Year" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="2025">2025</SelectItem>
//                 <SelectItem value="2024">2024</SelectItem>
//                 <SelectItem value="2023">2023</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <TabsContent value="all" className="mt-0">
//           <Card>
//             <CardHeader>
//               <CardTitle>All Payslips</CardTitle>
//               <CardDescription>View and download all your payslips</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Payslip ID</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Pay Period</TableHead>
//                     <TableHead className="text-right">Gross Pay</TableHead>
//                     <TableHead className="text-right">Tax</TableHead>
//                     <TableHead className="text-right">Super</TableHead>
//                     <TableHead className="text-right">Net Pay</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredPayslips.length > 0 ? (
//                     filteredPayslips.map((payslip) => (
//                       <TableRow key={payslip.id}>
//                         <TableCell className="font-medium">{payslip.id}</TableCell>
//                         <TableCell>{payslip.date}</TableCell>
//                         <TableCell>{payslip.period}</TableCell>
//                         <TableCell className="text-right">${payslip.grossPay.toFixed(2)}</TableCell>
//                         <TableCell className="text-right">${payslip.tax.toFixed(2)}</TableCell>
//                         <TableCell className="text-right">${payslip.superannuation.toFixed(2)}</TableCell>
//                         <TableCell className="text-right">${payslip.netPay.toFixed(2)}</TableCell>
//                         <TableCell className="text-right">
//                           <div className="flex justify-end space-x-2">
//                             <Button variant="ghost" size="icon" asChild>
//                               <Link href={`/employee/payslips/${payslip.id}`}>
//                                 <Eye className="h-4 w-4" />
//                                 <span className="sr-only">View</span>
//                               </Link>
//                             </Button>
//                             <Button variant="ghost" size="icon">
//                               <Download className="h-4 w-4" />
//                               <span className="sr-only">Download</span>
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
//                         No payslips found matching your filters.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="recent" className="mt-0">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Payslips</CardTitle>
//               <CardDescription>View your most recent payslips</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Payslip ID</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Pay Period</TableHead>
//                     <TableHead className="text-right">Gross Pay</TableHead>
//                     <TableHead className="text-right">Tax</TableHead>
//                     <TableHead className="text-right">Super</TableHead>
//                     <TableHead className="text-right">Net Pay</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {payslips.slice(0, 2).map((payslip) => (
//                     <TableRow key={payslip.id}>
//                       <TableCell className="font-medium">{payslip.id}</TableCell>
//                       <TableCell>{payslip.date}</TableCell>
//                       <TableCell>{payslip.period}</TableCell>
//                       <TableCell className="text-right">${payslip.grossPay.toFixed(2)}</TableCell>
//                       <TableCell className="text-right">${payslip.tax.toFixed(2)}</TableCell>
//                       <TableCell className="text-right">${payslip.superannuation.toFixed(2)}</TableCell>
//                       <TableCell className="text-right">${payslip.netPay.toFixed(2)}</TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex justify-end space-x-2">
//                           <Button variant="ghost" size="icon" asChild>
//                             <Link href={`/employee/payslips/${payslip.id}`}>
//                               <Eye className="h-4 w-4" />
//                               <span className="sr-only">View</span>
//                             </Link>
//                           </Button>
//                           <Button variant="ghost" size="icon">
//                             <Download className="h-4 w-4" />
//                             <span className="sr-only">Download</span>
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="ytd" className="mt-0">
//           <Card>
//             <CardHeader>
//               <CardTitle>Year to Date Summary</CardTitle>
//               <CardDescription>View your earnings summary for the current year</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-6 md:grid-cols-4">
//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium text-muted-foreground">Gross Earnings</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">$18,000.00</div>
//                     <p className="text-xs text-muted-foreground">Year to date</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium text-muted-foreground">Tax Paid</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">$3,600.00</div>
//                     <p className="text-xs text-muted-foreground">Year to date</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium text-muted-foreground">Superannuation</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">$1,710.00</div>
//                     <p className="text-xs text-muted-foreground">Year to date</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium text-muted-foreground">Net Pay</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">$12,690.00</div>
//                     <p className="text-xs text-muted-foreground">Year to date</p>
//                   </CardContent>
//                 </Card>
//               </div>
//               <div className="mt-6">
//                 <Button variant="outline" className="w-full sm:w-auto">
//                   <FileText className="mr-2 h-4 w-4" />
//                   Download Annual Summary
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }



import { prisma as db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { PayslipCard } from "../../admin/new/payroll/components/payslip-card";

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