"use client"

import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useShoppingCart } from "@/components/shopping-cart-provider"
import { useTranslation } from "@/components/language-provider"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ShoppingCartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useShoppingCart()
  const { t } = useTranslation()

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const isEmpty = cartItems.length === 0

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-xl">{t("shoppingCart")}</SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <div className="rounded-full bg-muted p-6 mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">{t("cartEmpty")}</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">{t("cartEmptyMessage")}</p>
            <Button onClick={() => setIsCartOpen(false)}>{t("continueShopping")}</Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <ul className="space-y-5 py-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="h-24 w-24 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{t(item.category)}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">{t("remove")}</span>
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">{t("decrease")}</span>
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">{t("increase")}</span>
                          </Button>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm">{t("subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t("shipping")}</span>
                  <span>{t("calculatedAtCheckout")}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>{t("total")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <SheetFooter>
                <Button className="w-full" asChild onClick={() => setIsCartOpen(false)}>
                  <Link href="/checkout">{t("checkout")}</Link>
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function ShoppingBag(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
