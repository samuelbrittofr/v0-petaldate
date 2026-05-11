import { ShopPageClient } from "@/components/shop-page-client"
import { categories } from "@/lib/products"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const isValidCategory = categories.some((item) => item.id === category)

  return <ShopPageClient initialCategory={isValidCategory ? category ?? "all" : "all"} />
}
