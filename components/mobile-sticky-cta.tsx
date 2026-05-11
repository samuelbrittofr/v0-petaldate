"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileStickyCTA() {
  const { scrollY } = useScroll()
  
  const opacity = useTransform(scrollY, [300, 500], [0, 1])
  const y = useTransform(scrollY, [300, 500], [100, 0])

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-cream via-cream to-transparent pb-6 pt-10 md:hidden pointer-events-none"
    >
      <div className="pointer-events-auto">
        <Button 
          size="lg" 
          className="w-full bg-espresso hover:bg-brown text-primary-foreground py-6 text-base font-medium rounded-full shadow-xl shadow-brown/20"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Shop Date Kits
        </Button>
      </div>
    </motion.div>
  )
}
