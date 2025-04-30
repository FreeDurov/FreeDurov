"use client"

import PaymentForm from "@/components/payment-form"

export function CheckoutClient() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <PaymentForm />
    </div>
  )
}
