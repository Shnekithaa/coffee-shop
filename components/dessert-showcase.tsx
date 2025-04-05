"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IceCreamModel } from "./models/ice-cream-model"
import { ChocolateModel } from "./models/chocolate-model"

const iceCreamFlavors = [
  { id: "vanilla", name: "Vanilla", color: "#f5f5dc", price: 3.0 },
  { id: "chocolate", name: "Chocolate", color: "#3d2314", price: 3.0 },
  { id: "strawberry", name: "Strawberry", color: "#ff9999", price: 3.0 },
  { id: "mint", name: "Mint", color: "#98fb98", price: 3.5 },
  { id: "blueberry", name: "Blueberry", color: "#4169e1", price: 3.5 },
]

const chocolateTypes = [
  { id: "dark", name: "Dark Chocolate", color: "#2a1506", price: 2.5 },
  { id: "milk", name: "Milk Chocolate", color: "#6b4226", price: 2.5 },
  { id: "white", name: "White Chocolate", color: "#f5f5dc", price: 2.75 },
  { id: "caramel", name: "Caramel Filled", color: "#c68e17", price: 3.0 },
  { id: "hazelnut", name: "Hazelnut", color: "#8b5a2b", price: 3.0 },
]

export default function DessertShowcase() {
  const [activeTab, setActiveTab] = useState("icecream")
  const [selectedIceCream, setSelectedIceCream] = useState(iceCreamFlavors[0])
  const [selectedChocolate, setSelectedChocolate] = useState(chocolateTypes[0])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-lg p-6 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
        <Tabs defaultValue="icecream" onValueChange={setActiveTab} className="text-gray-100">
          <TabsList className="grid grid-cols-2 mb-6 bg-gray-700">
            <TabsTrigger
              value="icecream"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
            >
              Ice Cream
            </TabsTrigger>
            <TabsTrigger
              value="chocolate"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
            >
              Chocolate
            </TabsTrigger>
          </TabsList>

          <TabsContent value="icecream" className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-500 mb-4">Ice Cream Flavors</h3>
            {iceCreamFlavors.map((flavor, index) => (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${selectedIceCream.id === flavor.id ? "border-amber-500 bg-gray-700" : "border-transparent hover:bg-gray-700"}`}
                onClick={() => setSelectedIceCream(flavor)}
                whileHover={{ x: 5 }}
              >
                <span className="text-gray-100">{flavor.name}</span>
                <span className="text-amber-500 font-medium">${flavor.price.toFixed(2)}</span>
              </motion.div>
            ))}

            <div className="mt-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold">Add to Order</Button>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="chocolate" className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-500 mb-4">Chocolate Selection</h3>
            {chocolateTypes.map((chocolate, index) => (
              <motion.div
                key={chocolate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${selectedChocolate.id === chocolate.id ? "border-amber-500 bg-gray-700" : "border-transparent hover:bg-gray-700"}`}
                onClick={() => setSelectedChocolate(chocolate)}
                whileHover={{ x: 5 }}
              >
                <span className="text-gray-100">{chocolate.name}</span>
                <span className="text-amber-500 font-medium">${chocolate.price.toFixed(2)}</span>
              </motion.div>
            ))}

            <div className="mt-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold">Add to Order</Button>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden h-[500px] border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          {activeTab === "icecream" ? (
            <IceCreamModel flavor={selectedIceCream} />
          ) : (
            <ChocolateModel chocolateType={selectedChocolate} />
          )}

          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
          <Environment preset="night" />
        </Canvas>
      </div>
    </div>
  )
}

