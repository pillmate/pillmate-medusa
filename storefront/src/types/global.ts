import { HttpTypes } from "@medusajs/types/dist/bundles"

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type VariantPrice = {
  calculated_price_number: number
  calculated_price: string
  original_price_number: number
  original_price: string
  currency_code: string
  price_type: string
  percentage_diff: string
}

export type Guide = HttpTypes.StoreProductCategory & {
  metadata: {
    supplements: Supplements
  }
}

export type Supplements = {
  [key in SupplementTier]: Supplement[]
}

export type SupplementTier =
  | "primary"
  | "secondary"
  | "promising"
  | "unproven"
  | "inadvisable"

export type Supplement = HttpTypes.StoreProductCategory & {
  purpose?: string
}
