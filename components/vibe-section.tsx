"use client"

import Link from "next/link"
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

const vibes = [
  {
    id: "paint",
    title: "Paint Date Kits",
    tagline: "for couples tired of boring weekends",
    description: "Canvas, paints, wine not included but highly encouraged. Create something beautiful together.",
    color: "from-rose/20 to-blush/30",
    emoji: "🎨",
  },
  {
    id: "clay",
    title: "Clay Date Kits",
    tagline: "main character energy",
    description: "Get your hands dirty. Make matching mugs. Judge each other's artistic abilities.",
    color: "from-peach/30 to-beige/40",
    emoji: "🏺",
  },
  {
    id: "movie",
    title: "Cozy Movie Nights",
    tagline: "perfect for rainy evenings",
    description: "Popcorn, blankets, movie picks, and all the cozy essentials for the perfect night in.",
    color: "from-brown/10 to-beige/30",
    emoji: "🎬",
  },
  {
    id: "scrapbook",
    title: "Memory Scrapbook Boxes",
    tagline: "introvert couple approved",
    description: "Document your love story with stickers, prompts, and all the cute scrapbooking supplies.",
    color: "from-blush/30 to-rose/20",
    emoji: "📔",
  },
  {
    id: "surprise",
    title: "Surprise Date Boxes",
    tagline: "cute nights in > crowded restaurants",
    description: "Let us surprise you. Every box is a mystery waiting to become your new favorite memory.",
    color: "from-peach/20 to-rose/30",
    emoji: "🎁",
  },
]

export function VibeSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, vibes.length - 1])
  const smoothProgress = useSpring(progress, {
    stiffness: 120,
    damping: 28,
    mass: 0.22,
  })

  return (
    <section id="vibes" ref={containerRef} className="relative min-h-[420vh] bg-background">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-4 pb-8 pt-24 text-center"
        >
          <h2 className="mb-3 font-serif text-3xl text-espresso md:text-5xl">
            Pick Your <span className="italic text-rose">Vibe</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every relationship deserves something special
          </p>
        </motion.div>

        <div className="relative flex flex-1 items-center justify-center px-4 pb-16">
          {vibes.map((vibe, index) => (
            <VibeCard key={vibe.id} vibe={vibe} index={index} progress={smoothProgress} />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {vibes.map((_, index) => (
            <ProgressDot key={index} index={index} progress={smoothProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgressDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [index - 0.7, index, index + 0.7], [0.9, 1.3, 0.9])
  const backgroundColor = useTransform(
    progress,
    [index - 0.6, index, index + 0.6],
    ["var(--border)", "var(--rose)", "var(--border)"],
  )

  return <motion.div className="h-2 w-2 rounded-full" style={{ scale, backgroundColor }} />
}

interface VibeCardProps {
  vibe: typeof vibes[number]
  index: number
  progress: MotionValue<number>
}

function VibeCard({ vibe, index, progress }: VibeCardProps) {
  const distance = useTransform(progress, (value) => value - index)
  const y = useTransform(distance, [-1.5, -1, 0, 1, 1.5], [-220, -110, 0, 110, 220])
  const scale = useTransform(distance, [-1.5, -1, 0, 1, 1.5], [0.76, 0.88, 1, 0.9, 0.78])
  const opacity = useTransform(distance, [-1.6, -1.15, -0.15, 0, 0.15, 1.15, 1.6], [0, 0.2, 0.84, 1, 0.96, 0.24, 0])
  const rotateX = useTransform(distance, [-1.5, 0, 1.5], [22, 0, -22])
  const rotateZ = useTransform(distance, [-1.5, -0.6, 0, 0.6, 1.5], [-6, -2, 0, 2, 6])
  const blur = useTransform(distance, [-1.5, -0.7, 0, 0.7, 1.5], [8, 3, 0, 3, 8])
  const zIndex = useTransform(distance, [-1.5, 0, 1.5], [1, 20, 1])

  return (
    <motion.div
      style={{ y, scale, opacity, rotateX, rotateZ, zIndex, filter: useTransform(blur, (value) => `blur(${value}px)`) }}
      className="absolute mx-auto w-full max-w-lg [transform-style:preserve-3d]"
    >
      <motion.div
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br p-8 shadow-2xl shadow-brown/5 backdrop-blur-sm md:p-10",
          vibe.color,
        )}
      >
        <div className="absolute right-4 top-4 text-6xl opacity-20">
          {vibe.emoji}
        </div>

        <div className="relative z-10">
          <span className="mb-4 inline-block rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-rose backdrop-blur-sm">
            {vibe.tagline}
          </span>

          <h3 className="mb-3 font-serif text-2xl text-espresso md:text-3xl">
            {vibe.title}
          </h3>

          <p className="mb-6 leading-relaxed text-brown/70">
            {vibe.description}
          </p>

          <Link href={`/shop?category=${vibe.id}`} className="group inline-flex items-center gap-2 font-medium text-espresso">
            Explore {vibe.title.split(" ")[0]}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="mt-6 h-32 overflow-hidden rounded-2xl bg-card/50 md:h-40">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/50 to-transparent">
            <span className="text-5xl">{vibe.emoji}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
