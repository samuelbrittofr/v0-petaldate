"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

const floatingImages = [
  { src: "/images/hero-paint.jpg", alt: "Paint date kit", className: "w-32 md:w-48 -rotate-6", delay: 0 },
  { src: "/images/hero-clay.jpg", alt: "Clay date kit", className: "w-28 md:w-40 rotate-3", delay: 0.1 },
  { src: "/images/hero-candles.jpg", alt: "Romantic candles", className: "w-24 md:w-36 -rotate-3", delay: 0.2 },
  { src: "/images/hero-flowers.jpg", alt: "Fresh flowers", className: "w-28 md:w-44 rotate-6", delay: 0.3 },
  { src: "/images/hero-snacks.jpg", alt: "Date snacks", className: "w-26 md:w-38 -rotate-2", delay: 0.15 },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-cream">
      {/* Ambient Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--blush)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--peach)_0%,_transparent_40%)] opacity-50" />
      
      {/* Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-blush/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border px-4 py-2 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-rose" />
          <span className="text-sm text-brown font-medium">Date nights, reimagined</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-espresso text-center max-w-4xl leading-tight text-balance"
        >
          Pinterest Dates,{" "}
          <span className="text-rose italic">Delivered.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-lg md:text-xl text-brown/80 text-center max-w-2xl leading-relaxed text-pretty"
        >
          Paint nights, cozy movie dates, clay kits, scrapbook memories and aesthetic experiences — all planned for you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <Button 
            size="lg" 
            className="bg-espresso hover:bg-brown text-primary-foreground px-8 py-6 text-base font-medium rounded-full group"
          >
            Explore Kits
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-rose/40 hover:bg-rose/10 text-espresso px-8 py-6 text-base font-medium rounded-full"
          >
            Pick Your Vibe
          </Button>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 text-sm text-muted-foreground italic"
        >
          {"because \"what do you wanna do?\" shouldn't take 2 hours."}
        </motion.p>

        {/* Floating Image Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 md:mt-16 relative w-full max-w-5xl h-48 md:h-72"
        >
          {floatingImages.map((img, i) => (
            <motion.div
              key={i}
              className={`absolute ${getImagePosition(i)}`}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
              }}
              transition={{ 
                duration: 0.8, 
                delay: 1.2 + img.delay,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`${img.className} aspect-[3/4] rounded-2xl bg-beige shadow-xl overflow-hidden border-4 border-card`}
              >
                <div className="w-full h-full bg-gradient-to-br from-blush/40 to-peach/40 flex items-center justify-center">
                  <span className="text-4xl opacity-40">
                    {['🎨', '🏺', '🕯️', '💐', '🍫'][i]}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-brown/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-rose" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function getImagePosition(index: number): string {
  const positions = [
    "left-[5%] top-0",
    "left-[25%] top-8 md:top-12",
    "left-1/2 -translate-x-1/2 top-4",
    "right-[25%] top-10 md:top-14",
    "right-[5%] top-2",
  ]
  return positions[index] || positions[0]
}
