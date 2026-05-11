"use client"

import { motion } from "framer-motion"
import { Heart, Plus, Star } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  index?: number
}

const categoryEmoji: Record<string, string> = {
  paint: "🎨",
  clay: "🏺",
  movie: "🎬",
  scrapbook: "📔",
  surprise: "🎁",
}

const categoryGradients: Record<string, string> = {
  paint: "from-rose/20 via-blush/30 to-peach/20",
  clay: "from-peach/30 via-beige/30 to-blush/20",
  movie: "from-brown/10 via-beige/20 to-cream",
  scrapbook: "from-blush/30 via-rose/20 to-peach/20",
  surprise: "from-rose/20 via-peach/30 to-blush/20",
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="group"
    >
      <Link href={`/shop/${product.id}`}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-lg shadow-brown/5 cursor-pointer"
        >
          {/* Image Area */}
          <div
            className={cn(
              "relative h-56 md:h-64 bg-gradient-to-br overflow-hidden",
              categoryGradients[product.category]
            )}
          >
            {/* Sale Badge */}
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-rose text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                Sale
              </div>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              className={cn(
                "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all",
                isWishlisted
                  ? "bg-rose text-white"
                  : "bg-card/80 backdrop-blur-sm text-brown/60 hover:text-rose"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <motion.div
                animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={cn("w-5 h-5", isWishlisted && "fill-current")}
                />
              </motion.div>
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
                {categoryEmoji[product.category]}
              </motion.span>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-300" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-espresso">
                {product.reviews.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.reviews.count})
              </span>
            </div>

            {/* Vibe Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.vibes.slice(0, 2).map((vibe) => (
                <span
                  key={vibe}
                  className="text-xs font-medium px-2.5 py-1 bg-blush/30 text-brown rounded-full"
                >
                  {vibe}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl text-espresso mb-1 group-hover:text-rose transition-colors">
              {product.name}
            </h3>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground italic mb-4">
              {product.tagline}
            </p>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-espresso">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-4 py-2 bg-espresso hover:bg-brown text-primary-foreground rounded-full text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
