"use client"

import { motion } from "framer-motion"
import { Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "Paint Date Box",
    tagline: "for nights you actually remember",
    price: "$65",
    vibes: ["Romantic", "Creative"],
    emoji: "🎨",
    gradient: "from-rose/20 via-blush/30 to-peach/20",
  },
  {
    id: 2,
    name: "Clay Date Kit",
    tagline: "get your hands dirty together",
    price: "$72",
    vibes: ["Playful", "Tactile"],
    emoji: "🏺",
    gradient: "from-peach/30 via-beige/30 to-blush/20",
  },
  {
    id: 3,
    name: "Cozy Movie Night",
    tagline: "made for cozy evenings in",
    price: "$48",
    vibes: ["Cozy", "Relaxed"],
    emoji: "🎬",
    gradient: "from-brown/10 via-beige/20 to-cream",
  },
  {
    id: 4,
    name: "Scrapbook Memory Box",
    tagline: "document your love story",
    price: "$58",
    vibes: ["Nostalgic", "Creative"],
    emoji: "📔",
    gradient: "from-blush/30 via-rose/20 to-peach/20",
  },
  {
    id: 5,
    name: "Surprise Mystery Date",
    tagline: "better than another boring dinner date",
    price: "$55",
    vibes: ["Adventurous", "Fun"],
    emoji: "🎁",
    gradient: "from-rose/20 via-peach/30 to-blush/20",
  },
]

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
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-lg shadow-brown/5"
              >
                {/* Image Area */}
                <div className={cn(
                  "relative h-56 md:h-64 bg-gradient-to-br overflow-hidden",
                  product.gradient
                )}>
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brown/60 hover:text-rose transition-colors z-10"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>

                  {/* Product Visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-8xl opacity-60"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {product.emoji}
                    </motion.span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Vibe Tags */}
                  <div className="flex gap-2 mb-3">
                    {product.vibes.map((vibe) => (
                      <span
                        key={vibe}
                        className="text-xs font-medium px-2.5 py-1 bg-blush/30 text-brown rounded-full"
                      >
                        {vibe}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-espresso mb-1">
                    {product.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-muted-foreground italic mb-4">
                    {product.tagline}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-espresso">
                      {product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-espresso hover:bg-brown text-primary-foreground rounded-full text-sm font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
              <Button 
                variant="outline"
                className="border-rose/40 hover:bg-rose/10 text-espresso rounded-full"
              >
                View Collection
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
