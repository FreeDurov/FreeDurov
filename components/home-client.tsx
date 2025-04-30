"use client"

import { Suspense } from "react"
import { ProductSkeleton } from "@/components/product-skeleton"
import { HeroSection } from "@/components/hero-section"
import ProductGrid from "@/components/product-grid"

export function HomeClient() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <div className="container px-4 py-6 md:py-10">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Featured Sneakers</h2>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  )
}
