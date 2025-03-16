import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
// import { PayslipList } from "@/components/payroll/payslip-list"
// import { PayslipDetail } from "@/components/payroll/payslip-detail"
import { CalendarDays, Download, Filter } from 'lucide-react'

export default function PayslipsPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payslips</h1>
        <p className="text-muted-foreground">
          View and download your payslips
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
            Download All
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Payslips</CardTitle>
            <CardDescription>
              Your recent payslips
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <PayslipList /> */}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payslip Detail</CardTitle>
            <CardDescription>
              May 31, 2023
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <PayslipDetail /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
