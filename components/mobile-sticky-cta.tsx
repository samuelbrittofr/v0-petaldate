"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"

export function MobileStickyCTA() {
  const { scrollY } = useScroll()
  const { itemCount, openCart } = useCart()
  
  const opacity = useTransform(scrollY, [300, 500], [0, 1])
  const y = useTransform(scrollY, [300, 500], [100, 0])

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-cream via-cream to-transparent pb-6 pt-10 md:hidden pointer-events-none"
    >
      <div className="pointer-events-auto flex gap-3">
        <Link href="/shop" className="flex-1">
          <Button 
            size="lg" 
            className="w-full bg-espresso hover:bg-brown text-primary-foreground py-6 text-base font-medium rounded-full shadow-xl shadow-brown/20"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop Date Kits
          </Button>
        </Link>
        {itemCount > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
            className="w-14 h-14 bg-rose hover:bg-rose/90 text-white rounded-full flex items-center justify-center relative shadow-xl shadow-rose/30"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-espresso text-xs font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
