import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import { CartDrawer } from '@/components/cart-drawer'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'PetalDate | Pinterest Dates, Delivered',
  description: 'Paint nights, cozy movie dates, clay kits, scrapbook memories and aesthetic experiences — all planned for you. Turn your Pinterest dreams into real date nights.',
  generator: 'v0.app',
  keywords: ['date night', 'date kit', 'couples activities', 'paint date', 'clay date', 'romantic gifts', 'date ideas'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'PetalDate | Pinterest Dates, Delivered',
    description: 'Turn Pinterest-worthy date ideas into real experiences. No planning, no stress — just open the box and make memories.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#F5EDE4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
