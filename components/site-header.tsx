"use client"

import Link from "next/link"
import { ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useShoppingCart } from "@/components/shopping-cart-provider"
import { useSidebar } from "@/components/sidebar-provider"
import { useTranslation } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { UserNav } from "@/components/user-nav"
import { ShoppingCartDrawer } from "@/components/shopping-cart-drawer"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const { cartItems, isCartOpen, setIsCartOpen } = useShoppingCart()
  const { t } = useTranslation()
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">NIKE</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              {t("home")}
            </Link>
            <Link href="/men" className="transition-colors hover:text-foreground/80">
              {t("men")}
            </Link>
            <Link href="/women" className="transition-colors hover:text-foreground/80">
              {t("women")}
            </Link>
            <Link href="/kids" className="transition-colors hover:text-foreground/80">
              {t("kids")}
            </Link>
            <Link href="/collections" className="transition-colors hover:text-foreground/80">
              {t("collections")}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-1">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemsCount}
              </Badge>
            )}
            <span className="sr-only">{t("cart")}</span>
          </Button>
          <UserNav />
        </div>
        <ShoppingCartDrawer />
      </div>
    </header>
  )
}
