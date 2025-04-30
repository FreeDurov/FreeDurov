"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/sidebar-provider"
import { useTranslation } from "@/components/language-provider"
import { CategoryFilter } from "@/components/category-filter"
import { PriceFilter } from "@/components/price-filter"
import { ColorFilter } from "@/components/color-filter"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar()
  const { t } = useTranslation()

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      if (sidebar && !sidebar.contains(event.target as Node) && isOpen) {
        closeSidebar()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, closeSidebar])

  // Prevent scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-background border-r p-6 transition-transform duration-300 ease-in-out md:sticky md:top-[65px] md:z-0 md:h-[calc(100vh-65px)] md:translate-x-0 md:transition-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-xl font-bold">{t("filters")}</h2>
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="space-y-6">
          <CategoryFilter />
          <Separator />
          <PriceFilter />
          <Separator />
          <ColorFilter />

          <div className="flex items-center space-x-2 md:hidden pt-4">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </>
  )
}
