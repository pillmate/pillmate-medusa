import { Metadata } from "next"

import GuidesTemplate from "@modules/guides/templates"

export const metadata: Metadata = {
  title: "Guides",
  description: "Explore all of our guides.",
}

export default async function GuidesPage() {
  return <GuidesTemplate />
}
