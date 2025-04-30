"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { useTranslation } from "@/components/language-provider"

export function PriceFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  const initialMinPrice = Number(searchParams.get("minPrice") || 0)
  const initialMaxPrice = Number(searchParams.get("maxPrice") || 300)

  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice])
  const [debounced, setDebounced] = useState<[number, number]>([initialMinPrice, initialMaxPrice])

  // Debounce price changes to avoid too many URL updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(priceRange)
    }, 500)

    return () => clearTimeout(timer)
  }, [priceRange])

  // Update URL when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debounced[0] > 0) {
      params.set("minPrice", debounced[0].toString())
    } else {
      params.delete("minPrice")
    }

    if (debounced[1] < 300) {
      params.set("maxPrice", debounced[1].toString())
    } else {
      params.delete("maxPrice")
    }

    router.push(`?${params.toString()}`)
  }, [debounced, router, searchParams])

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{t("price")}</h3>
      <Slider
        defaultValue={[initialMinPrice, initialMaxPrice]}
        max={300}
        step={10}
        value={priceRange}
        onValueChange={(value) => setPriceRange(value as [number, number])}
        className="py-4"
      />
      <div className="flex items-center justify-between">
        <span className="text-sm">${priceRange[0]}</span>
        <span className="text-sm">${priceRange[1]}</span>
      </div>
    </div>
  )
}
