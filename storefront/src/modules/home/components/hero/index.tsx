import { Heading } from "@medusajs/ui"
import Image from "next/image"
import InteractiveLink from "@modules/common/components/interactive-link"

const Hero = () => {
  return (
    <div className="h-screen max-h-[90vh] w-full relative bg-ui-bg-subtle overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dfndhiz82/image/upload/v1749511548/vape_on_ground_xxdn3g.jpg"
          priority={true}
          className="object-cover"
          quality={100}
          alt="Premium vape products showcase"
          fill
          sizes="100vw"
          style={{
            objectPosition: "center 30%",
          }}
        />

      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-2 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-2xl space-y-8">

          {/* Main Heading */}
          <Heading className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
            Kenya’s Number One {" "}
            <span className="flex sm:block font-semibold bg-gradient-to-l from-blue-400 via-purple-200 to-cyan-300 bg-clip-text text-transparent mt-2">
              Vape Superstore
            </span>
          </Heading>

          {/* Description */}
          <p className="text-lg md:text-xl text-blue-100/90 max-w-xl leading-relaxed font-light">
            Shop premium vapes, bold e-liquids and exclusive offers at unbeatable prices
            trusted by Kenya’s fastest-growing vape community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {/* <div className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 rounded-lg font-medium text-base hover:bg-white/20 transition-all duration-300">
              <InteractiveLink href={`/store`}>Shop Collection</InteractiveLink>
            </div> */}
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 rounded-lg font-medium text-base hover:bg-white/20 transition-all duration-300">
              <InteractiveLink href={`/store`}>Explore Products</InteractiveLink>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 pt-12 text-sm text-blue-100/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Authentic Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Hero