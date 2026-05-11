"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts } from "@/lib/products"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 5)

  return (
    <section id="featured" className="py-24 md:py-32 bg-cream/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blush/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-peach/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-espresso mb-4">
            Featured <span className="text-rose italic">Experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Curated date nights for every kind of couple
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}

          {/* View All Card */}
          <motion.div
            variants={itemVariants}
            className="group sm:col-span-2 lg:col-span-1"
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="h-full min-h-[300px] bg-gradient-to-br from-rose/10 to-blush/20 rounded-3xl border border-rose/20 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-16 h-16 bg-rose/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-serif text-xl text-espresso mb-2">
                Explore All Kits
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Discover your perfect date night
              </p>
              <Link href="/shop">
                <Button 
                  variant="outline"
                  className="border-rose/40 hover:bg-rose/10 text-espresso rounded-full"
                >
                  View Collection
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
