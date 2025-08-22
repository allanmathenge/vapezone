import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ReactMarkdown from "react-markdown"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}

        <Heading
          level="h1"
          className="text-2xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle shadow p-2 rounded text-small-regular whitespace-pre-line"
          data-testid="product-description"
        >
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-blue-600 font-bold text-xl mt-1" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-blue-500 font-semibold text-lg mt-1" />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="text-gray-700 leading-relaxed" />
                ),
              }}
            >
              {product.description || ""}
            </ReactMarkdown>
          </div>
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
