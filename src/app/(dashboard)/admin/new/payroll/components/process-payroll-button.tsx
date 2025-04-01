"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { processPayroll } from "../actions";

export function ProcessPayrollButton({ payrollRunId }: { payrollRunId: string }) {
  const router = useRouter();

  const handleProcess = async () => {
    const result = await processPayroll(payrollRunId);
    
    if (result.success) {
      toast.success("Payroll processed successfully");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to process payroll", {
        action: result.error?.includes("verify") ? {
          label: "View Employees",
          onClick: () => router.push("/admin/employees?tab=bank-details")
        } : undefined
      });
    }
  };

  return (
    <Button onClick={handleProcess} variant="default">
      Process Payments
    </Button>
  );
}