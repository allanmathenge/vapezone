import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ReactMarkdown from "react-markdown"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {

  console.log(product.categories, "--->> Product category")
  return (
    <div id="product-info">
      <div className="flex flex-col space-y-6 lg:max-w-[500px] mx-auto">

        <div className="flex flex-col border p-2">
          <div className="flex gap-2 items-center text-sm text-ui-fg-muted">
            <span className="font-semibold">Collection:</span>
            {product.collection && (
              <LocalizedClientLink
                href={`/collections/${product.collection.handle}`}
                className="hover:text-blue-700"
              >
                {product.collection.title}
              </LocalizedClientLink>
            )}
          </div>

          <div className="flex gap-2 items-center text-ui-fg-muted">
            <span className="font-semibold">Name:</span>
            <Heading
              level="h1"
              className="text-sm hover:"
              data-testid="product-title"
            >
              {product.title}
            </Heading>
          </div>
        </div>

        <div
          className="text-medium text-ui-fg-subtle shadow flex flex-col gap-3 rounded text-small-regular p-2 whitespace-pre-line"
          data-testid="product-description"
        >
          <span className="text-base-regular font-semibold text-ui-fg-muted text-xl">Detailed Description</span>
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
                ul: ({ node, ...props }) => (
                  <ul {...props} className="list-disc pl-3 text-gray-700" />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="leading-relaxed" />
                ),
              }}
            >
              {product.description || ""}
            </ReactMarkdown>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductInfo
