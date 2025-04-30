"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-provider"

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black z-10" />
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-black flex items-center justify-center">
        <Image
          src="/images/nike-logo.png"
          alt="Nike logo"
          width={800}
          height={400}
          className="object-contain opacity-70"
          priority
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container px-4">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t("heroTitle")}</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">{t("heroSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="sm:w-auto">
                {t("shopNow")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 sm:w-auto"
              >
                {t("exploreCollection")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
