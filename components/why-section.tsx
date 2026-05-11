"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function WhySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section 
      id="why" 
      ref={containerRef} 
      className="relative py-24 md:py-32 overflow-hidden bg-beige/30"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-blush/20 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(y, v => -v * 0.5) }}
          className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-peach/20 blur-3xl"
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso leading-tight text-balance"
        >
          You Want The Cute Pinterest Date.{" "}
          <span className="text-rose italic">We Make It Actually Happen.</span>
        </motion.h2>

        {/* Body Copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 md:mt-14 space-y-6"
        >
          <p className="text-lg md:text-xl text-brown/80 leading-relaxed">
            Most people save cute date ideas but never actually do them.
          </p>
          
          <p className="text-lg md:text-xl text-espresso font-medium leading-relaxed">
            PetalDate turns Pinterest-worthy moments into real experiences.
          </p>

          <div className="pt-4 space-y-2">
            {["No planning.", "No awkwardness.", "No stress."].map((text, i) => (
              <motion.p
                key={text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="text-xl md:text-2xl text-rose font-serif italic"
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-4 text-lg md:text-xl text-brown/70 leading-relaxed"
          >
            Just open the box and enjoy the moment.
          </motion.p>
        </motion.div>

        {/* Decorative Images */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex justify-center gap-4 md:gap-6"
        >
          {[
            { emoji: "💕", rotate: -6 },
            { emoji: "🎨", rotate: 3 },
            { emoji: "🕯️", rotate: -2 },
            { emoji: "📸", rotate: 5 },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="w-20 h-24 md:w-28 md:h-32 rounded-xl bg-card shadow-lg border border-border/50 flex items-center justify-center"
              style={{ rotate: item.rotate }}
            >
              <span className="text-3xl md:text-4xl">{item.emoji}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
