import { getGuidesList } from "@lib/data/guides"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import { Guide } from "types/global"
import GuideInfo from "./guide-info"
import GuideSupplements from "./guide-supplements"

type GuideTemplateProps = {
  guide: Guide
  countryCode: string
}

export default async function GuideTemplate({
  guide,
  countryCode,
}: GuideTemplateProps) {
  if (!guide || !guide.id) {
    return notFound()
  }

  const guides = await getGuidesList()

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="guide-container"
    >
      <div className="flex gap-x-3 flex-col gap-y-3">
        <Text className="txt-compact-small-plus text-ui-fg-muted">Guides</Text>
        <ul>
          {guides.map((g) => (
            <li key={g.id}>
              <LocalizedClientLink href={`/guides/${g.handle}`}>
                {g.name}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        <GuideInfo guide={guide} />
        <GuideSupplements guide={guide} countryCode={countryCode} />
      </div>
    </div>
  )
}
