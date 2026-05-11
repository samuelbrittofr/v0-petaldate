import Link from "next/link"
import { CheckCircle2, ShoppingBag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const { order } = await searchParams
  const orderNumber = order ?? "PD-ORDER"

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="px-4 pb-24 pt-32">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-8 text-center shadow-xl shadow-brown/5 md:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blush/25">
            <CheckCircle2 className="h-10 w-10 text-rose" />
          </div>

          <h1 className="mt-6 font-serif text-3xl text-espresso md:text-5xl">Order flow complete.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your front-end checkout now lands in a proper confirmation state instead of a dead end.
          </p>

          <div className="mt-8 rounded-[1.5rem] bg-background p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Reference</p>
            <p className="mt-2 font-serif text-3xl text-espresso">{orderNumber}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Next integration step: replace this simulated confirmation with Supabase order creation plus Razorpay success handling.
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/shop">
              <Button className="rounded-full bg-espresso text-white hover:bg-brown">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop More Kits
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="outline" className="rounded-full">Go to Account</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
