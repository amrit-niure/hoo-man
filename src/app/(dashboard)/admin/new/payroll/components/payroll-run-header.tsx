"use client"
import { Button } from "@/components/ui/button";
import { PayrollRun } from "@prisma/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface PayrollRunHeaderProps {
  run: PayrollRun & {
    processedBy: { name: string };
    payslips: { id: string }[];
  };
  onProcess: () => Promise<void>;
  onGeneratePayslips: () => Promise<void>;
}

export function PayrollRunHeader({ run, onProcess, onGeneratePayslips }: PayrollRunHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{run.name}</h1>
          <p className="text-muted-foreground">{run.description}</p>
        </div>
        <Badge variant={run.status === "COMPLETED" ? "default" : "secondary"}>
          {run.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Pay Period</p>
          <p>
            {format(new Date(run.payPeriodStart), "MMM d, yyyy")} -{" "}
            {format(new Date(run.payPeriodEnd), "MMM d, yyyy")}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Processed By</p>
          <p>{run.processedBy.name}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Processed At</p>
          <p>{run.processedAt ? format(new Date(run.processedAt), "MMM d, yyyy h:mm a") : "Not processed"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Gross</p>
          <p className="text-lg font-semibold">${run.totalGross?.toFixed(2)}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Net</p>
          <p className="text-lg font-semibold">${run.totalNet?.toFixed(2)}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Tax</p>
          <p className="text-lg font-semibold">${run.totalTax?.toFixed(2)}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Super</p>
          <p className="text-lg font-semibold">${run.totalSuper?.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        {run.status === "DRAFT" && run.payslips.length === 0 && (
          <Button onClick={onGeneratePayslips} variant="default">
            Generate Payslips
          </Button>
        )}

        {run.status === "DRAFT" && run.payslips.length > 0 && (
          <Button onClick={onProcess} variant="default">
            Process Payroll
          </Button>
        )}

        {run.status === "COMPLETED" && (
          <Button variant="secondary" disabled>
            Payroll Completed
          </Button>
        )}
      </div>
    </div>
  );
}