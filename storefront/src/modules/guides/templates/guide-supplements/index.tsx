import { getCategoryById } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import { Heading } from "@medusajs/ui"
import GuideSection from "@modules/guides/components/guide-section"
import { Guide, SupplementTier } from "types/global"

async function getGuideSupplements(guide: Guide) {
  const [primary, secondary, promising, unproven, inadvisable] =
    await Promise.all([
      getSupplementsByTier(guide, "primary"),
      getSupplementsByTier(guide, "secondary"),
      getSupplementsByTier(guide, "promising"),
      getSupplementsByTier(guide, "unproven"),
      getSupplementsByTier(guide, "inadvisable"),
    ])
  return { primary, secondary, promising, unproven, inadvisable }
}

async function getSupplementsByTier(guide: Guide, tier: SupplementTier) {
  const ids = guide.metadata.supplements[tier].map((s) => s.id)
  if (ids.length === 0) {
    return []
  }
  return getCategoryById(ids).then(
    ({ product_categories }) => product_categories
  )
}

export default async function GuideSupplements({
  guide,
  countryCode,
}: {
  guide: Guide
  countryCode: string
}) {
  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  const { primary, secondary, promising, unproven, inadvisable } =
    await getGuideSupplements(guide)

  return (
    <div id="guide-supplements">
      <Heading level="h3" className="text-2xl leading-8 text-ui-fg-base mt-8">
        Primary
      </Heading>
      <GuideSection supplements={primary} region={region} />

      <Heading level="h3" className="text-2xl leading-8 text-ui-fg-base mt-8">
        Secondary
      </Heading>
      <GuideSection supplements={secondary} region={region} />

      <Heading level="h3" className="text-2xl leading-8 text-ui-fg-base mt-8">
        Promising
      </Heading>
      <GuideSection supplements={promising} region={region} />

      <Heading level="h3" className="text-2xl leading-8 text-ui-fg-base mt-8">
        Unproven
      </Heading>
      <GuideSection supplements={unproven} region={region} />

      <Heading level="h3" className="text-2xl leading-8 text-ui-fg-base mt-8">
        Inadvisable
      </Heading>
      <GuideSection supplements={inadvisable} region={region} />
    </div>
  )
}
