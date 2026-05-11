"use client"

import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
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
    offset: ["start start", "end end"]
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, vibes.length - 1])

  return (
    <section id="vibes" ref={containerRef} className="relative min-h-[400vh] bg-background">
      {/* Section Header */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center pt-24 pb-8 px-4"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-espresso mb-3">
            Pick Your <span className="text-rose italic">Vibe</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Every relationship deserves something special
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="flex-1 relative flex items-center justify-center px-4 pb-12">
          {vibes.map((vibe, index) => (
            <VibeCard
              key={vibe.id}
              vibe={vibe}
              index={index}
              progress={progress}
            />
          ))}
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          <ProgressDot index={0} progress={progress} />
          <ProgressDot index={1} progress={progress} />
          <ProgressDot index={2} progress={progress} />
          <ProgressDot index={3} progress={progress} />
          <ProgressDot index={4} progress={progress} />
        </div>
      </div>
    </section>
  )
}

function ProgressDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const backgroundColor = useTransform(
    progress,
    [index - 0.5, index, index + 0.5],
    ["var(--border)", "var(--rose)", "var(--border)"]
  )

  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor }}
    />
  )
}

interface VibeCardProps {
  vibe: typeof vibes[0]
  index: number
  progress: MotionValue<number>
}

function VibeCard({ vibe, index, progress }: VibeCardProps) {
  const cardProgress = useTransform(progress, [index - 1, index, index + 1], [1, 0, -1])
  
  const y = useTransform(cardProgress, [-1, 0, 1], [-100, 0, 100])
  const scale = useTransform(cardProgress, [-1, 0, 1], [0.85, 1, 0.85])
  const opacity = useTransform(cardProgress, [-1, -0.5, 0, 0.5, 1], [0, 1, 1, 1, 0])
  const rotateX = useTransform(cardProgress, [-1, 0, 1], [15, 0, -15])

  return (
    <motion.div
      style={{ y, scale, opacity, rotateX }}
      className="absolute w-full max-w-lg mx-auto"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          "relative bg-gradient-to-br rounded-3xl p-8 md:p-10",
          "border border-border/50 shadow-2xl shadow-brown/5",
          "backdrop-blur-sm overflow-hidden",
          vibe.color
        )}
      >
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-6xl opacity-20">
          {vibe.emoji}
        </div>
        
        <div className="relative z-10">
          {/* Tag */}
          <span className="inline-block px-3 py-1 bg-card/80 backdrop-blur-sm rounded-full text-xs font-medium text-rose mb-4">
            {vibe.tagline}
          </span>
          
          {/* Title */}
          <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-3">
            {vibe.title}
          </h3>
          
          {/* Description */}
          <p className="text-brown/70 leading-relaxed mb-6">
            {vibe.description}
          </p>
          
          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-espresso font-medium group"
          >
            Explore {vibe.title.split(" ")[0]}
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>

        {/* Bottom decorative image placeholder */}
        <div className="mt-6 h-32 md:h-40 rounded-2xl bg-card/50 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-white/50 to-transparent flex items-center justify-center">
            <span className="text-5xl">{vibe.emoji}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
