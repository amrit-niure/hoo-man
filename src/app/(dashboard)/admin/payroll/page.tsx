"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, DollarSign, FileText, Users } from "lucide-react"

export default function PayrollDashboardPage() {
  // Mock data
  const stats = {
    totalEmployees: 5,
    nextPayrollDate: "May 31, 2025",
    lastPayrollAmount: "$11,999.00",
    ytdPayroll: "$58,749.00",
  }

  const upcomingPayrolls = [
    { id: "PR-2025-006", date: "May 31, 2025", period: "May 16 - May 31, 2025", employees: 5, estimatedAmount: 12000 },
    { id: "PR-2025-007", date: "Jun 15, 2025", period: "Jun 1 - Jun 15, 2025", employees: 5, estimatedAmount: 12000 },
  ]

  const recentPayrolls = [
    {
      id: "PR-2025-001",
      date: "May 15, 2025",
      period: "May 1 - May 15, 2025",
      employees: 5,
      amount: 11999,
      status: "completed",
    },
    {
      id: "PR-2025-002",
      date: "Apr 30, 2025",
      period: "Apr 16 - Apr 30, 2025",
      employees: 5,
      amount: 12150,
      status: "completed",
    },
    {
      id: "PR-2025-003",
      date: "Apr 15, 2025",
      period: "Apr 1 - Apr 15, 2025",
      employees: 5,
      amount: 12050,
      status: "completed",
    },
  ]

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payroll Dashboard</h1>
        <p className="text-muted-foreground">Manage and process payroll for your employees</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalEmployees}</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payroll Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.nextPayrollDate}</div>
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Payroll Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.lastPayrollAmount}</div>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">YTD Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.ytdPayroll}</div>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common payroll tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" asChild>
              <Link href="/admin/payroll/run">
                <DollarSign className="h-6 w-6 mb-1" />
                <span>Run Payroll</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" asChild>
              <Link href="/admin/payroll/history">
                <FileText className="h-6 w-6 mb-1" />
                <span>View History</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" asChild>
              <Link href="/admin/employees">
                <Users className="h-6 w-6 mb-1" />
                <span>Manage Employees</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" asChild>
              <Link href="/admin/attendance/team">
                <Clock className="h-6 w-6 mb-1" />
                <span>Time Tracking</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payrolls</CardTitle>
            <CardDescription>Scheduled payroll runs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayrolls.map((payroll) => (
                <div
                  key={payroll.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <h4 className="font-medium">{payroll.period}</h4>
                    <p className="text-sm text-muted-foreground">
                      {payroll.date} • {payroll.employees} employees
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${payroll.estimatedAmount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Estimated</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/admin/payroll/schedule">View Schedule</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="recent">Recent Payrolls</TabsTrigger>
          <TabsTrigger value="reports">Payroll Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payroll History</CardTitle>
              <CardDescription>View your recent payroll runs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentPayrolls.map((payroll) => (
                  <div
                    key={payroll.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{payroll.id}</h4>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            payroll.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {payroll.date} • {payroll.period}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {payroll.employees} employees • ${payroll.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/payroll/history/${payroll.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/admin/payroll/history">View All History</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Reports</CardTitle>
              <CardDescription>Generate and view payroll reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Payroll Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Summary of all payroll transactions for a specific period.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Generate
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tax Report</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Detailed breakdown of taxes withheld from employee payments.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Generate
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Superannuation</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Report on superannuation contributions for all employees.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Generate
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

