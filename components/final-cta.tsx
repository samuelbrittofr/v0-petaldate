"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush/40 via-rose/20 to-peach/30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full"
            style={{
              background: `radial-gradient(circle, var(--${['rose', 'blush', 'peach'][i % 3]}) 0%, transparent 70%)`,
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 100}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ scale, opacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        {/* Decorative Hearts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-2 mb-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              <Heart 
                className={`w-6 h-6 ${i === 2 ? 'text-rose fill-rose w-8 h-8' : 'text-rose/50'}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso leading-tight text-balance"
        >
          Your Next Favorite Memory{" "}
          <span className="text-rose italic">Starts Here.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-brown/80 max-w-xl mx-auto"
        >
          Stop scrolling. Start experiencing. Your Pinterest dreams are waiting.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
          <Button 
            size="lg" 
            className="bg-espresso hover:bg-brown text-primary-foreground px-10 py-7 text-lg font-medium rounded-full group shadow-xl shadow-brown/20"
          >
            Shop Date Kits
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-brown/60"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Free Shipping over $75
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose" />
            Happiness Guaranteed
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-peach" />
            Gift-Ready Packaging
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
