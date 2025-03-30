import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
// import { UpcomingPayments } from "@/components/payroll/upcoming-payments"
// import { RecentPayments } from "@/components/payroll/recent-payments"
import { CalendarDays, Download, Filter } from 'lucide-react'
import { PayrollSummary } from "./payroll-summary"

export default function PayrollPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
        <p className="text-muted-foreground">
          Manage employee compensation and payments
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            June 2023
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">Run Payroll</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$324,895</div>
            <p className="text-xs text-muted-foreground">
              For current month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,240</div>
            <p className="text-xs text-muted-foreground">
              Per employee
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payroll Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2.5%</div>
            <p className="text-xs text-muted-foreground">
              From previous month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Next Payday
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">June 30</div>
            <p className="text-xs text-muted-foreground">
              In 12 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Summary</CardTitle>
              <CardDescription>
                Monthly payroll breakdown by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayrollSummary />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>
                Scheduled payments for the next pay period
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <UpcomingPayments /> */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Recent payroll payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <RecentPayments /> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
