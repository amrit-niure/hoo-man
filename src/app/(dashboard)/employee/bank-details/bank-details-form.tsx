// app/employee/bank-details/bank-details-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateBankDetails } from "./actions";

const bankDetailsSchema = z.object({
  accountName: z.string().min(2, { message: "Account name is required" }),
  accountNumber: z
    .string()
    .min(6, { message: "Account number must be at least 6 digits" })
    .max(10, { message: "Account number must be at most 10 digits" }),
  bsb: z.string().regex(/^\d{3}-\d{3}$/, { message: "BSB must be in the format XXX-XXX" }),
  bankName: z.string().min(2, { message: "Bank name is required" }),
});

type BankDetailsFormValues = z.infer<typeof bankDetailsSchema>;

export default function BankDetailsForm({
  defaultValues,
}: {
  defaultValues?: Partial<BankDetailsFormValues>;
}) {
  const form = useForm<BankDetailsFormValues>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues,
  });

  const onSubmit = async (data: BankDetailsFormValues) => {
    try {
      await updateBankDetails({
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        bsbNumber: data.bsb,
        bankName: data.bankName,
      });
      toast.success("Bank details updated successfully");
    } catch (error) {
      toast.error("Failed to update bank details");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Holder Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter account holder name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name exactly as it appears on your bank account
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="bsb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BSB</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="XXX-XXX" 
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, '')
                        .replace(/(\d{3})(\d{0,3})/, '$1-$2')
                        .substring(0, 7);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>Format: XXX-XXX</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Bank Details"
          )}
        </Button>
      </form>
    </Form>
  );
}