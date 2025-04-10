"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { useParams } from 'next/navigation'
export default  function PayslipDetailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams<{ id: string;}>()
  // Mock data for a single payslip
  const payslip = {
    id: params.id,
    employeeName: "John Doe",
    employeeId: "EMP-001",
    position: "Software Engineer",
    date: "May 15, 2025",
    period: "May 1 - May 15, 2025",
    paymentMethod: "Direct Deposit",
    bankAccount: "XXXX-XXXX-1234",
    earnings: [
      { description: "Regular Hours", hours: 80, rate: 45, amount: 3600 },
      { description: "Overtime", hours: 0, rate: 67.5, amount: 0 },
    ],
    deductions: [
      { description: "Income Tax", amount: 720 },
      { description: "Medicare Levy", amount: 72 },
    ],
    contributions: [{ description: "Superannuation", amount: 342 }],
    grossPay: 3600,
    totalDeductions: 792,
    netPay: 2808,
    ytdGross: 18000,
    ytdTax: 3600,
    ytdSuper: 1710,
    ytdNet: 12690,
    companyName: "Acme Corporation",
    companyAbn: "12 345 678 901",
  }

  const handleDownload = () => {
    setIsLoading(true)
    // Simulate download delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/employee/payslips">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payslips
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Payslip Details</h1>
      </div>

      <div className="print:hidden mb-6 flex justify-end space-x-4">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print Payslip
        </Button>
        <Button onClick={handleDownload} disabled={isLoading}>
          <Download className="mr-2 h-4 w-4" />
          {isLoading ? "Downloading..." : "Download PDF"}
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle className="text-2xl">{payslip.companyName}</CardTitle>
              <CardDescription>ABN: {payslip.companyAbn}</CardDescription>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <h3 className="text-xl font-semibold">PAYSLIP</h3>
              <p className="text-muted-foreground">{payslip.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Employee Details</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{payslip.employeeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee ID:</span>
                  <span>{payslip.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span>{payslip.position}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pay Date:</span>
                  <span>{payslip.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pay Period:</span>
                  <span>{payslip.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span>{payslip.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank Account:</span>
                  <span>{payslip.bankAccount}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Earnings</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payslip.earnings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.hours}</TableCell>
                      <TableCell className="text-right">${item.rate.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="font-semibold text-right">
                      Gross Pay
                    </TableCell>
                    <TableCell className="font-semibold text-right">${payslip.grossPay.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Deductions</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payslip.deductions.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-semibold text-right">Total Deductions</TableCell>
                      <TableCell className="font-semibold text-right">${payslip.totalDeductions.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Employer Contributions</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payslip.contributions.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Net Pay</span>
                <span className="text-2xl font-bold">${payslip.netPay.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-2" />

            <div>
              <h3 className="font-semibold mb-2">Year to Date Summary</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Gross Earnings</TableCell>
                    <TableCell className="text-right">${payslip.ytdGross.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Paid</TableCell>
                    <TableCell className="text-right">${payslip.ytdTax.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Superannuation</TableCell>
                    <TableCell className="text-right">${payslip.ytdSuper.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Net Pay</TableCell>
                    <TableCell className="text-right">${payslip.ytdNet.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground">
            This payslip was generated automatically. If you have any questions, please contact the payroll department.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

