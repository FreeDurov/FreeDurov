"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CreditCard, Wallet, Bitcoin } from "lucide-react"
import { useTranslation } from "@/components/language-provider"
import { useShoppingCart } from "@/components/shopping-cart-provider"
import { useToast } from "@/components/ui/use-toast"

export function PaymentForm() {
  const { t } = useTranslation()
  const { cartItems, clearCart } = useShoppingCart()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    // Credit Card
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    // PayPal
    paypalEmail: "",
    // Crypto
    cryptoAddress: "",
    cryptoType: "bitcoin",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 8.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate based on payment method
    if (paymentMethod === "card") {
      if (!formData.cardName) newErrors.cardName = "Name is required"
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required"
      if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = "Card number must be 16 digits"
      if (!formData.cardExpiry) newErrors.cardExpiry = "Expiry date is required"
      if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) newErrors.cardExpiry = "Expiry date must be in MM/YY format"
      if (!formData.cardCvc) newErrors.cardCvc = "CVC is required"
      if (!formData.cardCvc.match(/^\d{3,4}$/)) newErrors.cardCvc = "CVC must be 3 or 4 digits"
    } else if (paymentMethod === "paypal") {
      if (!formData.paypalEmail) newErrors.paypalEmail = "PayPal email is required"
      if (!formData.paypalEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.paypalEmail = "Invalid email format"
    } else if (paymentMethod === "crypto") {
      if (!formData.cryptoAddress) newErrors.cryptoAddress = "Wallet address is required"
      if (formData.cryptoAddress.length < 26) newErrors.cryptoAddress = "Invalid wallet address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)

      toast({
        title: "Payment successful!",
        description: "Your order has been placed.",
      })

      clearCart()

      // In a real app, you would redirect to an order confirmation page
    }, 2000)
  }

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>{t("payment")}</CardTitle>
                <CardDescription>{t("completeYourOrder")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("paymentMethod")}</h3>
                  <Tabs defaultValue="card" onValueChange={setPaymentMethod} value={paymentMethod}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="card">
                        <CreditCard className="h-4 w-4 mr-2" />
                        {t("creditCard")}
                      </TabsTrigger>
                      <TabsTrigger value="paypal">
                        <Wallet className="h-4 w-4 mr-2" />
                        PayPal
                      </TabsTrigger>
                      <TabsTrigger value="crypto">
                        <Bitcoin className="h-4 w-4 mr-2" />
                        {t("cryptocurrency")}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">{t("nameOnCard")}</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Smith"
                        />
                        {errors.cardName && <p className="text-sm text-destructive">{errors.cardName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">{t("cardNumber")}</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                        />
                        {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">{t("expiryDate")}</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.cardExpiry && <p className="text-sm text-destructive">{errors.cardExpiry}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">CVC</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength={4}
                            type="password"
                          />
                          {errors.cardCvc && <p className="text-sm text-destructive">{errors.cardCvc}</p>}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="paypalEmail">PayPal {t("email")}</Label>
                        <Input
                          id="paypalEmail"
                          name="paypalEmail"
                          type="email"
                          value={formData.paypalEmail}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                        />
                        {errors.paypalEmail && <p className="text-sm text-destructive">{errors.paypalEmail}</p>}
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{t("paypalRedirectInfo")}</AlertDescription>
                      </Alert>
                    </TabsContent>

                    <TabsContent value="crypto" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cryptoType">{t("selectCrypto")}</Label>
                        <RadioGroup
                          id="cryptoType"
                          name="cryptoType"
                          value={formData.cryptoType}
                          onValueChange={(value) => setFormData({ ...formData, cryptoType: value })}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bitcoin" id="bitcoin" />
                            <Label htmlFor="bitcoin">Bitcoin (BTC)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ethereum" id="ethereum" />
                            <Label htmlFor="ethereum">Ethereum (ETH)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="usdt" id="usdt" />
                            <Label htmlFor="usdt">Tether (USDT)</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cryptoAddress">{t("walletAddress")}</Label>
                        <Input
                          id="cryptoAddress"
                          name="cryptoAddress"
                          value={formData.cryptoAddress}
                          onChange={handleInputChange}
                          placeholder={
                            formData.cryptoType === "bitcoin"
                              ? "bc1q..."
                              : formData.cryptoType === "ethereum"
                                ? "0x..."
                                : "T..."
                          }
                        />
                        {errors.cryptoAddress && <p className="text-sm text-destructive">{errors.cryptoAddress}</p>}
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{t("cryptoPaymentInfo")}</AlertDescription>
                      </Alert>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t("processing") : t("payNow")}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t("subtotal")}</span>
                  <span className="text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t("shipping")}</span>
                  <span className="text-sm">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t("tax")}</span>
                  <span className="text-sm">${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>{t("total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PaymentForm
