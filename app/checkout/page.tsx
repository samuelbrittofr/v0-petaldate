"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ShieldCheck, ShoppingBag, Truck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

const deliveryFee = 9

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, hasFreeShipping, clearCart } = useCart()
  const [step, setStep] = useState<"details" | "review">("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  })

  const shipping = hasFreeShipping ? 0 : deliveryFee
  const total = subtotal + shipping
  const orderId = useMemo(() => `PD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, [])

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleContinue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStep("review")
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    clearCart()
    router.push(`/checkout/success?order=${orderId}`)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="px-4 pb-24 pt-32">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-8 text-center shadow-xl shadow-brown/5 md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush/30">
              <ShoppingBag className="h-8 w-8 text-rose" />
            </div>
            <h1 className="mt-6 font-serif text-3xl text-espresso">Your checkout is waiting on a cart.</h1>
            <p className="mt-4 text-muted-foreground">
              Add a kit first and this page will handle customer details, order review, and the handoff to your future payment stack.
            </p>
            <Link href="/shop" className="mt-8 inline-flex">
              <Button className="rounded-full bg-espresso text-white hover:bg-brown">Browse Date Kits</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="px-4 pb-20 pt-32 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-espresso">
                <ArrowLeft className="h-4 w-4" />
                Back to shopping
              </Link>
              <h1 className="mt-3 font-serif text-3xl text-espresso md:text-5xl">Checkout</h1>
              <p className="mt-2 text-muted-foreground">
                Front-end order flow is live now. Payment and shipping providers can plug into this next.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-rose" />
              Secure checkout foundation
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-brown/5 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${step === "details" ? "bg-rose" : "bg-green-500"}`} />
                <span className="text-sm font-medium text-espresso">Customer details</span>
                <div className="h-px flex-1 bg-border" />
                <div className={`h-2.5 w-2.5 rounded-full ${step === "review" ? "bg-rose" : "bg-border"}`} />
                <span className="text-sm font-medium text-espresso">Review order</span>
              </div>

              {step === "details" ? (
                <form onSubmit={handleContinue} className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" value={form.name} onChange={(value) => updateField("name", value)} required />
                  <Field label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} required />
                  <Field label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} required />
                  <Field label="City" value={form.city} onChange={(value) => updateField("city", value)} required />
                  <div className="md:col-span-2">
                    <Field label="Address" value={form.address} onChange={(value) => updateField("address", value)} required />
                  </div>
                  <Field label="State" value={form.state} onChange={(value) => updateField("state", value)} required />
                  <Field label="Postal code" value={form.postalCode} onChange={(value) => updateField("postalCode", value)} required />
                  <div className="md:col-span-2">
                    <Field
                      label="Order notes"
                      value={form.notes}
                      onChange={(value) => updateField("notes", value)}
                      textarea
                    />
                  </div>

                  <div className="mt-2 md:col-span-2">
                    <Button type="submit" className="w-full rounded-full bg-espresso py-6 text-white hover:bg-brown">
                      Continue to Review
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-[1.5rem] bg-blush/15 p-5">
                    <h2 className="font-serif text-2xl text-espresso">Review your order</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      This final screen is ready for Razorpay and order creation hooks. Right now it confirms the front-end flow and hands you off to a success state.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <ReviewBlock title="Customer" lines={[form.name, form.email, form.phone]} />
                    <ReviewBlock title="Delivery" lines={[form.address, `${form.city}, ${form.state} ${form.postalCode}`]} />
                  </div>

                  {form.notes && <ReviewBlock title="Notes" lines={[form.notes]} />}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="outline" onClick={() => setStep("details")} className="rounded-full">
                      Edit Details
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="rounded-full bg-espresso text-white hover:bg-brown sm:flex-1"
                    >
                      {isSubmitting ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="h-fit rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-brown/5 md:p-8 lg:sticky lg:top-28"
            >
              <h2 className="font-serif text-2xl text-espresso">Order summary</h2>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 rounded-[1.5rem] bg-background p-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blush/20 text-3xl">
                      {getCategoryEmoji(item.product.category)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-espresso">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty {item.quantity}
                        {item.addOns.length > 0 ? ` • ${item.addOns.length} extras` : ""}
                      </p>
                    </div>
                    <p className="font-medium text-espresso">
                      ${(item.product.price * item.quantity + item.addOns.reduce((sum, addOn) => sum + addOn.price, 0)).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                <Row label="Subtotal" value={`$${subtotal.toFixed(0)}`} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(0)}`} />
                <Row label="Estimated total" value={`$${total.toFixed(0)}`} strong />
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-peach/15 p-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 font-medium text-espresso">
                  <Truck className="h-4 w-4 text-rose" />
                  Launch note
                </div>
                <p className="mt-2">
                  Razorpay payment capture, Supabase order storage, and Shiprocket fulfillment can plug into this checkout step without reworking the surface.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  textarea = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  type?: string
  textarea?: boolean
}) {
  const shared = "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-espresso outline-none transition focus:border-rose"

  return (
    <label className="block text-sm font-medium text-espresso">
      {label}
      {textarea ? (
        <textarea className={`${shared} min-h-28 resize-none`} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      ) : (
        <input className={shared} type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      )}
    </label>
  )
}

function ReviewBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-background p-5">
      <h3 className="font-medium text-espresso">{title}</h3>
      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  )
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "text-base font-semibold text-espresso" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function getCategoryEmoji(category: string) {
  const emojis: Record<string, string> = {
    paint: "🎨",
    clay: "🏺",
    movie: "🎬",
    scrapbook: "📔",
    surprise: "🎁",
  }

  return emojis[category] ?? "✨"
}
