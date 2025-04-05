"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CoffeeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cupRef = useRef<HTMLDivElement>(null)
  const coffeeRef = useRef<HTMLDivElement>(null)
  const steamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create the animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })

    // Steam animation
    gsap.set(steamRef.current, { opacity: 0 })

    // Pour coffee animation
    tl.to(coffeeRef.current, {
      height: "70%",
      duration: 3,
      ease: "power1.inOut",
    })

    // Steam appears
    tl.to(
      steamRef.current,
      {
        opacity: 1,
        duration: 1,
        ease: "power1.in",
      },
      "-=1",
    )

    // Steam animation
    const steamElements = steamRef.current?.children
    if (steamElements) {
      for (let i = 0; i < steamElements.length; i++) {
        gsap.to(steamElements[i], {
          y: -20,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power1.out",
          delay: i * 0.2,
        })
      }
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] bg-amber-50 overflow-hidden flex items-center justify-center"
    >
      {/* Coffee machine */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-gray-800 rounded-b-lg">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-24 bg-gray-700 rounded-b-lg"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-32 bg-gray-600"></div>
      </div>

      {/* Cup */}
      <div ref={cupRef} className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-40">
        <div className="relative w-full h-full">
          {/* Cup handle */}
          <div className="absolute top-1/4 right-0 w-8 h-16 border-4 border-white bg-transparent rounded-r-full"></div>

          {/* Cup body */}
          <div className="absolute bottom-0 left-0 w-full h-3/4 bg-white rounded-b-3xl rounded-t-lg overflow-hidden">
            {/* Coffee liquid */}
            <div
              ref={coffeeRef}
              className="absolute bottom-0 left-0 w-full h-0 bg-amber-800"
              style={{ boxShadow: "0px -5px 10px rgba(120, 53, 15, 0.3)" }}
            ></div>
          </div>

          {/* Steam */}
          <div ref={steamRef} className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-full h-16">
            <div className="absolute left-1/4 bottom-0 w-2 h-10 bg-white/20 rounded-full"></div>
            <div className="absolute left-2/4 bottom-0 w-2 h-14 bg-white/20 rounded-full"></div>
            <div className="absolute left-3/4 bottom-0 w-2 h-8 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-amber-900"></div>
    </div>
  )
}

