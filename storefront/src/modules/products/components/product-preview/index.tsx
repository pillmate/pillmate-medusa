import { Text } from "@medusajs/ui"

import { getProductsById } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

type Product = HttpTypes.StoreProduct & {
  metadata?: ProductMetadata
}

type ProductMetadata = {
  purchase_options?: PurchaseOption[]
  grade?: string
  score?: number
}

type PurchaseOption = {
  url: string
  name: string
}

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: Product
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <div data-testid="product-wrapper">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="group"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {product.title}
          </Text>
          {product.metadata?.grade && (
            <Text className="text-ui-fg-subtle" data-testid="product-grade">
              {product.metadata.grade}
            </Text>
          )}
          {product.metadata?.score && (
            <Text className="text-ui-fg-subtle" data-testid="product-score">
              {product.metadata.score}
            </Text>
          )}
        </div>
      </LocalizedClientLink>
      <div className="flex flex-col txt-compact-medium mt-4">
        {product.metadata?.purchase_options && (
          <ul>
            {product.metadata.purchase_options.map(
              (o: PurchaseOption, i: number) => (
                <li key={i}>
                  <a
                    href={o.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ui-fg-link underline"
                  >
                    {o.name}
                  </a>
                </li>
              )
            )}
          </ul>
        )}
        {cheapestPrice && (
          <div className="flex items-center gap-x-2">
            <PreviewPrice price={cheapestPrice} />
          </div>
        )}
      </div>
    </div>
  )
}
