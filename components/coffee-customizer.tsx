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
import { CoffeeModel } from "./models/coffee-model"

const coffeeTypes = [
  { id: "espresso", name: "Espresso", color: "#3d2314", fillLevel: 0.3, price: 2.5 },
  { id: "americano", name: "Americano", color: "#4e2e17", fillLevel: 0.7, price: 3.0 },
  { id: "latte", name: "Latte", color: "#8c5d3c", fillLevel: 0.8, price: 3.5 },
  { id: "cappuccino", name: "Cappuccino", color: "#6f4e37", fillLevel: 0.7, price: 3.75 },
  { id: "mocha", name: "Mocha", color: "#5d3c1e", fillLevel: 0.8, price: 4.0 },
]

const toppings = [
  { id: "cream", name: "Whipped Cream", price: 0.5 },
  { id: "cinnamon", name: "Cinnamon", price: 0.25 },
  { id: "chocolate", name: "Chocolate Sprinkles", price: 0.5 },
  { id: "caramel", name: "Caramel Drizzle", price: 0.75 },
]

const cupSizes = [
  { id: "small", name: "Small", scale: 0.8, price: 0 },
  { id: "medium", name: "Medium", scale: 1, price: 0.5 },
  { id: "large", name: "Large", scale: 1.2, price: 1.0 },
]

export default function CoffeeCustomizer() {
  const [coffeeType, setCoffeeType] = useState(coffeeTypes[0])
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [cupSize, setCupSize] = useState(cupSizes[1])

  const handleToppingChange = (toppingId: string, checked: boolean) => {
    if (checked) {
      setSelectedToppings([...selectedToppings, toppingId])
    } else {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId))
    }
  }

  const calculatePrice = () => {
    const basePrice = coffeeType.price
    const toppingsPrice = toppings
      .filter((topping) => selectedToppings.includes(topping.id))
      .reduce((sum, topping) => sum + topping.price, 0)
    const sizePrice = cupSize.price

    return (basePrice + toppingsPrice + sizePrice).toFixed(2)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-lg overflow-hidden h-[500px] border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <CoffeeModel coffeeType={coffeeType} toppings={selectedToppings} cupSize={cupSize.scale} />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
        <Tabs defaultValue="type" className="text-gray-100">
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-700">
            <TabsTrigger value="type" className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900">
              Coffee Type
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
              defaultValue={coffeeType.id}
              onValueChange={(value) => setCoffeeType(coffeeTypes.find((c) => c.id === value) || coffeeTypes[0])}
            >
              {coffeeTypes.map((type) => (
                <motion.div
                  key={type.id}
                  className="flex items-center justify-between space-x-2 border-b border-gray-700 pb-2"
                  whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)", x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={type.id} id={type.id} className="border-amber-500 text-amber-500" />
                    <Label htmlFor={type.id} className="text-gray-100">
                      {type.name}
                    </Label>
                  </div>
                  <span className="text-amber-500 font-medium">${type.price.toFixed(2)}</span>
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
                    id={topping.id}
                    checked={selectedToppings.includes(topping.id)}
                    onCheckedChange={(checked) => handleToppingChange(topping.id, checked as boolean)}
                    className="border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-gray-900"
                  />
                  <Label htmlFor={topping.id} className="text-gray-100">
                    {topping.name}
                  </Label>
                </div>
                <span className="text-amber-500 font-medium">+${topping.price.toFixed(2)}</span>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="size" className="space-y-4">
            <RadioGroup
              defaultValue={cupSize.id}
              onValueChange={(value) => setCupSize(cupSizes.find((s) => s.id === value) || cupSizes[1])}
            >
              {cupSizes.map((size) => (
                <motion.div
                  key={size.id}
                  className="flex items-center justify-between space-x-2 border-b border-gray-700 pb-2"
                  whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)", x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={size.id} id={size.id} className="border-amber-500 text-amber-500" />
                    <Label htmlFor={size.id} className="text-gray-100">
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

