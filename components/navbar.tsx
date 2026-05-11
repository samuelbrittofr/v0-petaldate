"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Heart, Home, ShoppingBag, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const smoothScroll = useSpring(scrollY, { stiffness: 170, damping: 26, mass: 0.2 })
  const { itemCount, openCart } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  const backgroundColor = useTransform(
    smoothScroll,
    [0, 100],
    ["rgba(245, 237, 228, 0.2)", "rgba(245, 237, 228, 0.94)"],
  )

  const borderColor = useTransform(
    smoothScroll,
    [0, 100],
    ["rgba(230, 215, 202, 0)", "rgba(230, 215, 202, 0.8)"],
  )

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Vibes", href: "/#vibes" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About", href: "/#why" },
  ]

  return (
    <>
      <motion.nav
        style={{ backgroundColor, borderColor }}
        className="fixed inset-x-0 top-0 z-50 border-b px-4 py-4 backdrop-blur-xl md:px-8"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <motion.span
              className="cursor-pointer font-serif text-2xl tracking-tight text-espresso md:text-3xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              PetalDate
            </motion.span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <motion.span
                  className="group relative cursor-pointer text-sm font-medium text-brown/80 transition-colors hover:text-espresso"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-rose transition-all duration-300 group-hover:w-full" />
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <NavIconLink href="/" label="Home">
              <Home className="h-5 w-5" />
            </NavIconLink>
            <NavIconLink href="/wishlist" label="Wishlist" badge={wishlistCount}>
              <Heart className="h-5 w-5" />
            </NavIconLink>
            <NavIconLink href="/account" label="Account">
              <User className="h-5 w-5" />
            </NavIconLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative rounded-full p-2 text-brown/70 transition-colors hover:text-rose"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              <Badge count={itemCount} />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/" aria-label="Home" className="rounded-full p-2 text-brown">
              <Home className="h-5 w-5" />
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative p-2 text-brown"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              <Badge count={itemCount} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen((current) => !current)}
              className="p-2 text-brown"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-0 z-40 bg-cream/98 px-6 pt-24 backdrop-blur-xl md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div className="flex flex-col gap-6 py-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              animate={
                isOpen
                  ? { opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.28 } }
                  : { opacity: 0, x: -20 }
              }
            >
              <Link href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-serif text-espresso">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-4 border-t border-border pt-6">
          <Link href="/wishlist" onClick={() => setIsOpen(false)}>
            <Button variant="outline" size="icon" className="relative rounded-full">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[10px] font-medium text-primary-foreground">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/account" onClick={() => setIsOpen(false)}>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full"
            onClick={() => {
              setIsOpen(false)
              openCart()
            }}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[10px] font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </motion.div>
    </>
  )
}

function NavIconLink({
  href,
  label,
  children,
  badge = 0,
}: {
  href: string
  label: string
  children: React.ReactNode
  badge?: number
}) {
  return (
    <Link href={href} aria-label={label} className="relative rounded-full p-2 text-brown/70 transition-colors hover:text-rose">
      {children}
      <Badge count={badge} />
    </Link>
  )
}

function Badge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[10px] font-medium text-primary-foreground"
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
