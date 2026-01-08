import { StoreProductCategory } from "@medusajs/types"
import { cache } from "react"
import { getCategoryByHandle } from "./categories"

const GUIDES_HANDLE = "guides"

export const getGuidesList = cache(async function (): Promise<StoreProductCategory[]> {
  const { product_categories } = await getCategoryByHandle([GUIDES_HANDLE])
  const guides = product_categories[0].category_children || []
  return guides.sort((a, b) => (a.name > b.name ? 1 : -1))
})
