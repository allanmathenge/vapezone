import { Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <section className="h-screen max-h-[90vh] w-full relative bg-white overflow-hidden">
      <div className="absolute hidden md:block inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dfndhiz82/image/upload/v1764331014/image_r0yrmp.webp"
          priority={true}
          className="object-cover md:object-[position_70%_center]"
          quality={85}
          alt="Wine, Spirits & Premium vaping products in Kenya"
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
      <div className="absolute md:hidden block inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dfndhiz82/image/upload/v1764355924/bg_glamz9.webp"
          priority={true}
          className="object-cover"
          quality={85}
          alt="Wine, Spirits & Premium vaping products in Kenya"
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-end text-right px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-32">
        <div className="max-w-2xl space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          <Heading
            level="h1"
            className="text-4xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white md:text-slate-900 leading-tight tracking-tight drop-shadow-lg"
          >
            <div className="mb-1 sm:mb-2">
              Kenya&apos;s Premier
            </div>
            <div className="text-white md:text-slate-900">
              Wines & Spirits Destination
            </div>
          </Heading>

          <div className="hidden md:block max-w-lg">
            <p className="text-slate-900 text-lg lg:text-xl font-light drop-shadow-md">
              Discover premium selection of wines, spirits, and exclusive vaping products
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero