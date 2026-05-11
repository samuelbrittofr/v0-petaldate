"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
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

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])
  const xRight = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"])

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-espresso mb-4">
            Real <span className="text-rose italic">Love</span> Stories
          </h2>
          <p className="text-muted-foreground text-lg">
            What couples are saying about their PetalDate experiences
          </p>
        </motion.div>
      </div>

      {/* Scrolling Testimonials */}
      <div className="relative">
        {/* First Row - Scrolls Left */}
        <motion.div 
          style={{ x: xLeft }}
          className="flex gap-6 mb-6"
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* Second Row - Scrolls Right */}
        <motion.div 
          style={{ x: xRight }}
          className="flex gap-6"
        >
          {[...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 mt-16 grid grid-cols-3 gap-8 text-center"
      >
        {[
          { value: "10k+", label: "Happy Couples" },
          { value: "4.9", label: "Average Rating", icon: true },
          { value: "50k+", label: "Memories Made" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl md:text-4xl font-serif text-espresso">{stat.value}</span>
              {stat.icon && <Star className="w-5 h-5 md:w-6 md:h-6 text-rose fill-rose" />}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="flex-shrink-0 w-[300px] md:w-[350px] bg-card rounded-2xl p-6 border border-border/50 shadow-lg shadow-brown/5"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{testimonial.emoji}</span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-rose fill-rose" />
          ))}
        </div>
      </div>
      
      <p className="text-espresso font-medium text-lg mb-4 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{testimonial.author}</span>
        <span className="text-rose/70 text-xs">{testimonial.product}</span>
      </div>
    </motion.div>
  )
}
