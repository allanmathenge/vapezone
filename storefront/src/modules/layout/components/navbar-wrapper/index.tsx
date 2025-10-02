"use client"

import { useState, useEffect } from "react"

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      // Show navbar when at top of page
      if (currentScrollY < 100) {
        setIsVisible(true)
        setLastScrollY(currentScrollY)
        return
      }

      // Determine scroll direction
      const scrollingDown = currentScrollY > lastScrollY

      if (scrollingDown && isVisible) {
        // Scrolling down and navbar is visible - hide it
        setIsVisible(false)
      } else if (!scrollingDown && !isVisible) {
        // Scrolling up and navbar is hidden - show it
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    // Throttle scroll events
    let ticking = false
    const throttledControlNavbar = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          controlNavbar()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledControlNavbar, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledControlNavbar)
    }
  }, [lastScrollY, isVisible])

  return (
    <div 
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {children}
    </div>
  )
}