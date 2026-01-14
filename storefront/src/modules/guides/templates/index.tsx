import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import Guides from "./guides"

const GuidesTemplate = () => {
  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All guides</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <Guides />
        </Suspense>
      </div>
    </div>
  )
}

export default GuidesTemplate
