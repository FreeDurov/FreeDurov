"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/components/language-provider"

const categories = [
  { id: "running", label: "Running" },
  { id: "basketball", label: "Basketball" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "soccer", label: "Soccer" },
  { id: "training", label: "Training & Gym" },
  { id: "skateboarding", label: "Skateboarding" },
]

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  const initialCategories = searchParams.get("categories")?.split(",") || []
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories)

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category)

    setSelectedCategories(newCategories)

    // Update URL with selected categories
    const params = new URLSearchParams(searchParams.toString())
    if (newCategories.length > 0) {
      params.set("categories", newCategories.join(","))
    } else {
      params.delete("categories")
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{t("categories")}</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
            />
            <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
              {t(category.id)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
