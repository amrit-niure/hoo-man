// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { attendances, employees, formatDate, formatTime } from "@/lib/data"
// import { ClockIcon } from "lucide-react"

// export default function EmployeeClockPage() {
//   // For demo purposes, we'll use the first employee
//   const currentEmployee = employees[0]

//   const [currentTime, setCurrentTime] = useState(new Date())
//   const [isClockedIn, setIsClockedIn] = useState(false)
//   const [clockInTime, setClockInTime] = useState<Date | null>(null)

//   // Get employee's attendance history
//   const employeeAttendances = attendances
//     .filter((attendance) => attendance.employeeId === currentEmployee.id)
//     .sort((a, b) => new Date(b.clockInTime).getTime() - new Date(a.clockInTime).getTime())

//   // Check if employee is already clocked in today
//   useEffect(() => {
//     const todayAttendance = employeeAttendances.find((attendance) => {
//       const attendanceDate = new Date(attendance.clockInTime)
//       const today = new Date()

//       return (
//         attendanceDate.getDate() === today.getDate() &&
//         attendanceDate.getMonth() === today.getMonth() &&
//         attendanceDate.getFullYear() === today.getFullYear() &&
//         attendance.clockOutTime === null
//       )
//     })

//     if (todayAttendance) {
//       setIsClockedIn(true)
//       setClockInTime(new Date(todayAttendance.clockInTime))
//     }
//   }, [employeeAttendances])

//   // Update current time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date())
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   const handleClockIn = () => {
//     const now = new Date()
//     setIsClockedIn(true)
//     setClockInTime(now)

//     // In a real app, you would save this to the database
//     console.log("Clocked in at:", now)
//   }

//   const handleClockOut = () => {
//     const now = new Date()
//     setIsClockedIn(false)
//     setClockInTime(null)

//     // In a real app, you would update the database record
//     console.log("Clocked out at:", now)
//   }

//   // Calculate elapsed time since clock in
//   const getElapsedTime = () => {
//     if (!clockInTime) return "00:00:00"

//     const elapsed = Math.floor((currentTime.getTime() - clockInTime.getTime()) / 1000)
//     const hours = Math.floor(elapsed / 3600)
//       .toString()
//       .padStart(2, "0")
//     const minutes = Math.floor((elapsed % 3600) / 60)
//       .toString()
//       .padStart(2, "0")
//     const seconds = Math.floor(elapsed % 60)
//       .toString()
//       .padStart(2, "0")

//     return `${hours}:${minutes}:${seconds}`
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="flex-1 p-6">
//         <div className="flex flex-col space-y-6">
//           <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold">Employee Clock In/Out</h1>
//             <div className="text-lg font-medium">{currentTime.toLocaleTimeString()}</div>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <Card className="md:col-span-1">
//               <CardHeader>
//                 <CardTitle>Welcome, {currentEmployee.name}</CardTitle>
//                 <CardDescription>
//                   {formatDate(currentTime)} | {currentEmployee.position} |{" "}
//                   {currentEmployee.department
//                     .replace(/_/g, " ")
//                     .toLowerCase()
//                     .replace(/\b\w/g, (l) => l.toUpperCase())}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="flex flex-col items-center justify-center space-y-6 py-6">
//                 <div className="flex h-48 w-48 items-center justify-center rounded-full border-8 border-primary/10 bg-background">
//                   <div className="text-center">
//                     <ClockIcon className="mx-auto h-12 w-12 text-primary" />
//                     <div className="mt-2 text-2xl font-bold">{isClockedIn ? getElapsedTime() : "Ready"}</div>
//                     <div className="text-sm text-muted-foreground">
//                       {isClockedIn ? "Time elapsed" : "Click below to start"}
//                     </div>
//                   </div>
//                 </div>

//                 {isClockedIn ? (
//                   <div className="space-y-2 text-center">
//                     <div className="text-sm text-muted-foreground">
//                       Clocked in at {clockInTime ? formatTime(clockInTime) : ""}
//                     </div>
//                     <Button size="lg" variant="destructive" className="w-full" onClick={handleClockOut}>
//                       Clock Out
//                     </Button>
//                   </div>
//                 ) : (
//                   <Button size="lg" className="w-full" onClick={handleClockIn}>
//                     Clock In
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>

//             <Card className="md:col-span-1">
//               <CardHeader>
//                 <CardTitle>Attendance History</CardTitle>
//                 <CardDescription>Your recent clock in/out records</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Tabs defaultValue="week">
//                   <TabsList className="mb-4">
//                     <TabsTrigger value="week">This Week</TabsTrigger>
//                     <TabsTrigger value="month">This Month</TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="week">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Date</TableHead>
//                           <TableHead>Clock In</TableHead>
//                           <TableHead>Clock Out</TableHead>
//                           <TableHead>Total Hours</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {employeeAttendances.slice(0, 5).map((attendance) => (
//                           <TableRow key={attendance.id}>
//                             <TableCell>{formatDate(attendance.clockInTime)}</TableCell>
//                             <TableCell>{formatTime(attendance.clockInTime)}</TableCell>
//                             <TableCell>{formatTime(attendance.clockOutTime)}</TableCell>
//                             <TableCell>
//                               {attendance.totalHours !== null
//                                 ? `${attendance.totalHours.toFixed(2)} hrs`
//                                 : "In progress"}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TabsContent>

//                   <TabsContent value="month">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Date</TableHead>
//                           <TableHead>Clock In</TableHead>
//                           <TableHead>Clock Out</TableHead>
//                           <TableHead>Total Hours</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {employeeAttendances.map((attendance) => (
//                           <TableRow key={attendance.id}>
//                             <TableCell>{formatDate(attendance.clockInTime)}</TableCell>
//                             <TableCell>{formatTime(attendance.clockInTime)}</TableCell>
//                             <TableCell>{formatTime(attendance.clockOutTime)}</TableCell>
//                             <TableCell>
//                               {attendance.totalHours !== null
//                                 ? `${attendance.totalHours.toFixed(2)} hrs`
//                                 : "In progress"}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }














// app/attendance/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { clockIn, clockOut, getAttendanceHistory } from "../actions";
import { toast } from "sonner";
import { Attendance } from "@prisma/client";

export default function AttendancePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Clock In/Out</h1>
      <p className="text-muted-foreground">
        {format(new Date(), "EEEE, MMMM dd, yyyy")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClockInOutCard />
        <CalendarCard />
        <AttendanceHistory />
      </div>
    </div>
  );
}

 function ClockInOutCard() {
  const [loading, setLoading] = useState(false);
  const [recentAttendances, setRecentAttendances] = useState<Attendance[]>([]);

  const handleClockIn = async () => {
    try {
      setLoading(true);
      const result = await clockIn();
      
     if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      if (result.success) {
        fetchRecentAttendances();
      }
    } catch (error) {
      console.log(error)
      toast("Error clocking in");
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoading(true);
      const result = await clockOut();
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      if (result.success) {
        fetchRecentAttendances();
      }

      if (result.success) {
        fetchRecentAttendances();
      }
    } catch (error) {
      console.log(error)
      toast("Error clocking out");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentAttendances = async () => {
    try {
      const result = await getAttendanceHistory("day");
      if (result.success && Array.isArray(result.data)) {
        setRecentAttendances(result.data.slice(0, 3));
      }
    } catch (error) {
      console.error("Failed to fetch recent attendances:", error);
    }
  };

  useEffect(() => {
    fetchRecentAttendances();
  }, []);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Clock In/Out
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl font-bold">
            {format(new Date(), "HH:mm")}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(), "EEEE, dd MMM yyyy")}
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            className="w-full" 
            variant="default"
            onClick={handleClockIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Clock In
          </Button>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleClockOut}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Clock Out
          </Button>
        </div>

        <div className="pt-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentAttendances.map((attendance) => (
              <div
                key={attendance.id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {attendance.clockOutTime === attendance.clockInTime
                      ? "Clock In"
                      : "Clock Out"}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {format(new Date(attendance.clockInTime), "dd MMM, hh:mm a")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// app/attendance/components/calendar-card.tsx
 function CalendarCard() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}

// app/attendance/components/attendance-history.tsx
 function AttendanceHistory() {
  const [activeTab, setActiveTab] = useState<"day" | "week" | "month">("day");
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendanceHistory = async (period: "day" | "week" | "month") => {
    try {
      setLoading(true);
      const result = await getAttendanceHistory(period);
      if (result.success) {
        setAttendances(Array.isArray(result.data) ? result.data : []);
      } else {
        toast.error(result.message || "Error fetching attendance history");
      }
    } catch (error) {
      console.error("Failed to fetch attendance history:", error);
      toast.error("Failed to fetch attendance history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceHistory(activeTab);
  }, [activeTab]);

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="day" 
          onValueChange={(value) => 
            setActiveTab(value as "day" | "week" | "month")
          }
        >
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="py-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : attendances.length > 0 ? (
              <div className="space-y-4">
                {attendances.map((attendance) => (
                  <div
                    key={attendance.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {format(new Date(attendance.clockInTime), "dd MMM yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Clock In: {format(
                          new Date(attendance.clockInTime),
                          "hh:mm a"
                        )}
                      </p>
                      {attendance.clockOutTime !== attendance.clockInTime && (
                        <p className="text-sm text-muted-foreground">
                          Clock Out: {attendance.clockOutTime ? format(
                            new Date(attendance.clockOutTime),
                            "hh:mm a"
                          ) : 'Not clocked out'}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {attendance.totalHours.toFixed(2)} hours
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No attendance record found for this period.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
