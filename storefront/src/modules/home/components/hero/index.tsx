import { Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[75vh] aspect-[29/34] text-white w-full overflow-hidden border-b border-ui-border-base relative bg-ui-bg-subtle">
      {/* bg */}
      <Image
        src="https://res.cloudinary.com/dfndhiz82/image/upload/v1749511548/vape_on_ground_xxdn3g.jpg"
        priority={true}
        className="absolute inset-0"
        quality={100}
        // width={1920}
        alt={"Hero image"}
        fill
        sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <Heading className="text-4xl font-bold text-white">
          Kenya’s Number One Vape Superstore
        </Heading>
        <p className="text-ui-fg-subtle text-white text-small-regular max-w-[600px]">
          Shop premium vapes, bold e-liquids and exclusive offers at unbeatable prices — trusted by Kenya’s fastest-growing vape community.
        </p>
      </div>
    </div>
  )
}

export default Hero
