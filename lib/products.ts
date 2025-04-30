import type { Product } from "@/lib/types"

export const products: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 270",
    description:
      "The Nike Air Max 270 delivers a plush ride for everyday wear. The large window in the heel and the stretchy inner sleeve create a fresh look that feels as good as it looks.",
    price: 150,
    category: "lifestyle",
    image: "/images/product-1.png",
    colors: ["black", "white", "red"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    featured: true,
  },
  {
    id: "2",
    name: "Nike SB Dunk Low 'Mummy'",
    description:
      "The radiance lives on in the Nike SB Dunk Low 'Mummy', a special edition that brings a unique distressed canvas look with glow-in-the-dark details.",
    price: 110,
    category: "lifestyle",
    image: "/images/product-2.png",
    colors: ["white", "green"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    featured: true,
  },
  {
    id: "3",
    name: "Nike Zoom Winflo",
    description:
      "The Nike Zoom Winflo brings responsive cushioning and breathable comfort to your run. The engineered mesh in the upper combines with the Zoom Air unit underfoot for a smooth, responsive ride.",
    price: 115,
    category: "running",
    image: "/images/product-3.png",
    colors: ["gray", "red"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    new: true,
  },
  {
    id: "4",
    name: "Nike Air Zoom Pegasus 39",
    description:
      "Let the Nike Air Zoom Pegasus 39 help you ascend to new heights. The iconic running shoe brings back the cushioning and springy response you love but with a wider forefoot for comfort.",
    price: 130,
    category: "running",
    image: "/images/product-4.png",
    colors: ["black", "blue", "turquoise"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
  },
  {
    id: "5",
    name: "Nike Air Force 1 Low x Tiffany",
    description:
      "The Nike Air Force 1 Low x Tiffany collaboration brings the iconic jeweler's signature blue shade to the classic silhouette. Premium materials and special branding make this a collector's item.",
    price: 140,
    category: "lifestyle",
    image: "/images/product-5.png",
    colors: ["turquoise", "black"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
  },
  {
    id: "6",
    name: "Nike Air Force 1 '07",
    description:
      "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
    price: 130,
    category: "lifestyle",
    image: "/images/product-6.png",
    colors: ["white"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12", "US 13"],
    new: true,
  },
  {
    id: "7",
    name: "Nike Dunk Low 'UNC'",
    description:
      "The Nike Dunk Low returns with crisp overlays and original team colors. This basketball icon channels '80s vibes with a padded, low-cut collar that looks sleek and feels comfortable.",
    price: 100,
    category: "lifestyle",
    image: "/images/product-7.png",
    colors: ["blue", "white"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
  },
  {
    id: "8",
    name: "Nike Dunk Low 'Mean Green'",
    description:
      "Created for the hardwood but taken to the streets, the Nike Dunk Low 'Mean Green' returns with clean color blocking and classic hoops flair. This special edition pairs vibrant green suede with neutral tones for a fresh look.",
    price: 275,
    category: "lifestyle",
    image: "/images/product-8.png",
    colors: ["green", "white"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
  },
]
