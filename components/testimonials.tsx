"use client"

import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "this was genuinely the cutest date we've had",
    author: "Sarah & Mike",
    product: "Paint Date Box",
    emoji: "💕",
  },
  {
    id: 2,
    quote: "felt like a pinterest board came to life",
    author: "Emma",
    product: "Clay Date Kit",
    emoji: "✨",
  },
  {
    id: 3,
    quote: "we literally forgot our phones for 2 hours",
    author: "Jake & Lily",
    product: "Scrapbook Box",
    emoji: "📱",
  },
  {
    id: 4,
    quote: "finally something different than just dinner",
    author: "Marcus",
    product: "Surprise Date",
    emoji: "🍽️",
  },
  {
    id: 5,
    quote: "my boyfriend thought i planned this whole thing myself lol",
    author: "Chloe",
    product: "Movie Night",
    emoji: "😂",
  },
  {
    id: 6,
    quote: "the clay mugs we made are actually cute??",
    author: "Ben & Ana",
    product: "Clay Date Kit",
    emoji: "🏺",
  },
]

const LOOP_WIDTH = testimonials.length * 374

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-120px" })
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const easedVelocity = useSpring(scrollVelocity, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  })

  return (
    <section ref={containerRef} className="overflow-hidden bg-background py-24 md:py-32">
      <div className="mb-12 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="mb-4 font-serif text-3xl text-espresso md:text-5xl">
            Real <span className="italic text-rose">Love</span> Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            What couples are saying about their PetalDate experiences
          </p>
        </motion.div>
      </div>

      <div className="relative space-y-6">
        <MarqueeRow items={testimonials} direction={-1} scrollVelocity={easedVelocity} />
        <MarqueeRow
          items={[...testimonials.slice(3), ...testimonials.slice(0, 3)]}
          direction={1}
          scrollVelocity={easedVelocity}
        />
      </div>

      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-8 px-4 text-center"
      >
        <StatItem value={10000} label="Happy Couples" suffix="+" inView={isStatsInView} />
        <StatItem value={4.9} label="Average Rating" decimals={1} icon inView={isStatsInView} />
        <StatItem value={50000} label="Memories Made" suffix="+" inView={isStatsInView} />
      </motion.div>
    </section>
  )
}

function MarqueeRow({
  items,
  direction,
  scrollVelocity,
}: {
  items: typeof testimonials
  direction: 1 | -1
  scrollVelocity: ReturnType<typeof useSpring>
}) {
  const baseX = useMotionValue(0)
  const boost = useTransform(scrollVelocity, [-2500, 0, 2500], [-120, 0, 120])
  const cards = [...items, ...items, ...items]

  useAnimationFrame((_, delta) => {
    const idleDistance = 36 * (delta / 1000)
    const stimulatedDistance = boost.get() * 0.02 * (delta / 16.67)
    const next = baseX.get() + (idleDistance + stimulatedDistance) * direction
    baseX.set(wrap(-LOOP_WIDTH, 0, next))
  })

  return (
    <div className="overflow-hidden">
      <motion.div style={{ x: baseX }} className="flex gap-6 will-change-transform">
        {cards.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </motion.div>
    </div>
  )
}

function StatItem({
  value,
  label,
  suffix = "",
  decimals = 0,
  icon = false,
  inView,
}: {
  value: number
  label: string
  suffix?: string
  decimals?: number
  icon?: boolean
  inView: boolean
}) {
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!inView) return

    let frame = 0
    const start = performance.now()
    const duration = 1500

    const tick = (time: number) => {
      const elapsed = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      const nextValue = value * eased
      setDisplayValue(
        decimals > 0 ? nextValue.toFixed(decimals) : Math.round(nextValue).toLocaleString(),
      )

      if (elapsed < 1) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [decimals, inView, value])

  return (
    <div>
      <div className="flex items-center justify-center gap-1">
        <span className="font-serif text-2xl text-espresso md:text-4xl">
          {displayValue}
          {suffix}
        </span>
        {icon && <Star className="h-5 w-5 fill-rose text-rose md:h-6 md:w-6" />}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[number] }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-[300px] flex-shrink-0 rounded-2xl border border-border/50 bg-card p-6 shadow-lg shadow-brown/5 md:w-[350px]"
    >
      <div className="mb-4 flex items-start gap-3">
        <span className="text-2xl">{testimonial.emoji}</span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-rose text-rose" />
          ))}
        </div>
      </div>

      <p className="mb-4 text-lg font-medium leading-relaxed text-espresso">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{testimonial.author}</span>
        <span className="text-xs text-rose/70">{testimonial.product}</span>
      </div>
    </motion.div>
  )
}

function wrap(min: number, max: number, value: number) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}
