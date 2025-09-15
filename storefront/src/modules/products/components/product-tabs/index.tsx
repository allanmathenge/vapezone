"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import ReactMarkdown from "react-markdown"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-elegant">
      <Accordion type="single" collapsible className="w-full">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={`item-${i}`}
            className="border-b border-gray-100 last:border-b-0"
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="flex flex-col py-6 bg-white">
      <div className="lg:max-w-[600px] mx-auto">
        <div
          className="rounded-2xl text-small-regular whitespace-pre-line"
          data-testid="product-description"
        >
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-blue-800 font-semibold text-xl" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-blue-700 font-medium text-lg" />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="text-slate-600 " />
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="list-disc pl-5 text-slate-600" />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="" />
                ),
                strong: ({ node, ...props }) => (
                  <strong {...props} className="font-semibold text-slate-700" />
                ),
              }}
            >
              {product.description || "No description available."}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col gap-y-5 text-small-regular">
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 mb-1.5 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Material
            </span>
            <p className="text-slate-600 pl-3.5">{product.material ? product.material : "-"}</p>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 mb-1.5 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Country Of Origin
            </span>
            <p className="text-slate-600 pl-3.5 uppercase">{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 mb-1.5 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Type
            </span>
            <p className="text-slate-600 pl-3.5">{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-6 px-6 bg-white">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-4 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors duration-200">
          <div className="p-2.5 bg-blue-100 rounded-lg flex-shrink-0">
            <FastDelivery className="text-blue-600 w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 block mb-2">Fast delivery</span>
            <p className="text-slate-600 max-w-sm leading-relaxed">
              Your package will arrive in 30-50 minutes at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4 p-4 rounded-xl bg-green-50/50 hover:bg-green-50 transition-colors duration-200">
          <div className="p-2.5 bg-green-100 rounded-lg flex-shrink-0">
            <Refresh className="text-green-600 w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 block mb-2">Simple exchanges</span>
            <p className="text-slate-600 max-w-sm leading-relaxed">
              Is the product not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4 p-4 rounded-xl bg-amber-50/50 hover:bg-amber-50 transition-colors duration-200">
          <div className="p-2.5 bg-amber-100 rounded-lg flex-shrink-0">
            <Back className="text-amber-600 w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 block mb-2">Easy returns</span>
            <p className="text-slate-600 max-w-sm leading-relaxed">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs

{/* <div className="flex flex-col gap-y-5">
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 mb-1.5 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Weight
            </span>
            <p className="text-slate-600 pl-3.5">{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 mb-1.5 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Dimensions
            </span>
            <p className="text-slate-600 pl-3.5">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div> */}