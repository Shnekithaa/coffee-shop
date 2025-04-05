"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CakeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ovenRef = useRef<HTMLDivElement>(null)
  const cakeRef = useRef<HTMLDivElement>(null)
  const doorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create the animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })

    // Initial setup
    gsap.set(cakeRef.current, {
      scale: 0.7,
      opacity: 0.6,
    })

    // Baking animation
    tl.to(cakeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 4,
      ease: "power1.inOut",
    })

    // Open oven door
    tl.to(doorRef.current, {
      rotateY: -110,
      duration: 1,
      ease: "power2.out",
    })

    // Move cake out
    tl.to(cakeRef.current, {
      y: -80,
      duration: 1.5,
      ease: "power1.inOut",
    })

    // Close oven door
    tl.to(
      doorRef.current,
      {
        rotateY: 0,
        duration: 1,
        ease: "power2.in",
      },
      "+=1",
    )

    // Reset cake position
    tl.set(cakeRef.current, {
      y: 0,
      scale: 0.7,
      opacity: 0.6,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] bg-amber-50 overflow-hidden flex items-center justify-center"
    >
      {/* Oven */}
      <div ref={ovenRef} className="relative w-64 h-64 bg-gray-300 rounded-lg">
        {/* Oven interior */}
        <div className="absolute inset-4 bg-gray-800 rounded overflow-hidden">
          {/* Heating elements */}
          <div className="absolute top-4 left-0 w-full h-1 bg-red-500"></div>
          <div className="absolute bottom-4 left-0 w-full h-1 bg-red-500"></div>

          {/* Cake */}
          <div ref={cakeRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-24">
            {/* Cake base */}
            <div className="absolute bottom-0 left-0 w-full h-3/4 bg-amber-200 rounded-lg"></div>

            {/* Frosting */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5/6 h-1/2 bg-pink-300 rounded-t-full"></div>

            {/* Decorations */}
            <div className="absolute top-2 left-1/4 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-1 left-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-2 left-3/4 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Oven door */}
        <div
          ref={doorRef}
          className="absolute inset-4 bg-gray-700 rounded border-2 border-gray-600 origin-left"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Door window */}
          <div className="absolute inset-4 bg-black/50 rounded"></div>

          {/* Door handle */}
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-2 h-8 bg-gray-400 rounded"></div>
        </div>

        {/* Oven controls */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gray-400 rounded-t-lg flex justify-center items-center space-x-4">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          <div className="w-8 h-3 bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-amber-800"></div>
    </div>
  )
}

