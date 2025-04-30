"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useShoppingCart } from "@/components/shopping-cart-provider"
import { useTranslation } from "@/components/language-provider"
import { products } from "@/lib/products"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export function ProductDetailClient({ id }: { id: string }) {
  const { t } = useTranslation()
  const { addToCart } = useShoppingCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
    })
  }

  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center text-sm mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("backToProducts")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center">
            <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
            {product.new && (
              <Badge className="ml-4" variant="secondary">
                {t("new")}
              </Badge>
            )}
          </div>

          <div className="mt-6">
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">{t("description")}</TabsTrigger>
                <TabsTrigger value="details">{t("details")}</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-4 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{t("category")}</h3>
                  <p className="text-muted-foreground">{t(product.category)}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t("colors")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Badge key={color} variant="outline">
                        {t(color)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-3">{t("selectSize")}</h3>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="text-center"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
            {selectedSize === "" && <p className="text-sm text-muted-foreground mt-2">{t("pleaseSelectSize")}</p>}
          </div>

          <div className="mt-8 flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={selectedSize === ""}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              {t("addToCart")}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="mr-2 h-5 w-5" />
              {t("addToWishlist")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailClient
