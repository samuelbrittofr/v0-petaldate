"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  useEffect(() => {
    // Fix for browser refresh - always start at top
    if (typeof window !== "undefined") {
      // Disable browser scroll restoration
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
      }
      
      // Scroll to top on initial load
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }
  }, [])

  return null
}
