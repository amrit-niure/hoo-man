"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      date: "June 18, 2023",
      clockIn: "9:02 AM",
      clockOut: "5:15 PM",
      breakTime: "45 min",
      totalHours: "7.5 hrs",
      status: "Completed",
    },
    {
      id: 2,
      date: "June 17, 2023",
      clockIn: "8:58 AM",
      clockOut: "5:05 PM",
      breakTime: "30 min",
      totalHours: "7.6 hrs",
      status: "Completed",
    },
    {
      id: 3,
      date: "June 16, 2023",
      clockIn: "9:10 AM",
      clockOut: "6:20 PM",
      breakTime: "45 min",
      totalHours: "8.4 hrs",
      status: "Completed",
    },
    {
      id: 4,
      date: "June 15, 2023",
      clockIn: "8:55 AM",
      clockOut: "5:10 PM",
      breakTime: "60 min",
      totalHours: "7.25 hrs",
      status: "Completed",
    },
    {
      id: 5,
      date: "June 14, 2023",
      clockIn: "9:05 AM",
      clockOut: "5:00 PM",
      breakTime: "30 min",
      totalHours: "7.4 hrs",
      status: "Completed",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Clock In</TableHead>
          <TableHead>Clock Out</TableHead>
          <TableHead>Break Time</TableHead>
          <TableHead>Total Hours</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="font-medium">{activity.date}</TableCell>
            <TableCell>{activity.clockIn}</TableCell>
            <TableCell>{activity.clockOut}</TableCell>
            <TableCell>{activity.breakTime}</TableCell>
            <TableCell>{activity.totalHours}</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {activity.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
