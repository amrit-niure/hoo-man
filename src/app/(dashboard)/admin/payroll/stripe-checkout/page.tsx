"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Stripe } from "./stripe"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Loader2 } from "lucide-react"

// Separate component that will be rendered inside the Stripe Elements provider
function CheckoutForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setMessage(null)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real application, you would use the following code:
      // const { error, paymentIntent } = await stripe.confirmPayment({
      //   elements,
      //   confirmParams: {
      //     return_url: `${window.location.origin}/payment-confirmation`,
      //   },
      // })

      // Simulate successful payment
      setIsSuccess(true)
      setMessage("Payment successful! Your payroll has been processed.")
    } catch (error) {
      setMessage("An unexpected error occurred.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">Payment Successful</h3>
        <p className="text-muted-foreground">Your payroll has been processed successfully.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: "tabs",
          terms: {
            card: "always",
          },
        }}
      />
      <div className="mt-6">
        <Button type="submit" className="w-full" disabled={!stripe || isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay $11,999.00"
          )}
        </Button>
      </div>
      {message && <div className="mt-4 text-center text-sm text-red-500">{message}</div>}
    </form>
  )
}

export default function StripeCheckoutPage() {
  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Process Payroll Payment</CardTitle>
          <CardDescription>Complete your payroll payment using Stripe</CardDescription>
        </CardHeader>
        <CardContent>
          <Stripe
            options={{
              mode: "payment",
              amount: 1199900, // $11,999.00
              currency: "aud",
            }}
            className="min-h-[300px]"
          >
            <CheckoutForm />
          </Stripe>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>Your payment information is secured with bank-level encryption.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

