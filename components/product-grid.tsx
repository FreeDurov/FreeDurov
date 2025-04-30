"use client"

import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Sidebar } from "@/components/sidebar"
import { useTranslation } from "@/components/language-provider"
import { products } from "@/lib/products"

export default function ProductGrid() {
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  // Get filter parameters from URL
  const categories = searchParams.get("categories")?.split(",") || []
  const colors = searchParams.get("colors")?.split(",") || []
  const minPrice = Number(searchParams.get("minPrice") || 0)
  const maxPrice = Number(searchParams.get("maxPrice") || 300)

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false
    }

    // Filter by color
    if (colors.length > 0 && !colors.some((color) => product.colors.includes(color))) {
      return false
    }

    // Filter by price
    if (product.price < minPrice || product.price > maxPrice) {
      return false
    }

    return true
  })

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Sidebar />
      <div className="flex-1">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <h3 className="text-xl font-medium mb-2">{t("noProductsFound")}</h3>
            <p className="text-muted-foreground">{t("tryDifferentFilters")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
