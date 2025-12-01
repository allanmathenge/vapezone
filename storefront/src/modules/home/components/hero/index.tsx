import { Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <section className="h-screen max-h-[40vh] w-full relative bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dfndhiz82/image/upload/v1764561885/vapezone_kenya_f5dvft.webp"
          priority={true}
          className="object-cover md:object-[position_70%_center]"
          quality={85}
          alt="Wine, Spirits & Premium vaping products in Kenya"
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-2 sm:px-3 md:px-4 lg:px-6 xl:px-12 2xl:px-16">
        <div className="max-w-2xl">
          <Heading
            level="h1"
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 leading-tight tracking-tight drop-shadow-md"
          >
            <div className="mb-1 sm:mb-2">
              Kenya&apos;s Premier
            </div>
            <div className="text-slate-900">
              Wines & Spirits Destination
            </div>
          </Heading>

          {/* Description */}
          <div className="flex max-w-lg">
            <p className="text-slate-900 text-sm lg:text-xl font-light drop-shadow-md">
              Discover premium selection of wines, spirits, and exclusive vaping products
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero