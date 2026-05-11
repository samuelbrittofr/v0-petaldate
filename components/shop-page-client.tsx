"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { categories, getProductsByCategory } from "@/lib/products"
import { cn } from "@/lib/utils"

export function ShopPageClient({ initialCategory }: { initialCategory: string }) {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredProducts = getProductsByCategory(activeCategory)

  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    router.replace(categoryId === "all" ? "/shop" : `/shop?category=${categoryId}`, { scroll: false })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blush/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-peach/15 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-rose/10 px-4 py-2 text-sm font-medium text-rose">
              <Sparkles className="h-4 w-4" />
              Curated for couples who stay in
            </span>
            <h1 className="mb-4 font-serif text-4xl text-espresso md:text-6xl lg:text-7xl">
              Pick Your <span className="italic text-rose">Vibe</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Every box is a memory waiting to happen. Find the perfect date night for you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="hidden items-center gap-3 overflow-x-auto md:flex">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition-all",
                  activeCategory === category.id
                    ? "bg-espresso text-white shadow-lg shadow-espresso/25"
                    : "border border-border bg-card text-espresso hover:bg-blush/20",
                )}
              >
                <span className="text-lg">{category.emoji}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.slice(0, 3).map((category) => (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
                    activeCategory === category.id
                      ? "bg-espresso text-white"
                      : "border border-border bg-card text-espresso",
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
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
            >
              <Filter className="h-4 w-4" />
              More
            </motion.button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-card p-6 md:hidden"
            >
              <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-border" />
              <h3 className="mb-4 font-serif text-xl text-espresso">Browse by Vibe</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      selectCategory(category.id)
                      setShowMobileFilters(false)
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl p-4 text-center transition-all",
                      activeCategory === category.id ? "bg-espresso text-white" : "bg-muted text-espresso",
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

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-muted-foreground">
              <span className="font-medium text-espresso">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "experience" : "experiences"} found
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blush/30">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="mb-2 font-serif text-xl text-espresso">No kits found</h3>
              <p className="mb-6 text-muted-foreground">
                Try a different category or browse all our experiences
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectCategory("all")}
                className="rounded-full bg-espresso px-6 py-3 font-medium text-white"
              >
                View All Kits
              </motion.button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-blush/20 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center md:gap-16">
            <div>
              <p className="font-serif text-3xl text-espresso md:text-4xl">50K+</p>
              <p className="text-sm text-muted-foreground">Date nights created</p>
            </div>
            <div className="hidden h-12 w-px bg-border md:block" />
            <div>
              <p className="font-serif text-3xl text-espresso md:text-4xl">4.9</p>
              <p className="text-sm text-muted-foreground">Average rating</p>
            </div>
            <div className="hidden h-12 w-px bg-border md:block" />
            <div>
              <p className="font-serif text-3xl text-espresso md:text-4xl">2 day</p>
              <p className="text-sm text-muted-foreground">Fast delivery</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
