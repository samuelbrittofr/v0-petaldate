"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const { itemCount, openCart } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(245, 237, 228, 0)", "rgba(245, 237, 228, 0.95)"]
  )
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Vibes", href: "/#vibes" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About", href: "/#why" },
  ]

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter: backdropBlur }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.span
              className="font-serif text-2xl md:text-3xl text-espresso tracking-tight cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              PetalDate
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <motion.span
                  className="text-brown/80 hover:text-espresso text-sm font-medium transition-colors relative group cursor-pointer"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose group-hover:w-full transition-all duration-300" />
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-brown/70 hover:text-rose transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-brown/70 hover:text-rose transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="p-2 text-brown/70 hover:text-rose transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="p-2 text-brown relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brown"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={cn(
          "fixed inset-0 z-40 bg-cream pt-20 px-6 md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-6 py-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              animate={isOpen ? { opacity: 1, x: 0, transition: { delay: i * 0.1 } } : { opacity: 0, x: -20 }}
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-serif text-espresso"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-6 border-t border-border">
          <Button variant="outline" size="icon" className="rounded-full relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full relative"
            onClick={() => {
              setIsOpen(false)
              openCart()
            }}
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </motion.div>
    </>
  )
}
