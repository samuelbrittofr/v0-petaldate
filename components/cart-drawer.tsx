"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, ShoppingBag, Sparkles, Truck } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { addOns } from "@/lib/products"
import { cn } from "@/lib/utils"

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    addAddOn,
    itemCount,
    subtotal,
    amountToFreeShipping,
    hasFreeShipping,
    shippingThreshold,
  } = useCart()

  const suggestedAddOns = addOns.filter((a) => a.popular).slice(0, 3)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-rose" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-espresso">Your Cart</h2>
                  <p className="text-sm text-muted-foreground">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Free Shipping Progress */}
            {!hasFreeShipping && subtotal > 0 && (
              <div className="px-6 py-4 bg-blush/20 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-rose" />
                  <span className="text-sm text-espresso">
                    You&apos;re <span className="font-semibold">${amountToFreeShipping.toFixed(0)}</span> away from free shipping
                  </span>
                </div>
                <div className="w-full h-2 bg-card rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-rose to-peach rounded-full"
                  />
                </div>
              </div>
            )}

            {hasFreeShipping && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-3 bg-gradient-to-r from-rose/20 to-peach/20 border-b border-border flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-rose" />
                <span className="text-sm font-medium text-espresso">
                  You&apos;ve unlocked free shipping!
                </span>
              </motion.div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-20 h-20 bg-blush/30 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-rose/60" />
                  </div>
                  <h3 className="font-serif text-lg text-espresso mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Time to discover your next cozy night in
                  </p>
                  <Button
                    onClick={closeCart}
                    className="bg-espresso hover:bg-brown text-white rounded-full"
                  >
                    Browse Kits
                  </Button>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Cart Items */}
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex gap-4 pb-6 border-b border-border/50 last:border-0"
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blush/30 to-peach/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-4xl">
                            {item.product.category === "paint" && "🎨"}
                            {item.product.category === "clay" && "🏺"}
                            {item.product.category === "movie" && "🎬"}
                            {item.product.category === "scrapbook" && "📔"}
                            {item.product.category === "surprise" && "🎁"}
                          </span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-espresso truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground italic truncate">
                            {item.product.tagline}
                          </p>

                          {/* Add-ons */}
                          {item.addOns.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.addOns.map((addOn, idx) => (
                                <span
                                  key={`${addOn.id}-${idx}`}
                                  className="text-xs bg-blush/30 text-brown px-2 py-0.5 rounded-full"
                                >
                                  {addOn.emoji} {addOn.name}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Price & Quantity */}
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-medium text-espresso">
                              ${(item.product.price * item.quantity + item.addOns.reduce((a, b) => a + b.price, 0)).toFixed(0)}
                            </span>

                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-rose/20 hover:text-rose transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="w-6 text-center font-medium">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-rose/20 hover:text-rose transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.product.id)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Suggested Add-ons */}
                  {items.length > 0 && (
                    <div className="pt-4">
                      <p className="text-sm font-medium text-espresso mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-rose" />
                        Make it extra special
                      </p>
                      <div className="grid gap-2">
                        {suggestedAddOns.map((addOn) => (
                          <motion.button
                            key={addOn.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => addAddOn(items[0].product.id, addOn)}
                            className="flex items-center gap-3 p-3 rounded-xl bg-blush/10 hover:bg-blush/20 border border-transparent hover:border-rose/20 transition-all text-left"
                          >
                            <span className="text-2xl">{addOn.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-espresso">
                                {addOn.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {addOn.description}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-rose">
                              +${addOn.price}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-card">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-serif text-espresso">
                    ${subtotal.toFixed(0)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-4 rounded-full font-medium text-white transition-all",
                    "bg-gradient-to-r from-rose to-primary hover:shadow-lg hover:shadow-rose/25"
                  )}
                >
                  Checkout
                </motion.button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
