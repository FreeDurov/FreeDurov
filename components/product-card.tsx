"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useShoppingCart } from "@/components/shopping-cart-provider"
import { useTranslation } from "@/components/language-provider"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useShoppingCart()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("group relative overflow-hidden rounded-lg border bg-background", className)}>
      <Link href={`/product/${product.id}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="absolute right-3 top-3 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">{t("addToWishlist")}</span>
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>${product.price.toFixed(2)}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{t(product.category)}</p>
                <p>{product.description}</p>
                <div>
                  <h4 className="text-sm font-medium mb-2">{t("sizes")}</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Badge
                        key={size}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">{t("colors")}</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Badge
                        key={color}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {t(color)}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    addToCart(product)
                    setIsOpen(false)
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {t("addToCart")}
                </Button>
              </div>
            </div>
            <DialogClose className="absolute right-4 top-4">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t(product.category)}</p>
          <p className="mt-1 font-medium">${product.price.toFixed(2)}</p>
        </Link>
        <div className="mt-4">
          <Button className="w-full" size="sm" onClick={() => addToCart(product)}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t("addToCart")}
          </Button>
        </div>
      </div>
    </div>
  )
}
