import { Heading } from "@medusajs/ui"
import Image from "next/image"
import InteractiveLink from "@modules/common/components/interactive-link"

const Hero = () => {
  return (
    <section className="h-screen max-h-[90vh] w-full relative bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dfndhiz82/image/upload/f_auto,q_auto,w_1920/v1749511548/vape_on_ground_xxdn3g.jpg"
          priority={true}
          className="object-cover"
          quality={90}
          alt="Premium vape products in Kenya - Best disposable vapes and e-liquids"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{
            objectPosition: "center 30%",
          }}
        />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-2xl space-y-12 md:space-y-10">
          <Heading 
            level="h1"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-200 leading-tight tracking-tight"
          >
            <div className="mb-2">
              Kenya&apos;s Premier
            </div>
            <div className="premium-typewriter">
              Vape Destination
            </div>
          </Heading>

          <p className="text-base sm:text-lg md:text-xl text-white max-w-xl leading-relaxed font-light">
            Discover premium vapes, authentic e-liquids and exclusive offers
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-8 md:pt-12 text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-gray-100 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200">
              <div className="w-2 h-2 animate-pulse bg-green-500 rounded-full"></div>
              <span className="text-gray-900">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200">
              <div className="w-2 h-2 animate-pulse bg-green-500 rounded-full"></div>
              <span className="text-gray-900">100% Authentic</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200">
              <div className="w-2 h-2 animate-pulse bg-green-500 rounded-full"></div>
              <span className="text-gray-900">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero