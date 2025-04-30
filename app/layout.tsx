import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider } from "@/components/sidebar-provider"
import { ShoppingCartProvider } from "@/components/shopping-cart-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nike Sneakers Shop",
  description: "Shop the latest Nike sneakers with our modern web application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ShoppingCartProvider>
              <SidebarProvider>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <main className="flex-1">{children}</main>
                </div>
                <Toaster />
              </SidebarProvider>
            </ShoppingCartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
