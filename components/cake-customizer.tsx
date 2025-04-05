"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CakeModel } from "./models/cake-model"

const cakeTypes = [
  { id: "chocolate", name: "Chocolate", color: "#3d2314", price: 4.5 },
  { id: "vanilla", name: "Vanilla", color: "#f5e9c9", price: 4.0 },
  { id: "redvelvet", name: "Red Velvet", color: "#a42025", price: 5.0 },
  { id: "carrot", name: "Carrot", color: "#e67e22", price: 4.75 },
  { id: "lemon", name: "Lemon", color: "#f4d03f", price: 4.25 },
]

const frostings = [
  { id: "buttercream", name: "Buttercream", color: "#f5f5dc", price: 0.5 },
  { id: "chocolate", name: "Chocolate", color: "#3d2314", price: 0.75 },
  { id: "cream_cheese", name: "Cream Cheese", color: "#f8f8ff", price: 1.0 },
  { id: "strawberry", name: "Strawberry", color: "#ff9999", price: 0.75 },
]

const toppings = [
  { id: "sprinkles", name: "Sprinkles", price: 0.5 },
  { id: "chocolate_chips", name: "Chocolate Chips", price: 0.75 },
  { id: "fruits", name: "Fresh Fruits", price: 1.0 },
  { id: "nuts", name: "Chopped Nuts", price: 0.75 },
  { id: "caramel", name: "Caramel Drizzle", price: 0.5 },
]

const cakeSizes = [
  { id: "small", name: 'Small (6")', scale: 0.8, price: 0 },
  { id: "medium", name: 'Medium (8")', scale: 1, price: 2.0 },
  { id: "large", name: 'Large (10")', scale: 1.2, price: 4.0 },
]

export default function CakeCustomizer() {
  const [cakeType, setCakeType] = useState(cakeTypes[0])
  const [frosting, setFrosting] = useState(frostings[0])
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [cakeSize, setCakeSize] = useState(cakeSizes[1])

  const handleToppingChange = (toppingId: string, checked: boolean) => {
    if (checked) {
      setSelectedToppings([...selectedToppings, toppingId])
    } else {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId))
    }
  }

  const calculatePrice = () => {
    const basePrice = cakeType.price
    const frostingPrice = frosting.price
    const toppingsPrice = toppings
      .filter((topping) => selectedToppings.includes(topping.id))
      .reduce((sum, topping) => sum + topping.price, 0)
    const sizePrice = cakeSize.price

    return (basePrice + frostingPrice + toppingsPrice + sizePrice).toFixed(2)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-lg overflow-hidden h-[500px] border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <CakeModel cakeType={cakeType} frosting={frosting} toppings={selectedToppings} cakeSize={cakeSize.scale} />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
        <Tabs defaultValue="type" className="text-gray-100">
          <TabsList className="grid grid-cols-4 mb-6 bg-gray-700">
            <TabsTrigger value="type" className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900">
              Cake
            </TabsTrigger>
            <TabsTrigger
              value="frosting"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
            >
              Frosting
            </TabsTrigger>
            <TabsTrigger
              value="toppings"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
            >
              Toppings
            </TabsTrigger>
            <TabsTrigger value="size" className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900">
              Size
            </TabsTrigger>
          </TabsList>

          <TabsContent value="type" className="space-y-4">
            <RadioGroup
              defaultValue={cakeType.id}
              onValueChange={(value) => setCakeType(cakeTypes.find((c) => c.id === value) || cakeTypes[0])}
            >
              {cakeTypes.map((type) => (
                <motion.div
                  key={type.id}
                  className="flex items-center justify-between space-x-2 border-b border-gray-700 pb-2"
                  whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)", x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={type.id}
                      id={`cake-${type.id}`}
                      className="border-amber-500 text-amber-500"
                    />
                    <Label htmlFor={`cake-${type.id}`} className="text-gray-100">
                      {type.name}
                    </Label>
                  </div>
                  <span className="text-amber-500 font-medium">${type.price.toFixed(2)}</span>
                </motion.div>
              ))}
            </RadioGroup>
          </TabsContent>

          <TabsContent value="frosting" className="space-y-4">
            <RadioGroup
              defaultValue={frosting.id}
              onValueChange={(value) => setFrosting(frostings.find((f) => f.id === value) || frostings[0])}
            >
              {frostings.map((type) => (
                <motion.div
                  key={type.id}
                  className="flex items-center justify-between space-x-2 border-b border-gray-700 pb-2"
                  whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)", x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={type.id}
                      id={`frosting-${type.id}`}
                      className="border-amber-500 text-amber-500"
                    />
                    <Label htmlFor={`frosting-${type.id}`} className="text-gray-100">
                      {type.name}
                    </Label>
                  </div>
                  <span className="text-amber-500 font-medium">+${type.price.toFixed(2)}</span>
                </motion.div>
              ))}
            </RadioGroup>
          </TabsContent>

          <TabsContent value="toppings" className="space-y-4">
            {toppings.map((topping) => (
              <motion.div
                key={topping.id}
                className="flex items-center justify-between space-x-2 border-b border-gray-700 pb-2"
                whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)", x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`topping-${topping.id}`}
                    checked={selectedToppings.includes(topping.id)}
                    onCheckedChange={(checked) => handleToppingChange(topping.id, checked as boolean)}
                    className="border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-gray-900"
                  />
                  <Label htmlFor={`topping-${topping.id}`} className="text-gray-100">
                    {topping.name}
                  </Label>
                </div>
                <span className="text-amber-500 font-medium">+${topping.price.toFixed(2)}</span>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="size" className="space-y-4">
            <RadioGroup
              defaultValue={cakeSize.id}
              onValueChange={(value) => setCakeSize(cakeSizes.find((s) => s.id === value) || cakeSizes[1])}
            >
              {cakeSizes.map((size) => (
                <motion.div
                  key={size.id}
                  className="flex items-center justify-between space-x-2 border-b border-gray-700 pb-2"
                  whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)", x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={size.id}
                      id={`size-${size.id}`}
                      className="border-amber-500 text-amber-500"
                    />
                    <Label htmlFor={`size-${size.id}`} className="text-gray-100">
                      {size.name}
                    </Label>
                  </div>
                  {size.price > 0 && <span className="text-amber-500 font-medium">+${size.price.toFixed(2)}</span>}
                </motion.div>
              ))}
            </RadioGroup>
          </TabsContent>
        </Tabs>

        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-100">Total:</span>
            <span className="text-xl font-bold text-amber-500">${calculatePrice()}</span>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold">Add to Order</Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

