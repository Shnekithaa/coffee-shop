"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, Cake, IceCream } from "lucide-react"
import CoffeeCustomizer from "./coffee-customizer"
import CakeCustomizer from "./cake-customizer"
import DessertShowcase from "./dessert-showcase"
import Logo3D from "./logo-3d"

export default function CoffeeShop() {
  const [activeSection, setActiveSection] = useState("coffee")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <Coffee size={64} className="text-amber-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-gray-800 p-6 shadow-lg border-b border-amber-500/20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16">
              <Logo3D />
            </div>
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-amber-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              Café Virtuel
            </motion.h1>
          </div>
          <motion.nav
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <ul className="flex space-x-6">
              <li>
                <motion.button
                  onClick={() => setActiveSection("coffee")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${activeSection === "coffee" ? "bg-amber-500 text-gray-900" : "text-amber-500 hover:bg-gray-700"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Coffee size={18} />
                  <span>Coffee</span>
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => setActiveSection("cake")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${activeSection === "cake" ? "bg-amber-500 text-gray-900" : "text-amber-500 hover:bg-gray-700"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Cake size={18} />
                  <span>Cakes</span>
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => setActiveSection("desserts")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${activeSection === "desserts" ? "bg-amber-500 text-gray-900" : "text-amber-500 hover:bg-gray-700"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IceCream size={18} />
                  <span>Desserts</span>
                </motion.button>
              </li>
            </ul>
          </motion.nav>
          <motion.div className="md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            <motion.button
              className="p-2 rounded-md bg-gray-700 text-amber-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-12 px-4">
        <AnimatePresence mode="wait">
          {activeSection === "coffee" && (
            <motion.div
              key="coffee"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[70vh]"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-amber-500 mb-8">Customize Your Coffee</h2>
              <CoffeeCustomizer />
            </motion.div>
          )}

          {activeSection === "cake" && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[70vh]"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-amber-500 mb-8">Design Your Cake</h2>
              <CakeCustomizer />
            </motion.div>
          )}

          {activeSection === "desserts" && (
            <motion.div
              key="desserts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[70vh]"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-amber-500 mb-8">Delicious Desserts</h2>
              <DessertShowcase />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6 mt-12 border-t border-amber-500/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2 text-amber-500">Café Virtuel</h3>
              <p className="text-gray-400">A virtual coffee experience</p>
            </div>
            <div>
              <p className="text-gray-400">© {new Date().getFullYear()} Café Virtuel. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

