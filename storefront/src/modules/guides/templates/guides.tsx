import { getGuidesList } from "@lib/data/guides"
import GuidePreview from "@modules/guides/components/guide-preview"

export default async function Guides() {
  const guides = await getGuidesList()

  return (
    <ul
      className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
      data-testid="products-list"
    >
      {guides.map((g) => (
        <li key={g.id}>
          <GuidePreview guide={g} />
        </li>
      ))}
    </ul>
  )
}
