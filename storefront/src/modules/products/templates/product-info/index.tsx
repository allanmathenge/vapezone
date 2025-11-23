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
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto bg-white text-small-regular rounded-xl p-6 shadow-sm border border-ui-border-base">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium transition-colors duration-200 hover:underline"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h1"
          className="first-letter:text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <div className="p-2 prose prose-slate text-small-regular text-ui-fg-subtle txt-compact-medium prose-gray max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-slate-800 font-semibold text-xl" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-slate-800 font-medium text-lg" />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="text-slate-800 " />
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="list-disc pl-1 sm:pl-4 text-slate-800" />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="py-1" />
                ),
                strong: ({ node, ...props }) => (
                  <strong {...props} className="font-semibold text-slate-900" />
                ),
              }}
            >
              {product.description || "-"}
            </ReactMarkdown>
          </div>
      </div>
    </div>
  )
}

export default ProductInfo


// import { HttpTypes } from "@medusajs/types"
// import { Heading, Text } from "@medusajs/ui"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import { useMemo } from "react"

// type ProductInfoProps = {
//   product: HttpTypes.StoreProduct
//   selectedVariant?: HttpTypes.StoreProductVariant
// }

// const ProductInfo = ({ product, selectedVariant }: ProductInfoProps) => {
//   const inStock = useMemo(() => {
//     if (selectedVariant) {
//       if (!selectedVariant.manage_inventory) return true
//       if (selectedVariant.allow_backorder) return true
//       return (selectedVariant.inventory_quantity || 0) > 0
//     }

//     return product.variants?.some(variant =>
//       !variant.manage_inventory ||
//       variant.allow_backorder ||
//       (variant.inventory_quantity || 0) > 0
//     )
//   }, [selectedVariant, product.variants])

//   const InfoSection = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
//     <div className={`flex flex-col space-y-2 ${className}`}>
//       <Text className="text-ui-fg-muted font-medium uppercase tracking-wider mb-1">
//         {title}
//       </Text>
//       {children}
//     </div>
//   )

//   return (
//     <div className="bg-white text-small-regular rounded-xl p-6 shadow-sm border border-ui-border-base">
//       <div className="small:space-y-6 space-y-3 text-slate-600">
//         {product.collection && (
//           <InfoSection title="Collection">
//             <LocalizedClientLink
//               href={`/collections/${product.collection.handle}`}
//               className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium transition-colors duration-200 hover:underline"
//             >
//               {product.collection.title}
//             </LocalizedClientLink>
//           </InfoSection>
//         )}

//         <InfoSection title="Product">
//           <Heading
//             level="h1"
//             className="font-normal leading-tight"
//             data-testid="product-title"
//           >
//             {product.title}
//           </Heading>
//         </InfoSection>
//       </div>
//     </div>
//   )
// }

// export default ProductInfo


//   const InfoSection = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
//     <div className={`flex flex-col space-y-2 ${className}`}>
//       <Text className="text-ui-fg-muted font-medium uppercase tracking-wider mb-1">
//         {title}
//       </Text>
//       {children}
//     </div>
//   )

//   return (
//     <div className="bg-white text-small-regular rounded-xl p-6 shadow-sm border border-ui-border-base">
//       <div className="small:space-y-6 space-y-3 text-slate-600">
//         {product.collection && (
//           <InfoSection title="Collection">
//             <LocalizedClientLink
//               href={`/collections/${product.collection.handle}`}
//               className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium transition-colors duration-200 hover:underline"
//             >
//               {product.collection.title}
//             </LocalizedClientLink>
//           </InfoSection>
//         )}

//         <InfoSection title="Product">
//           <Heading
//             level="h1"
//             className="font-normal leading-tight"
//             data-testid="product-title"
//           >
//             {product.title}
//           </Heading>
//         </InfoSection>

