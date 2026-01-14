import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

type GuideInfoProps = {
  guide: HttpTypes.StoreProductCategory
}

const GuideInfo = ({ guide }: GuideInfoProps) => {
  return (
    <div id="guide-info">
      <Heading
        level="h2"
        className="text-3xl leading-10 text-ui-fg-base"
        data-testid="guide-title"
      >
        {guide.name}
      </Heading>
      {guide.description && (
        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="guide-description"
        >
          {guide.description}
        </Text>
      )}
    </div>
  )
}

export default GuideInfo
