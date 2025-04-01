"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
  
  interface PayslipTableProps {
    payslips: {
      id: string;
      employee: {
        name: string;
      };
      grossAmount: number;
      netAmount: number;
      taxAmount: number;
      superAmount: number;
      hoursWorked: number;
      paymentStatus: string;
      payPeriodStart: Date;
      payPeriodEnd: Date;
    }[];
  }
  
  export function PayslipTable({ payslips }: PayslipTableProps) {
    const handleDownloadPayslip = async (payslipId: string) => {
      // In a real implementation, you would fetch the payslip data
      // and generate the PDF here
      const response = await fetch(`/api/payslips/${payslipId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `payslip-${payslipId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Hours</TableHead>
            <TableHead className="text-right">Gross</TableHead>
            <TableHead className="text-right">Tax</TableHead>
            <TableHead className="text-right">Super</TableHead>
            <TableHead className="text-right">Net</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payslips.map((payslip) => (
            <TableRow key={payslip.id}>
              <TableCell>{payslip.employee.name}</TableCell>
              <TableCell>
                {format(new Date(payslip.payPeriodStart), "MMM d")} -{" "}
                {format(new Date(payslip.payPeriodEnd), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">{payslip.hoursWorked.toFixed(2)}</TableCell>
              <TableCell className="text-right">${payslip.grossAmount.toFixed(2)}</TableCell>
              <TableCell className="text-right">${payslip.taxAmount.toFixed(2)}</TableCell>
              <TableCell className="text-right">${payslip.superAmount.toFixed(2)}</TableCell>
              <TableCell className="text-right">${payslip.netAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={
                  payslip.paymentStatus === "PROCESSED" ? "default" : 
                  payslip.paymentStatus === "PENDING" ? "secondary" : "destructive"
                }>
                  {payslip.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadPayslip(payslip.id)}
                  >
                    Download
                  </Button>
                  <Link href={`/dashboard/payslips/${payslip.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }