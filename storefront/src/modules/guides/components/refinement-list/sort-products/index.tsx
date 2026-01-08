"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
  },
]

const SortProducts = ({ "data-testid": dataTestId }: SortProductsProps) => {
  return (
    <FilterRadioGroup
      title="Sort by"
      queryParam="sortBy"
      items={sortOptions}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
