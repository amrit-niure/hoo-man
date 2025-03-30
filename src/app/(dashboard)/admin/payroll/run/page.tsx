"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Calendar, DollarSign, FileText, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function RunPayrollPage() {
  const [loading, setLoading] = useState(false)
  const [payrollStep, setPayrollStep] = useState(1)
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [payPeriod, setPayPeriod] = useState("current")

  const employees = [
    {
      id: "1",
      name: "John Doe",
      position: "Software Engineer",
      hourlyRate: 45,
      hoursWorked: 80,
      grossPay: 3600,
      tax: 720,
      superannuation: 342,
      netPay: 2538,
    },
    {
      id: "2",
      name: "Jane Smith",
      position: "Product Manager",
      hourlyRate: 55,
      hoursWorked: 80,
      grossPay: 4400,
      tax: 880,
      superannuation: 418,
      netPay: 3102,
    },
    {
      id: "3",
      name: "Michael Johnson",
      position: "UX Designer",
      hourlyRate: 40,
      hoursWorked: 76,
      grossPay: 3040,
      tax: 608,
      superannuation: 289,
      netPay: 2143,
    },
    {
      id: "4",
      name: "Emily Williams",
      position: "Marketing Specialist",
      hourlyRate: 38,
      hoursWorked: 80,
      grossPay: 3040,
      tax: 608,
      superannuation: 289,
      netPay: 2143,
    },
    {
      id: "5",
      name: "Robert Brown",
      position: "Sales Representative",
      hourlyRate: 35,
      hoursWorked: 84,
      grossPay: 2940,
      tax: 588,
      superannuation: 279,
      netPay: 2073,
    },
  ]

  const toggleEmployee = (employeeId: string) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId))
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId])
    }
  }

  const selectAllEmployees = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(employees.map((emp) => emp.id))
    }
  }

  const handleRunPayroll = () => {
    setLoading(true)
    // Simulate API call to Stripe
    setTimeout(() => {
      setLoading(false)
      toast("Payroll processed successfully")
      setPayrollStep(3)
    }, 2000)
  }

  const getTotalAmount = () => {
    return employees.filter((emp) => selectedEmployees.includes(emp.id)).reduce((total, emp) => total + emp.netPay, 0)
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/payroll">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payroll
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Run Payroll</h1>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${payrollStep >= 1 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
          >
            1
          </div>
          <div className={`h-0.5 w-12 ${payrollStep >= 2 ? "bg-primary" : "bg-border"}`}></div>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${payrollStep >= 2 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
          >
            2
          </div>
          <div className={`h-0.5 w-12 ${payrollStep >= 3 ? "bg-primary" : "bg-border"}`}></div>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${payrollStep >= 3 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
          >
            3
          </div>
        </div>
      </div>

      {payrollStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Pay Period</CardTitle>
            <CardDescription>Choose the pay period for this payroll run</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="period">Pay Period</Label>
                <Select value={payPeriod} onValueChange={setPayPeriod}>
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Select pay period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current (May 1 - May 15, 2025)</SelectItem>
                    <SelectItem value="previous">Previous (Apr 16 - Apr 30, 2025)</SelectItem>
                    <SelectItem value="custom">Custom Period</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {payPeriod === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="relative">
                      <Input id="start-date" type="date" />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <div className="relative">
                      <Input id="end-date" type="date" />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setPayrollStep(2)}>Continue</Button>
          </CardFooter>
        </Card>
      )}

      {payrollStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Employees</CardTitle>
            <CardDescription>Choose which employees to include in this payroll run</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedEmployees.length === employees.length}
                  onCheckedChange={selectAllEmployees}
                />
                <Label htmlFor="select-all">Select All</Label>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedEmployees.length} of {employees.length} selected
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Gross Pay</TableHead>
                  <TableHead className="text-right">Tax</TableHead>
                  <TableHead className="text-right">Super</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={() => toggleEmployee(employee.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell className="text-right">{employee.hoursWorked}</TableCell>
                    <TableCell className="text-right">${employee.hourlyRate}</TableCell>
                    <TableCell className="text-right">${employee.grossPay}</TableCell>
                    <TableCell className="text-right">${employee.tax}</TableCell>
                    <TableCell className="text-right">${employee.superannuation}</TableCell>
                    <TableCell className="text-right">${employee.netPay}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setPayrollStep(1)}>
              Back
            </Button>
            <Button onClick={handleRunPayroll} disabled={selectedEmployees.length === 0 || loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Run Payroll (${getTotalAmount().toFixed(2)})
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {payrollStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Payroll Complete</CardTitle>
            <CardDescription>Payroll has been processed successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-xl font-semibold">Payroll Processed</h3>
              <p className="mb-4 text-muted-foreground">
                You have successfully processed payroll for {selectedEmployees.length} employees.
              </p>
              <div className="mb-6 flex justify-center space-x-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold">${getTotalAmount().toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Pay Period</p>
                  <p className="text-lg font-medium">May 1 - May 15, 2025</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Summary
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  View Payslips
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/admin/payroll">Back to Payroll</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/payroll/history">View Payroll History</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

