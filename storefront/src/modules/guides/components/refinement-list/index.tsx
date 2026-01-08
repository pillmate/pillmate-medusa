import SortProducts from "./sort-products"

type RefinementListProps = {
  children?: React.ReactNode
  "data-testid"?: string
}

const RefinementList = ({
  children,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <SortProducts data-testid={dataTestId} />
      {children}
    </div>
  )
}

export default RefinementList
