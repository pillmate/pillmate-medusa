import { Heart } from "@medusajs/icons"
import { Text } from "@medusajs/ui"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function GuidePreview({
  guide,
}: {
  guide: HttpTypes.StoreProductCategory
}) {
  return (
    <LocalizedClientLink href={`/guides/${guide.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Heart className="text-ui-fg-subtle" />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {guide.name}
          </Text>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
