import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"

export default function GuideSection({
  supplements,
  region,
}: {
  supplements: HttpTypes.StoreProductCategory[]
  region: HttpTypes.StoreRegion
}) {
  return (
    <div>
      {supplements.map((s) => (
        <div key={s.id}>
          <Heading
            level="h3"
            className="text-1xl leading-8 text-ui-fg-base mt-4"
          >
            {s.name}
          </Heading>
          <Text className="text-medium text-ui-fg-subtle whitespace-pre-line">
            {s.description}
          </Text>
          {s.products && s.products.length > 0 && (
            <ul
              className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 mt-4"
              data-testid="products-list"
            >
              {s.products.map((p) => {
                return (
                  <li key={p.id}>
                    <ProductPreview product={p} region={region} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
