"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Eye, FileText, Search } from "lucide-react"

export default function PayrollHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const payrollHistory = [
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
    {
      id: "PR-2025-004",
      date: "Mar 31, 2025",
      period: "Mar 16 - Mar 31, 2025",
      employees: 4,
      amount: 9800,
      status: "completed",
    },
    {
      id: "PR-2025-005",
      date: "Mar 15, 2025",
      period: "Mar 1 - Mar 15, 2025",
      employees: 4,
      amount: 9750,
      status: "completed",
    },
  ]

  const filteredPayroll = payrollHistory.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.period.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/admin/payroll">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payroll
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Payroll History</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <TabsList className="mb-4 sm:mb-0">
            <TabsTrigger value="all">All Payrolls</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>
          <div className="flex w-full sm:w-auto space-x-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payrolls..."
                className="w-full sm:w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>All Payroll Runs</CardTitle>
              <CardDescription>View all payroll runs processed through Stripe</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payroll ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Pay Period</TableHead>
                    <TableHead className="text-center">Employees</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayroll.length > 0 ? (
                    filteredPayroll.map((payroll) => (
                      <TableRow key={payroll.id}>
                        <TableCell className="font-medium">{payroll.id}</TableCell>
                        <TableCell>{payroll.date}</TableCell>
                        <TableCell>{payroll.period}</TableCell>
                        <TableCell className="text-center">{payroll.employees}</TableCell>
                        <TableCell className="text-right">${payroll.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              payroll.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : payroll.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/payroll/history/${payroll.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Payslips</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No payroll records found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payroll Runs</CardTitle>
              <CardDescription>View recent payroll runs from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payroll ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Pay Period</TableHead>
                    <TableHead className="text-center">Employees</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollHistory.slice(0, 2).map((payroll) => (
                    <TableRow key={payroll.id}>
                      <TableCell className="font-medium">{payroll.id}</TableCell>
                      <TableCell>{payroll.date}</TableCell>
                      <TableCell>{payroll.period}</TableCell>
                      <TableCell className="text-center">{payroll.employees}</TableCell>
                      <TableCell className="text-right">${payroll.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/payroll/history/${payroll.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Payslips</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Payroll Runs</CardTitle>
              <CardDescription>View upcoming scheduled payroll runs</CardDescription>
            </CardHeader>
            <CardContent className="py-10 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Scheduled Payrolls</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You don't have any scheduled payroll runs at the moment.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/payroll/schedule">Schedule a Payroll</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

