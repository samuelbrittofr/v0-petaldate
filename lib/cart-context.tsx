"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Product, AddOn } from "./products"

export interface CartItem {
  product: Product
  quantity: number
  addOns: AddOn[]
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (product: Product, quantity?: number, addOns?: AddOn[]) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  addAddOn: (productId: string, addOn: AddOn) => void
  removeAddOn: (productId: string, addOnId: string) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  shippingThreshold: number
  amountToFreeShipping: number
  hasFreeShipping: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const SHIPPING_THRESHOLD = 99 // $99 for free shipping

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), [])

  const addItem = useCallback((product: Product, quantity = 1, addOns: AddOn[] = []) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, addOns: [...item.addOns, ...addOns] }
            : item
        )
      }
      return [...prev, { product, quantity, addOns }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId))
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const addAddOn = useCallback((productId: string, addOn: AddOn) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, addOns: [...item.addOns, addOn] }
          : item
      )
    )
  }, [])

  const removeAddOn = useCallback((productId: string, addOnId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, addOns: item.addOns.filter((a) => a.id !== addOnId) }
          : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setIsOpen(false)
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = items.reduce((sum, item) => {
    const productTotal = item.product.price * item.quantity
    const addOnsTotal = item.addOns.reduce((a, addOn) => a + addOn.price, 0)
    return sum + productTotal + addOnsTotal
  }, 0)

  const amountToFreeShipping = Math.max(0, SHIPPING_THRESHOLD - subtotal)
  const hasFreeShipping = subtotal >= SHIPPING_THRESHOLD

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        addAddOn,
        removeAddOn,
        clearCart,
        itemCount,
        subtotal,
        shippingThreshold: SHIPPING_THRESHOLD,
        amountToFreeShipping,
        hasFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
