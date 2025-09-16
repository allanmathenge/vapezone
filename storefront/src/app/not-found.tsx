import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page Not Found | 404",
  description: "The page you're looking for doesn't exist or has been moved.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 bg-gradient-to-br from-ui-bg-base to-ui-bg-subtle">
      <div className="text-center max-w-md mx-auto">
        {/* Animated decorative element */}
        <div className="mb-8 relative">
          <div className="text-8xl font-light text-ui-fg-muted opacity-20 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-24 h-24 text-ui-fg-interactive" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 12H14.5M9.5 15H14.5M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl-semi text-ui-fg-base mb-3">Page Not Found</h1>
        <p className="text-ui-fg-subtle mb-6 leading-relaxed">
          The page you tried to access doesn&apos;t exist or may have been moved. 
          Please check the URL or navigate back to our homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            className="flex items-center justify-center gap-x-2 px-5 py-2.5 bg-ui-bg-base hover:bg-ui-bg-base-hover border border-ui-border-base rounded-full transition-all duration-200 group hover:shadow-sm"
            href="/"
          >
            <Text className="text-ui-fg-base">Go to homepage</Text>
            <ArrowUpRightMini className="group-hover:rotate-45 transition-transform duration-150" />
          </Link>
          
          <Link
            className="flex items-center justify-center gap-x-2 px-5 py-2.5 text-ui-fg-interactive hover:bg-ui-bg-interactive hover:text-ui-fg-on-color rounded-full transition-colors duration-200"
            href="/customer-service"
          >
            <Text>Contact Support</Text>
          </Link>
        </div>
      </div>
      
      {/* Subtle decorative elements */}
      <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full bg-ui-bg-interactive/10 blur-xl opacity-70 -z-10"></div>
      <div className="absolute top-16 right-8 w-24 h-24 rounded-full bg-ui-bg-interactive/5 blur-xl opacity-50 -z-10"></div>
    </div>
  )
}