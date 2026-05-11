"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products, categories, getProductsByCategory } from "@/lib/products"
import { cn } from "@/lib/utils"

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredProducts = getProductsByCategory(activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blush/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-peach/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose/10 text-rose rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Curated for couples who stay in
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-espresso mb-4">
              Pick Your <span className="text-rose italic">Vibe</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Every box is a memory waiting to happen. Find the perfect date night for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeCategory === category.id
                    ? "bg-espresso text-white shadow-lg shadow-espresso/25"
                    : "bg-card hover:bg-blush/20 text-espresso border border-border"
                )}
              >
                <span className="text-lg">{category.emoji}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.slice(0, 3).map((category) => (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === category.id
                      ? "bg-espresso text-white"
                      : "bg-card text-espresso border border-border"
                  )}
                >
                  <span>{category.emoji}</span>
                  {category.name.split(" ")[0]}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              More
            </motion.button>
          </div>
        </div>
      </section>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 p-6 md:hidden"
            >
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
              <h3 className="font-serif text-xl text-espresso mb-4">
                Browse by Vibe
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setShowMobileFilters(false)
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all",
                      activeCategory === category.id
                        ? "bg-espresso text-white"
                        : "bg-muted text-espresso"
                    )}
                  >
                    <span className="text-3xl">{category.emoji}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              <span className="font-medium text-espresso">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "experience" : "experiences"} found
            </p>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-blush/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="font-serif text-xl text-espresso mb-2">
                No kits found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try a different category or browse all our experiences
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory("all")}
                className="px-6 py-3 bg-espresso text-white rounded-full font-medium"
              >
                View All Kits
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-12 bg-blush/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-espresso">50K+</p>
              <p className="text-sm text-muted-foreground">Date nights created</p>
            </div>
            <div className="w-px h-12 bg-border hidden md:block" />
            <div>
              <p className="font-serif text-3xl md:text-4xl text-espresso">4.9</p>
              <p className="text-sm text-muted-foreground">Average rating</p>
            </div>
            <div className="w-px h-12 bg-border hidden md:block" />
            <div>
              <p className="font-serif text-3xl md:text-4xl text-espresso">2 day</p>
              <p className="text-sm text-muted-foreground">Fast delivery</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
