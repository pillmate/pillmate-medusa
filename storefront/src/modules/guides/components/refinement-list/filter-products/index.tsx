import { getCategoryByHandle } from "@lib/data/categories"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type FilterOptions = string

type FilterProductsProps = {
  "data-testid"?: string
}

const GUIDES_HANDLE = "guides"

const FilterProducts = async ({
  "data-testid": dataTestId,
}: FilterProductsProps) => {
  const { product_categories } = await getCategoryByHandle([GUIDES_HANDLE])
  const guides = product_categories[0].category_children || []

  return (
    <FilterRadioGroup
      title="Guides"
      queryParam="guide"
      items={
        guides.map((g) => ({
          value: g.handle,
          label: g.name,
        })) || []
      }
      data-testid={dataTestId}
    />
  )
}

export default FilterProducts
