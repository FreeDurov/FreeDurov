export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  colors: string[]
  sizes: string[]
  featured?: boolean
  new?: boolean
}
