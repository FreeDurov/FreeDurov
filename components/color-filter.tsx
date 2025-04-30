"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslation } from "@/components/language-provider"
import { cn } from "@/lib/utils"

const colors = [
  { id: "black", label: "Black", hex: "#000000" },
  { id: "white", label: "White", hex: "#FFFFFF" },
  { id: "red", label: "Red", hex: "#FF0000" },
  { id: "blue", label: "Blue", hex: "#0000FF" },
  { id: "green", label: "Green", hex: "#00FF00" },
  { id: "yellow", label: "Yellow", hex: "#FFFF00" },
  { id: "orange", label: "Orange", hex: "#FFA500" },
  { id: "purple", label: "Purple", hex: "#800080" },
  { id: "pink", label: "Pink", hex: "#FFC0CB" },
  { id: "gray", label: "Gray", hex: "#808080" },
]

export function ColorFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  const initialColors = searchParams.get("colors")?.split(",") || []
  const [selectedColors, setSelectedColors] = useState<string[]>(initialColors)

  const handleColorChange = (colorId: string) => {
    const newColors = selectedColors.includes(colorId)
      ? selectedColors.filter((c) => c !== colorId)
      : [...selectedColors, colorId]

    setSelectedColors(newColors)

    // Update URL with selected colors
    const params = new URLSearchParams(searchParams.toString())
    if (newColors.length > 0) {
      params.set("colors", newColors.join(","))
    } else {
      params.delete("colors")
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{t("colors")}</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            className={cn(
              "w-8 h-8 rounded-full border-2 transition-all",
              selectedColors.includes(color.id)
                ? "border-primary scale-110"
                : "border-muted-foreground/20 hover:border-muted-foreground/50",
              color.id === "white" && "bg-white",
            )}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleColorChange(color.id)}
            aria-label={color.label}
            title={t(color.id)}
          />
        ))}
      </div>
    </div>
  )
}
