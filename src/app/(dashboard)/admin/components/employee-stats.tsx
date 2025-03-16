"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function EmployeeStats() {
  const departments = [
    {
      name: "Engineering",
      total: 78,
      present: 72,
      leave: 4,
      absent: 2,
    },
    {
      name: "Marketing",
      total: 45,
      present: 42,
      leave: 3,
      absent: 0,
    },
    {
      name: "Sales",
      total: 62,
      present: 58,
      leave: 3,
      absent: 1,
    },
    {
      name: "Finance",
      total: 24,
      present: 22,
      leave: 2,
      absent: 0,
    },
    {
      name: "HR",
      total: 18,
      present: 18,
      leave: 0,
      absent: 0,
    },
    {
      name: "Operations",
      total: 18,
      present: 16,
      leave: 2,
      absent: 0,
    },
  ]

  return (
    <div className="space-y-4">
      {departments.map((department) => (
        <Card key={department.name}>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">{department.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {department.total} employees
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-medium">{department.present}</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{department.leave}</p>
                  <p className="text-xs text-muted-foreground">Leave</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{department.absent}</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(department.present / department.total) * 100} className="h-2" />
              <p className="mt-1 text-xs text-right text-muted-foreground">
                {Math.round((department.present / department.total) * 100)}% attendance
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
