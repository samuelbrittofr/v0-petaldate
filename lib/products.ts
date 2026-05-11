export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: "paint" | "clay" | "movie" | "scrapbook" | "surprise"
  vibes: string[]
  perfectFor: string[]
  whatsInside: string[]
  reviews: {
    rating: number
    count: number
  }
  inStock: boolean
  featured?: boolean
}

export interface AddOn {
  id: string
  name: string
  description: string
  price: number
  emoji: string
  popular?: boolean
}

export const addOns: AddOn[] = [
  {
    id: "handwritten-note",
    name: "Handwritten Love Note",
    description: "A personal touch to make it extra special",
    price: 5,
    emoji: "💌",
    popular: true,
  },
  {
    id: "fairy-lights",
    name: "Fairy Lights String",
    description: "Set the mood with warm twinkling lights",
    price: 12,
    emoji: "✨",
    popular: true,
  },
  {
    id: "polaroid-prints",
    name: "Polaroid-Style Prints",
    description: "Print your favorite memories together",
    price: 15,
    emoji: "📸",
  },
  {
    id: "snack-bundle",
    name: "Cozy Snack Bundle",
    description: "Gourmet treats for your date night",
    price: 18,
    emoji: "🍿",
  },
  {
    id: "candles",
    name: "Scented Candle Duo",
    description: "Vanilla & lavender for the perfect ambiance",
    price: 20,
    emoji: "🕯️",
    popular: true,
  },
  {
    id: "gift-wrap",
    name: "Premium Gift Wrap",
    description: "Beautiful wrapping with a ribbon bow",
    price: 8,
    emoji: "🎀",
  },
]

export const products: Product[] = [
  {
    id: "paint-date-sunset",
    name: "Sunset Canvas Date",
    tagline: "for nights you actually remember",
    description: "Everything you need for a magical painting session together. No experience required - just vibes, laughs, and maybe a little competitive spirit. Perfect for couples who want to create something beautiful (even if it turns out hilariously bad).",
    price: 65,
    images: [
      "/products/paint-1.jpg",
      "/products/paint-2.jpg",
      "/products/paint-3.jpg",
    ],
    category: "paint",
    vibes: ["Romantic", "Creative", "Cozy Nights In"],
    perfectFor: ["Anniversary celebrations", "Rainy weekend vibes", "First date at home", "Creative couples"],
    whatsInside: [
      "2 pre-sketched canvases (matching design)",
      "Complete acrylic paint set (12 colors)",
      "Premium brushes for two",
      "Guided painting instructions",
      "Spotify playlist QR code",
      "Conversation starter cards",
      "Canvas easels",
    ],
    reviews: { rating: 4.9, count: 328 },
    inStock: true,
    featured: true,
  },
  {
    id: "paint-date-abstract",
    name: "Abstract Expression Kit",
    tagline: "no rules, just color",
    description: "Throw out the rulebook and splash your feelings on canvas. This kit celebrates the messy, beautiful chaos of creating together without any pressure to be perfect.",
    price: 58,
    images: ["/products/abstract-1.jpg"],
    category: "paint",
    vibes: ["Playful", "Spontaneous", "Main Character Energy"],
    perfectFor: ["Adventurous couples", "Stress relief sessions", "Just because nights"],
    whatsInside: [
      "2 blank canvases",
      "Vibrant acrylic set (18 colors)",
      "Palette knives & brushes",
      "Splatter-friendly drop cloth",
      "Abstract art inspiration cards",
    ],
    reviews: { rating: 4.8, count: 156 },
    inStock: true,
  },
  {
    id: "clay-date-sculpt",
    name: "Sculpt Together Kit",
    tagline: "get your hands dirty together",
    description: "There's something incredibly intimate about working with clay together. Shape, mold, and create matching pieces that become lasting reminders of your date night.",
    price: 72,
    images: ["/products/clay-1.jpg"],
    category: "clay",
    vibes: ["Tactile", "Intimate", "Introvert Couple Favorite"],
    perfectFor: ["Hands-on couples", "Mindful date nights", "Creating keepsakes"],
    whatsInside: [
      "Air-dry clay blocks (2 colors)",
      "Sculpting tools set",
      "Rolling pins & texture stamps",
      "Guided project cards",
      "Protective work mats",
      "Paint for finishing touches",
    ],
    reviews: { rating: 4.9, count: 245 },
    inStock: true,
    featured: true,
  },
  {
    id: "clay-date-pottery",
    name: "Mini Pottery Date",
    tagline: "ghost not included",
    description: "Channel your inner pottery enthusiast (Ghost movie optional). Create matching mugs, bowls, or whatever your hands dream up together.",
    price: 78,
    images: ["/products/pottery-1.jpg"],
    category: "clay",
    vibes: ["Cozy", "Romantic", "Rainy Evening Approved"],
    perfectFor: ["Movie lovers", "Couples who love cafes", "Gift-making together"],
    whatsInside: [
      "Premium pottery clay",
      "Mini pottery wheel (battery-powered)",
      "Glazing paints",
      "Carving tools",
      "Step-by-step guide",
    ],
    reviews: { rating: 4.7, count: 189 },
    inStock: true,
  },
  {
    id: "movie-night-cozy",
    name: "Ultimate Cozy Movie Night",
    tagline: "made for cozy evenings in",
    description: "Transform your living room into the coziest cinema ever. Snuggle up, dim the lights, and enjoy a movie night that beats any theater experience.",
    price: 48,
    images: ["/products/movie-1.jpg"],
    category: "movie",
    vibes: ["Cozy", "Relaxed", "Perfect for Introverts"],
    perfectFor: ["Sunday nights", "Rainy day dates", "Netflix & actually chill"],
    whatsInside: [
      "Gourmet popcorn set (3 flavors)",
      "Hot cocoa mix for two",
      "Cozy blanket (matching pattern)",
      "LED tea light candles",
      "Movie recommendation cards",
      "Snack bowls",
    ],
    reviews: { rating: 4.8, count: 412 },
    inStock: true,
    featured: true,
  },
  {
    id: "movie-night-retro",
    name: "Retro Cinema Experience",
    tagline: "like the old days, but better",
    description: "Bring back the golden age of cinema with a retro-themed movie night. Think classic snacks, vintage vibes, and a curated list of timeless films.",
    price: 55,
    images: ["/products/retro-1.jpg"],
    category: "movie",
    vibes: ["Nostalgic", "Vintage", "Classic Romance"],
    perfectFor: ["Film buffs", "Nostalgia lovers", "Old soul couples"],
    whatsInside: [
      "Classic candy selection",
      "Retro popcorn boxes",
      "Mini projector rental voucher",
      "Classic film watchlist",
      "Vintage-style tickets",
    ],
    reviews: { rating: 4.6, count: 98 },
    inStock: true,
  },
  {
    id: "scrapbook-memories",
    name: "Memory Lane Scrapbook",
    tagline: "document your love story",
    description: "Create a beautiful keepsake of your relationship. This kit has everything you need to turn your photos and memories into a masterpiece you'll treasure forever.",
    price: 58,
    images: ["/products/scrapbook-1.jpg"],
    category: "scrapbook",
    vibes: ["Nostalgic", "Creative", "Sentimental"],
    perfectFor: ["Anniversaries", "Memory collectors", "Long-term couples"],
    whatsInside: [
      "Premium scrapbook album",
      "Decorative paper pack (50+ sheets)",
      "Washi tape collection",
      "Photo corners & frames",
      "Sticker sheets",
      "Journaling prompts",
      "Metallic pens set",
    ],
    reviews: { rating: 4.9, count: 287 },
    inStock: true,
    featured: true,
  },
  {
    id: "scrapbook-travel",
    name: "Travel Memories Kit",
    tagline: "wanderlust in a box",
    description: "Perfect for documenting your adventures together. Maps, stamps, and all the supplies you need to create a travel journal that captures your journey.",
    price: 62,
    images: ["/products/travel-1.jpg"],
    category: "scrapbook",
    vibes: ["Adventurous", "Wanderlust", "Couple Goals"],
    perfectFor: ["Travel couples", "Post-trip memories", "Planning future adventures"],
    whatsInside: [
      "Travel-themed scrapbook",
      "World map poster",
      "Vintage-style stamps",
      "Boarding pass holders",
      "Location stickers",
      "Memory prompt cards",
    ],
    reviews: { rating: 4.8, count: 134 },
    inStock: true,
  },
  {
    id: "surprise-box-romantic",
    name: "Mystery Romance Box",
    tagline: "better than another boring dinner date",
    description: "Take the guesswork out of date night. Each mystery box is curated based on our most-loved items - you'll never know exactly what you're getting, but you'll always love it.",
    price: 55,
    images: ["/products/mystery-1.jpg"],
    category: "surprise",
    vibes: ["Adventurous", "Spontaneous", "Trust Fall"],
    perfectFor: ["Indecisive couples", "Surprise lovers", "Trying new things"],
    whatsInside: [
      "Surprise activity kit",
      "Matching couple items",
      "Snack selection",
      "Mood-setting accessories",
      "Mystery bonus gift",
    ],
    reviews: { rating: 4.7, count: 203 },
    inStock: true,
  },
  {
    id: "surprise-box-seasonal",
    name: "Seasonal Surprise Box",
    tagline: "curated for right now",
    description: "A specially curated box that changes with the seasons. Spring picnics, summer adventures, fall coziness, winter warmth - always perfectly timed.",
    price: 65,
    originalPrice: 85,
    images: ["/products/seasonal-1.jpg"],
    category: "surprise",
    vibes: ["Seasonal", "Limited Edition", "Curated"],
    perfectFor: ["Seasonal celebrations", "Quarterly date nights", "Collectors"],
    whatsInside: [
      "Seasonal activity kit",
      "Limited edition items",
      "Seasonal treats",
      "Themed decorations",
      "Exclusive couple gifts",
    ],
    reviews: { rating: 4.9, count: 156 },
    inStock: true,
    featured: true,
  },
]

export const categories = [
  {
    id: "all",
    name: "All Kits",
    emoji: "✨",
    description: "Browse everything",
  },
  {
    id: "paint",
    name: "Paint Date Kits",
    emoji: "🎨",
    description: "Get creative together",
  },
  {
    id: "clay",
    name: "Clay Date Kits",
    emoji: "🏺",
    description: "Hands-on experiences",
  },
  {
    id: "movie",
    name: "Cozy Movie Nights",
    emoji: "🎬",
    description: "Netflix & actually chill",
  },
  {
    id: "scrapbook",
    name: "Scrapbook Kits",
    emoji: "📔",
    description: "Preserve your memories",
  },
  {
    id: "surprise",
    name: "Surprise Boxes",
    emoji: "🎁",
    description: "Let us surprise you",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
