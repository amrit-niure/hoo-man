import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

interface PayslipCardProps {
  payslip: {
    id: string;
    payPeriodStart: Date;
    payPeriodEnd: Date;
    grossAmount: number;
    netAmount: number;
    paymentStatus: string;
    paymentDate: Date | null;
    payrollRun: {
      name: string;
    } | null;
  };
}

export function PayslipCard({ payslip }: PayslipCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {payslip.payrollRun?.name || "Payslip"}
        </CardTitle>
        <Badge
          variant={
            payslip.paymentStatus === "PROCESSED"
              ? "default"
              : payslip.paymentStatus === "PENDING"
              ? "secondary"
              : "destructive"
          }
        >
          {payslip.paymentStatus}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Period</p>
            <p>
              {format(new Date(payslip.payPeriodStart), "MMM d")} -{" "}
              {format(new Date(payslip.payPeriodEnd), "MMM d, yyyy")}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Gross</p>
            <p className="font-medium">${payslip.grossAmount.toFixed(2)}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Net</p>
            <p className="font-medium">${payslip.netAmount.toFixed(2)}</p>
          </div>
        </div>

        {payslip.paymentDate && (
          <div className="mt-4 text-sm text-muted-foreground">
            Paid on {format(new Date(payslip.paymentDate), "MMM d, yyyy")}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/payslips/${payslip.id}`}>View Details</Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/api/payslips/${payslip.id}/download`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}