"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { Product } from "./products"

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)
const WISHLIST_STORAGE_KEY = "petaldate-wishlist"

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return

    const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!storedWishlist) return

    try {
      const parsed = JSON.parse(storedWishlist) as Product[]
      if (Array.isArray(parsed)) {
        setItems(parsed)
      }
    } catch {
      window.localStorage.removeItem(WISHLIST_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev
      return [...prev, product]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items]
  )

  const itemCount = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
