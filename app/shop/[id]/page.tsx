"use client"

import { useState, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Plus,
  Minus,
  Star,
  Check,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  Package,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { getProductById, products, addOns, type AddOn } from "@/lib/products"
import { cn } from "@/lib/utils"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  
  const [quantity, setQuantity] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([])
  const [activeImage, setActiveImage] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()

  if (!product) {
    notFound()
  }

  const isWishlisted = isInWishlist(product.id)

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn]
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedAddOns)
  }

  const totalPrice =
    product.price * quantity +
    selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0)

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const categoryEmoji: Record<string, string> = {
    paint: "🎨",
    clay: "🏺",
    movie: "🎬",
    scrapbook: "📔",
    surprise: "🎁",
  }

  const faqs = [
    {
      question: "When will my order arrive?",
      answer:
        "Most orders ship within 1-2 business days and arrive within 3-5 business days. Express shipping is available at checkout.",
    },
    {
      question: "Is this suitable for beginners?",
      answer:
        "Absolutely! All our kits are designed for couples of any skill level. Clear instructions and all materials are included - no experience needed.",
    },
    {
      question: "Can I customize my order?",
      answer:
        "Yes! You can add extras like handwritten notes, fairy lights, and more. Just select your add-ons before adding to cart.",
    },
    {
      question: "What if I'm not satisfied?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not completely happy, contact us for a full refund or exchange.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-espresso transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-espresso transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-espresso">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-3xl bg-gradient-to-br from-blush/30 via-peach/20 to-rose/10 overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[12rem] opacity-60"
                  >
                    {categoryEmoji[product.category]}
                  </motion.span>
                </div>

                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleItem(product)}
                  className={cn(
                    "absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all shadow-lg",
                    isWishlisted
                      ? "bg-rose text-white"
                      : "bg-card text-brown/60 hover:text-rose"
                  )}
                >
                  <Heart
                    className={cn("w-6 h-6", isWishlisted && "fill-current")}
                  />
                </motion.button>
              </motion.div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[0, 1, 2].map((i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "w-20 h-20 rounded-xl bg-gradient-to-br from-blush/30 to-peach/20 flex-shrink-0 flex items-center justify-center border-2 transition-all",
                      activeImage === i
                        ? "border-rose"
                        : "border-transparent hover:border-rose/30"
                    )}
                  >
                    <span className="text-3xl opacity-60">
                      {categoryEmoji[product.category]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < Math.floor(product.reviews.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-espresso">
                    {product.reviews.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({product.reviews.count} reviews)
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl text-espresso mb-2">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground italic">
                    {product.tagline}
                  </p>
                </div>

                {/* Vibes */}
                <div className="flex flex-wrap gap-2">
                  {product.vibes.map((vibe) => (
                    <span
                      key={vibe}
                      className="px-4 py-2 bg-blush/30 text-brown text-sm font-medium rounded-full"
                    >
                      {vibe}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-serif text-espresso">
                    ${totalPrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Add-ons */}
                <div className="space-y-4">
                  <p className="font-medium text-espresso flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose" />
                    Make it extra special
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {addOns.map((addOn) => {
                      const isSelected = selectedAddOns.some(
                        (a) => a.id === addOn.id
                      )
                      return (
                        <motion.button
                          key={addOn.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleAddOn(addOn)}
                          className={cn(
                            "relative flex items-center gap-3 p-4 rounded-2xl text-left transition-all border",
                            isSelected
                              ? "bg-rose/10 border-rose"
                              : "bg-card border-border hover:border-rose/30"
                          )}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-rose rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <span className="text-2xl">{addOn.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-espresso truncate">
                              {addOn.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              +${addOn.price}
                            </p>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity */}
                  <div className="flex items-center gap-4 bg-muted rounded-full px-2 py-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-espresso hover:bg-rose/10 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="w-8 text-center font-medium text-lg">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-espresso hover:bg-rose/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 py-4 px-8 bg-gradient-to-r from-rose to-primary text-white rounded-full font-medium text-lg shadow-lg shadow-rose/25 hover:shadow-xl hover:shadow-rose/30 transition-all"
                  >
                    Add to Cart - ${totalPrice}
                  </motion.button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blush/30 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-brown" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Free shipping over $99
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blush/30 flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-brown" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      30-day returns
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blush/30 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-brown" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Secure checkout
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-16 bg-blush/10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl text-espresso text-center mb-8">
            Perfect For
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {product.perfectFor.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-5 py-3 bg-card rounded-full border border-border"
              >
                <Check className="w-4 h-4 text-rose" />
                <span className="text-espresso">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-espresso mb-4">
              What&apos;s Inside
            </h2>
            <p className="text-muted-foreground">
              Everything you need for the perfect date night
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.whatsInside.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-rose" />
                </div>
                <span className="text-espresso">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-cream/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl text-espresso text-center mb-8">
            Common Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-espresso">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-2xl md:text-3xl text-espresso text-center mb-12">
              You Might Also Love
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile Sticky Add to Cart */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-40 lg:hidden"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-espresso">${totalPrice}</p>
            <p className="text-xs text-muted-foreground">
              {quantity} {quantity === 1 ? "item" : "items"}
              {selectedAddOns.length > 0 && ` + ${selectedAddOns.length} extras`}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 max-w-xs py-4 bg-gradient-to-r from-rose to-primary text-white rounded-full font-medium shadow-lg shadow-rose/25"
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>

      <Footer />
    </main>
  )
}
