"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

const floatingImages = [
  { className: "w-32 md:w-48 -rotate-6", delay: 0, emoji: "🎨" },
  { className: "w-28 md:w-40 rotate-3", delay: 0.1, emoji: "🏺" },
  { className: "w-24 md:w-36 -rotate-3", delay: 0.2, emoji: "🕯️" },
  { className: "w-28 md:w-44 rotate-6", delay: 0.3, emoji: "💐" },
  { className: "w-26 md:w-38 -rotate-2", delay: 0.15, emoji: "🍫" },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.18,
  })

  const heroY = useTransform(smoothProgress, [0, 1], [0, -48])
  const heroOpacity = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.95, 0.15])
  const headlineScale = useTransform(smoothProgress, [0, 1], [1, 0.9])
  const galleryY = useTransform(smoothProgress, [0, 1], [0, 220])
  const galleryScale = useTransform(smoothProgress, [0, 1], [1, 0.5])
  const galleryOpacity = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.9, 0.1])
  const galleryRotateX = useTransform(smoothProgress, [0, 1], [0, -18])
  const barOpacity = useTransform(smoothProgress, [0.55, 1], [0, 1])

  return (
    <section ref={containerRef} className="relative min-h-[180vh] bg-cream">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--blush)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--peach)_0%,_transparent_40%)] opacity-50" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-64 w-64 rounded-full bg-blush/20"
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

      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12"
        >
          <motion.div style={{ scale: headlineScale }} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-rose" />
              <span className="text-sm font-medium text-brown">Date nights, reimagined</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl text-balance text-center font-serif text-4xl leading-tight text-espresso sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Pinterest Dates, <span className="italic text-rose">Delivered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 max-w-2xl text-pretty text-center text-lg leading-relaxed text-brown/80 md:text-xl"
            >
              Paint nights, cozy movie dates, clay kits, scrapbook memories and aesthetic experiences — all planned for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link href="/shop">
                <Button
                  size="lg"
                  className="group rounded-full bg-espresso px-8 py-6 text-base font-medium text-primary-foreground hover:bg-brown"
                >
                  Explore Kits
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#vibes">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-rose/40 px-8 py-6 text-base font-medium text-espresso hover:bg-rose/10"
                >
                  Pick Your Vibe
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 text-sm italic text-muted-foreground"
            >
              {"because \"what do you wanna do?\" shouldn't take 2 hours."}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ y: galleryY, scale: galleryScale, opacity: galleryOpacity, rotateX: galleryRotateX }}
            className="relative mt-12 h-48 w-full max-w-5xl [perspective:1200px] md:mt-16 md:h-72"
          >
            {floatingImages.map((img, i) => (
              <motion.div
                key={i}
                className={`absolute ${getImagePosition(i)}`}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2 + img.delay,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 2, 0, -2, 0] }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`${img.className} aspect-[3/4] overflow-hidden rounded-2xl border-4 border-card bg-beige shadow-xl`}
                >
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blush/40 to-peach/40">
                    <span className="text-4xl opacity-40">{img.emoji}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-brown/30 p-2"
            >
              <motion.div className="h-1.5 w-1.5 rounded-full bg-rose" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: barOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-background via-background/92 to-transparent"
        />
      </div>
    </section>
  )
}

function getImagePosition(index: number): string {
  const positions = [
    "left-[5%] top-0",
    "left-[25%] top-8 md:top-12",
    "left-1/2 top-4 -translate-x-1/2",
    "right-[25%] top-10 md:top-14",
    "right-[5%] top-2",
  ]

  return positions[index] || positions[0]
}
