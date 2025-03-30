"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, CreditCard, Loader2, Lock } from "lucide-react"

const bankDetailsSchema = z.object({
  accountName: z.string().min(2, { message: "Account name is required" }),
  accountNumber: z
    .string()
    .min(6, { message: "Account number must be at least 6 digits" })
    .max(10, { message: "Account number must be at most 10 digits" }),
  bsb: z.string().regex(/^\d{3}-\d{3}$/, { message: "BSB must be in the format XXX-XXX" }),
  bankName: z.string().min(2, { message: "Bank name is required" }),
  accountType: z.string().min(1, { message: "Please select an account type" }),
})

type BankDetailsFormValues = z.infer<typeof bankDetailsSchema>

export default function BankDetailsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Default values for the form
  const defaultValues: Partial<BankDetailsFormValues> = {
    accountName: "John Doe",
    accountNumber: "12345678",
    bsb: "123-456",
    bankName: "Commonwealth Bank",
    accountType: "savings",
  }

  const form = useForm<BankDetailsFormValues>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues,
  })

  function onSubmit(data: BankDetailsFormValues) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Bank details updated",
        description: "Your bank account details have been updated successfully.",
      })
    }, 1500)
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/employee/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Bank Account Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Update Bank Details</CardTitle>
              <CardDescription>Update your bank account information for payroll deposits</CardDescription>
            </CardHeader>
            <CardContent>
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
                        <FormDescription>Enter the name exactly as it appears on your bank account</FormDescription>
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
                            <Input placeholder="XXX-XXX" {...field} />
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

                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Save Bank Details"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Secure Information</CardTitle>
              <CardDescription>Your bank details are securely stored and encrypted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Bank-Level Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Your bank account information is encrypted using industry-standard protocols. We never store your
                    full account details in our database.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>How your payments are processed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Direct Deposit</h3>
                    <p className="text-sm text-muted-foreground">
                      All payments are processed via direct deposit to your bank account on the scheduled pay date.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Processing Time</h3>
                    <p className="text-sm text-muted-foreground">
                      Payments are typically processed within 1-2 business days after the payroll is run.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                If you update your bank details, the changes will be applied to the next payroll run.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

