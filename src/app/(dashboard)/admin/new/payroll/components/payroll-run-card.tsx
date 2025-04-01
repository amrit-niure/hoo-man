import { PayrollRun } from "@prisma/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PayrollRunCard({ run }: { run: PayrollRun & { processedBy: { name: string } } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{run.name}</span>
          <Badge variant={run.status === "COMPLETED" ? "default" : "secondary"}>
            {run.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Period</p>
            <p>
              {format(new Date(run.payPeriodStart), "MMM d, yyyy")} -{" "}
              {format(new Date(run.payPeriodEnd), "MMM d, yyyy")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Processed By</p>
            <p>{run.processedBy.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p>${run.totalGross?.toFixed(2) || "0.00"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}