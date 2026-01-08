import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle } from "@lib/data/categories"
import GuideTemplate from "@modules/guides/templates/guide"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_categories } = await getCategoryByHandle([params.handle])
  const guide = product_categories[0]

  if (!guide) {
    notFound()
  }

  return {
    title: `${guide.name} | Medusa Store`,
    description: `${guide.description}`,
    openGraph: {
      title: `${guide.name} | Medusa Store`,
      description: `${guide.description}`,
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const { product_categories } = await getCategoryByHandle([params.handle])
  const guide = product_categories[0]

  if (!guide) {
    notFound()
  }

  return <GuideTemplate guide={guide} countryCode={params.countryCode} />
}
