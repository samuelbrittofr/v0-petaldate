import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Date Kits | PetalDate',
  description: 'Browse our curated collection of date night experiences. Paint dates, clay kits, cozy movie nights, scrapbook memories and more.',
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
