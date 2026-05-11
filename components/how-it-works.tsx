"use client"

import { motion } from "framer-motion"
import { Sparkles, Package, Heart } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Pick your vibe",
    description: "Choose from paint nights, clay dates, cozy movie nights, or let us surprise you.",
    icon: Sparkles,
    color: "bg-rose/10 text-rose",
  },
  {
    number: "02",
    title: "We deliver the experience",
    description: "Everything you need arrives at your door, beautifully packaged and ready to go.",
    icon: Package,
    color: "bg-peach/20 text-brown",
  },
  {
    number: "03",
    title: "Open the box and make memories",
    description: "Set the mood, follow our guide, and create your new favorite memory together.",
    icon: Heart,
    color: "bg-blush/20 text-rose",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-blush/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-peach/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-espresso mb-4">
            How It <span className="text-rose italic">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to your next favorite date night
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 md:gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative h-full"
              >
                {/* Connector Line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-[2px] bg-gradient-to-r from-border to-transparent z-0" />
                )}

                <div className="relative bg-card rounded-3xl p-8 border border-border/50 shadow-lg shadow-brown/5 h-full">
                  {/* Step Number */}
                  <span className="absolute -top-3 -left-3 w-10 h-10 bg-espresso text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium shadow-md">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6`}
                  >
                    <step.icon className="w-7 h-7" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-serif text-xl md:text-2xl text-espresso mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
