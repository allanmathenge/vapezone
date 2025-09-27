import { Heading, Text, Button } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import { FiShoppingBag, FiArrowRight, FiTag } from "react-icons/fi"

const EmptyCartMessage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16" data-testid="empty-cart-message">
      <div className="max-w-md mx-auto text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
            <FiShoppingBag className="w-10 h-10 text-slate-400" />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <FiTag className="w-4 h-4 text-blue-600" />
          </div>
          
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-100 rounded-full animate-pulse"></div>
        </div>

        {/* Content */}
        <Heading
          level="h1"
          className="text-3xl font-bold text-slate-900 mb-4"
        >
          Your cart is empty
        </Heading>
        
        <Text className="text-lg text-slate-600 mb-8 leading-relaxed">
          Discover our premium vape collection and find your perfect match. 
          Quality products with fast delivery across Kenya.
        </Text>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild>
            <InteractiveLink href="/store">
              Start Shopping
            </InteractiveLink>
          </Button>
        </div>

        {/* Additional Features */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="flex justify-between w-full flex-wrap items-center gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">30-50min</div>
              <div className="text-xs text-slate-500 mt-1">Fast Delivery</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">7 Days</div>
              <div className="text-xs text-slate-500 mt-1">Easy Returns</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600">24/7</div>
              <div className="text-xs text-slate-500 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCartMessage