"use client"

import { motion } from "framer-motion"
import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useWishlist } from "@/lib/wishlist-context"
import { Button } from "@/components/ui/button"

export default function WishlistPage() {
  const { items, itemCount } = useWishlist()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-rose" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-espresso mb-2">
              Your Wishlist
            </h1>
            <p className="text-muted-foreground">
              {itemCount === 0
                ? "Save your favorite date kits here"
                : `${itemCount} ${itemCount === 1 ? "item" : "items"} saved for later`}
            </p>
          </motion.div>

          {/* Wishlist Items */}
          {items.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {items.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-blush/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-rose/40" />
              </div>
              <h2 className="font-serif text-xl text-espresso mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Browse our collection and tap the heart icon to save your favorite date kits for later.
              </p>
              <Link href="/shop">
                <Button className="bg-espresso hover:bg-brown text-white rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Start Browsing
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
