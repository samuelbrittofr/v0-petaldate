"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, MapPin, PackageCheck, ShoppingBag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const quickActions = [
  {
    title: "Continue Shopping",
    description: "Browse the full PetalDate collection and pick your next date-night vibe.",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    title: "Saved Favorites",
    description: "Jump back into your wishlist and compare the kits you liked most.",
    href: "/wishlist",
    icon: Heart,
  },
  {
    title: "Checkout Flow",
    description: "Review the front-end checkout foundation before payment integrations go live.",
    href: "/checkout",
    icon: PackageCheck,
  },
]

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="px-4 pb-20 pt-32 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-xl shadow-brown/5 md:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose/10 px-4 py-2 text-sm font-medium text-rose">
                <PackageCheck className="h-4 w-4" />
                Account hub
              </span>
              <h1 className="mt-6 font-serif text-3xl text-espresso md:text-5xl">
                Orders, favorites, and the next step toward launch.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                This page gives you a clean customer-account foundation while you wire Supabase, Razorpay, and Shiprocket next.
                The shopping flow now has a live front-end path, and this screen can become the signed-in dashboard later.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop">
                  <Button className="rounded-full bg-espresso text-white hover:bg-brown">Browse Kits</Button>
                </Link>
                <Link href="/checkout">
                  <Button variant="outline" className="rounded-full border-rose/30 hover:bg-rose/10">
                    Review Checkout
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2rem] border border-border bg-card/80 p-6 shadow-lg shadow-brown/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blush/30">
                    <MapPin className="h-5 w-5 text-rose" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-espresso">Launch-ready placeholders</h2>
                    <p className="text-sm text-muted-foreground">Customer addresses, order history, and tracking can slot in here next.</p>
                  </div>
                </div>
              </div>

              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 * index }}
                  className="rounded-[2rem] border border-border bg-card p-6 shadow-lg shadow-brown/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peach/20">
                      <action.icon className="h-5 w-5 text-espresso" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-espresso">{action.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{action.description}</p>
                      <Link href={action.href} className="mt-4 inline-flex text-sm font-medium text-rose">
                        Open
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
