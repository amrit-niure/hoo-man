// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { cn } from "@/lib/utils"
// import { attendances, formatDate, formatDepartment, formatTime } from "@/lib/data"
// import { CalendarIcon, Download, Search } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Department } from "@prisma/client"

// export default function TeamAttendancePage() {
//   const [dateRange, setDateRange] = useState<{
//     from: Date | undefined
//     to: Date | undefined
//   }>({
//     from: new Date(),
//     to: new Date(),
//   })

//   const [searchQuery, setSearchQuery] = useState("")
//   const [departmentFilter, setDepartmentFilter] = useState<string>("all")
//   const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily")

//   // Filter attendances based on selected date range, department, and search query
//   const filteredAttendances = attendances.filter((attendance) => {
//     // Date range filter
//     const attendanceDate = new Date(attendance.clockInTime)
//     const fromDate = dateRange.from || new Date()
//     const toDate = dateRange.to || fromDate

//     // Set time to beginning and end of day for comparison
//     const fromDateStart = new Date(fromDate)
//     fromDateStart.setHours(0, 0, 0, 0)

//     const toDateEnd = new Date(toDate)
//     toDateEnd.setHours(23, 59, 59, 999)

//     const isInDateRange = attendanceDate >= fromDateStart && attendanceDate <= toDateEnd

//     // Department filter
//     const matchesDepartment = departmentFilter === "all" || attendance.employee?.department === departmentFilter

//     // Search query filter
//     const matchesSearch =
//       !searchQuery ||
//       attendance.employee?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       attendance.employee?.email.toLowerCase().includes(searchQuery.toLowerCase())

//     return isInDateRange && matchesDepartment && matchesSearch
//   })

  // // Group attendances by employee for the summary view
  // const attendanceByEmployee = filteredAttendances.reduce((acc: any, attendance) => {
  //   if (!attendance.employee) return acc

  //   if (!acc[attendance.employeeId]) {
  //     acc[attendance.employeeId] = {
  //       employee: attendance.employee,
  //       attendances: [],
  //       totalHours: 0,
  //       daysPresent: 0,
  //     }
  //   }

  //   acc[attendance.employeeId].attendances.push(attendance)

  //   if (attendance.totalHours) {
  //     acc[attendance.employeeId].totalHours += attendance.totalHours
  //     acc[attendance.employeeId].daysPresent += 1
  //   }

  //   return acc
  // }, {})

  // return (
  //   <div className="flex min-h-screen flex-col">
  //     <main className="flex-1 p-6">
  //       <div className="flex flex-col space-y-6">
  //         <div className="flex items-center justify-between">
  //           <h1 className="text-3xl font-bold">Team Attendance</h1>
  //           <div className="flex items-center gap-4">
  //             <div className="relative">
  //               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  //               <Input
  //                 type="search"
  //                 placeholder="Search employees..."
  //                 className="w-[250px] pl-8"
  //                 value={searchQuery}
  //                 onChange={(e) => setSearchQuery(e.target.value)}
  //               />
  //             </div>
  //             <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
  //               <SelectTrigger className="w-[180px]">
  //                 <SelectValue placeholder="Department" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="all">All Departments</SelectItem>
  //                 {Object.values(Department).map((dept) => (
  //                   <SelectItem key={dept} value={dept}>
  //                     {formatDepartment(dept)}
  //                   </SelectItem>
  //                 ))}
  //               </SelectContent>
  //             </Select>
  //             <Popover>
  //               <PopoverTrigger asChild>
  //                 <Button
  //                   variant={"outline"}
  //                   className={cn(
  //                     "w-[300px] justify-start text-left font-normal",
  //                     !dateRange.from && "text-muted-foreground",
  //                   )}
  //                 >
  //                   <CalendarIcon className="mr-2 h-4 w-4" />
  //                   {dateRange.from ? (
  //                     dateRange.to ? (
  //                       <>
  //                         {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
  //                       </>
  //                     ) : (
  //                       formatDate(dateRange.from)
  //                     )
  //                   ) : (
  //                     <span>Pick a date range</span>
  //                   )}
  //                 </Button>
  //               </PopoverTrigger>
  //               <PopoverContent className="w-auto p-0" align="start">
  //                 <Calendar mode="range" selected={dateRange} onSelect={setDateRange} initialFocus />
  //               </PopoverContent>
  //             </Popover>
  //             <Button variant="outline" size="icon">
  //               <Download className="h-4 w-4" />
  //               <span className="sr-only">Download report</span>
  //             </Button>
  //           </div>
  //         </div>

  //         <Tabs defaultValue="daily" onValueChange={(v) => setView(v as any)}>
  //           <div className="flex items-center justify-between">
  //             <TabsList>
  //               <TabsTrigger value="daily">Daily View</TabsTrigger>
  //               <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
  //               <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
  //             </TabsList>
  //           </div>

  //           <TabsContent value="daily" className="mt-4">
  //             <Card>
  //               <CardHeader>
  //                 <CardTitle>Daily Attendance</CardTitle>
  //                 <CardDescription>Detailed view of employee attendance for the selected date range</CardDescription>
  //               </CardHeader>
  //               <CardContent>
  //                 <Table>
  //                   <TableHeader>
  //                     <TableRow>
  //                       <TableHead>Employee</TableHead>
  //                       <TableHead>Department</TableHead>
  //                       <TableHead>Date</TableHead>
  //                       <TableHead>Clock In</TableHead>
  //                       <TableHead>Clock Out</TableHead>
  //                       <TableHead>Total Hours</TableHead>
  //                       <TableHead>Status</TableHead>
  //                     </TableRow>
  //                   </TableHeader>
  //                   <TableBody>
  //                     {filteredAttendances.length > 0 ? (
  //                       filteredAttendances.map((attendance) => (
  //                         <TableRow key={attendance.id}>
  //                           <TableCell className="font-medium">
  //                             <div className="flex items-center gap-2">
  //                               {attendance.employee?.avatar && (
  //                                 <img
  //                                   src={attendance.employee.avatar || "/placeholder.svg"}
  //                                   alt={attendance.employee?.name}
  //                                   className="h-8 w-8 rounded-full"
  //                                 />
  //                               )}
  //                               <div>
  //                                 <div>{attendance.employee?.name}</div>
  //                                 <div className="text-xs text-muted-foreground">{attendance.employee?.email}</div>
  //                               </div>
  //                             </div>
  //                           </TableCell>
  //                           <TableCell>
  //                             {attendance.employee?.department
  //                               ? formatDepartment(attendance.employee.department)
  //                               : "N/A"}
  //                           </TableCell>
  //                           <TableCell>{formatDate(attendance.clockInTime)}</TableCell>
  //                           <TableCell>{formatTime(attendance.clockInTime)}</TableCell>
  //                           <TableCell>{formatTime(attendance.clockOutTime)}</TableCell>
  //                           <TableCell>
  //                             {attendance.totalHours !== null
  //                               ? `${attendance.totalHours.toFixed(2)} hrs`
  //                               : "In progress"}
  //                           </TableCell>
  //                           <TableCell>
  //                             {attendance.clockOutTime ? (
  //                               <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
  //                                 Complete
  //                               </span>
  //                             ) : (
  //                               <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
  //                                 In Progress
  //                               </span>
  //                             )}
  //                           </TableCell>
  //                         </TableRow>
  //                       ))
  //                     ) : (
  //                       <TableRow>
  //                         <TableCell colSpan={7} className="text-center py-4">
  //                           No attendance records found for the selected filters
  //                         </TableCell>
  //                       </TableRow>
  //                     )}
  //                   </TableBody>
  //                 </Table>
  //               </CardContent>
  //             </Card>
  //           </TabsContent>

  //           <TabsContent value="weekly" className="mt-4">
  //             <Card>
  //               <CardHeader>
  //                 <CardTitle>Weekly Summary</CardTitle>
  //                 <CardDescription>Summary of employee attendance for the selected week</CardDescription>
  //               </CardHeader>
  //               <CardContent>
  //                 <Table>
  //                   <TableHeader>
  //                     <TableRow>
  //                       <TableHead>Employee</TableHead>
  //                       <TableHead>Department</TableHead>
  //                       <TableHead>Days Present</TableHead>
  //                       <TableHead>Total Hours</TableHead>
  //                       <TableHead>Average Hours/Day</TableHead>
  //                     </TableRow>
  //                   </TableHeader>
  //                   <TableBody>
  //                     {Object.values(attendanceByEmployee).length > 0 ? (
  //                       Object.values(attendanceByEmployee).map((item: any) => (
  //                         <TableRow key={item.employee.id}>
  //                           <TableCell className="font-medium">
  //                             <div className="flex items-center gap-2">
  //                               {item.employee.avatar && (
  //                                 <img
  //                                   src={item.employee.avatar || "/placeholder.svg"}
  //                                   alt={item.employee.name}
  //                                   className="h-8 w-8 rounded-full"
  //                                 />
  //                               )}
  //                               <div>
  //                                 <div>{item.employee.name}</div>
  //                                 <div className="text-xs text-muted-foreground">{item.employee.email}</div>
  //                               </div>
  //                             </div>
  //                           </TableCell>
  //                           <TableCell>{formatDepartment(item.employee.department)}</TableCell>
  //                           <TableCell>{item.daysPresent}</TableCell>
  //                           <TableCell>{item.totalHours.toFixed(2)} hrs</TableCell>
  //                           <TableCell>
  //                             {item.daysPresent > 0 ? (item.totalHours / item.daysPresent).toFixed(2) : "0.00"} hrs
  //                           </TableCell>
  //                         </TableRow>
  //                       ))
  //                     ) : (
  //                       <TableRow>
  //                         <TableCell colSpan={5} className="text-center py-4">
  //                           No attendance records found for the selected filters
  //                         </TableCell>
  //                       </TableRow>
  //                     )}
  //                   </TableBody>
  //                 </Table>
  //               </CardContent>
  //             </Card>
  //           </TabsContent>

  //           <TabsContent value="monthly" className="mt-4">
  //             <Card>
  //               <CardHeader>
  //                 <CardTitle>Monthly Summary</CardTitle>
  //                 <CardDescription>Summary of employee attendance for the selected month</CardDescription>
  //               </CardHeader>
  //               <CardContent>
  //                 <Table>
  //                   <TableHeader>
  //                     <TableRow>
  //                       <TableHead>Employee</TableHead>
  //                       <TableHead>Department</TableHead>
  //                       <TableHead>Days Present</TableHead>
  //                       <TableHead>Total Hours</TableHead>
  //                       <TableHead>Average Hours/Day</TableHead>
  //                     </TableRow>
  //                   </TableHeader>
  //                   <TableBody>
  //                     {Object.values(attendanceByEmployee).length > 0 ? (
  //                       Object.values(attendanceByEmployee).map((item: any) => (
  //                         <TableRow key={item.employee.id}>
  //                           <TableCell className="font-medium">
  //                             <div className="flex items-center gap-2">
  //                               {item.employee.avatar && (
  //                                 <img
  //                                   src={item.employee.avatar || "/placeholder.svg"}
  //                                   alt={item.employee.name}
  //                                   className="h-8 w-8 rounded-full"
  //                                 />
  //                               )}
  //                               <div>
  //                                 <div>{item.employee.name}</div>
  //                                 <div className="text-xs text-muted-foreground">{item.employee.email}</div>
  //                               </div>
  //                             </div>
  //                           </TableCell>
  //                           <TableCell>{formatDepartment(item.employee.department)}</TableCell>
  //                           <TableCell>{item.daysPresent}</TableCell>
  //                           <TableCell>{item.totalHours.toFixed(2)} hrs</TableCell>
  //                           <TableCell>
  //                             {item.daysPresent > 0 ? (item.totalHours / item.daysPresent).toFixed(2) : "0.00"} hrs
  //                           </TableCell>
  //                         </TableRow>
  //                       ))
  //                     ) : (
  //                       <TableRow>
  //                         <TableCell colSpan={5} className="text-center py-4">
  //                           No attendance records found for the selected filters
  //                         </TableCell>
  //                       </TableRow>
  //                     )}
  //                   </TableBody>
  //                 </Table>
  //               </CardContent>
  //             </Card>
  //           </TabsContent>
  //         </Tabs>
  //       </div>
  //     </main>
  //   </div>
  // )
// }




// app/team-attendance/page.tsx (Server Component)
import { prisma } from "@/lib/db";
import TeamAttendanceView from "./team-attendance-view";

export default async function TeamAttendancePage() {
  const attendances = await prisma.attendance.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      clockInTime: 'desc',
    },
  });

  return <TeamAttendanceView attendances={attendances} />;
}