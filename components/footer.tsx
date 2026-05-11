"use client"

import { motion } from "framer-motion"
import { Instagram, Twitter, Heart } from "lucide-react"

const footerLinks = {
  shop: [
    { label: "All Kits", href: "#" },
    { label: "Paint Dates", href: "#" },
    { label: "Clay Dates", href: "#" },
    { label: "Movie Nights", href: "#" },
    { label: "Gift Cards", href: "#" },
  ],
  company: [
    { label: "Our Story", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
    { label: "Careers", href: "#" },
  ],
  support: [
    { label: "FAQ", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Contact", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-espresso text-cream/90 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-cream/10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <motion.a
              href="#"
              className="font-serif text-2xl text-cream inline-block mb-4"
              whileHover={{ scale: 1.02 }}
            >
              PetalDate
            </motion.a>
            <p className="text-cream/60 text-sm leading-relaxed mb-6">
              Turning Pinterest dreams into real date nights. Because love deserves more than just another dinner.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-cream/10 hover:bg-cream/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-cream/10 hover:bg-cream/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-cream/10 hover:bg-cream/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.76-2.25 3.76-5.49 0-2.87-2.06-4.88-5-4.88-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.13.89 2.73.1.12.11.23.08.35l-.33 1.35c-.05.22-.18.27-.41.16-1.54-.72-2.5-2.96-2.5-4.77 0-3.88 2.82-7.45 8.14-7.45 4.27 0 7.59 3.04 7.59 7.12 0 4.25-2.68 7.67-6.4 7.67-1.25 0-2.42-.65-2.83-1.42l-.77 2.94c-.28 1.07-1.04 2.42-1.55 3.24A12 12 0 1 0 12 0z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-medium text-cream mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/60 hover:text-cream text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-cream mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/60 hover:text-cream text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-cream mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/60 hover:text-cream text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/50">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose fill-rose" /> for couples everywhere
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms</a>
            <span>© 2026 PetalDate</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
