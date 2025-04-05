"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function CakeModel({ cakeType, frosting, toppings, cakeSize = 1 }) {
  const group = useRef()
  const cakeBaseRef = useRef()
  const frostingRef = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003
    }
  })

  // Create texture for cake plate
  const plateTexture = new THREE.TextureLoader().load("/placeholder.svg?height=200&width=200")
  plateTexture.wrapS = THREE.RepeatWrapping
  plateTexture.wrapT = THREE.RepeatWrapping
  plateTexture.repeat.set(2, 2)

  return (
    <group ref={group} position={[0, -1, 0]} scale={[cakeSize, cakeSize, cakeSize]}>
      {/* Cake plate */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.5} envMapIntensity={1} />
      </mesh>

      {/* Plate decoration */}
      <mesh position={[0, -0.05, 0]}>
        <ringGeometry args={[0.9, 1.1, 32]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.4} transparent={true} opacity={0.2} />
      </mesh>

      {/* Cake base */}
      <mesh ref={cakeBaseRef} position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1, 1, 0.5, 32]} />
        <meshStandardMaterial color={cakeType.color} roughness={0.7} metalness={0.1} envMapIntensity={0.5} />
      </mesh>

      {/* Cake texture */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.001, 1.001, 0.501, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.8} transparent={true} opacity={0.05} wireframe={true} />
      </mesh>

      {/* Frosting */}
      <mesh ref={frostingRef} position={[0, 0.55, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
        <meshStandardMaterial color={frosting.color} roughness={0.5} metalness={0.1} envMapIntensity={0.5} />
      </mesh>

      {/* Frosting top decoration */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={`frosting-${i}`}
          position={[Math.cos((i * Math.PI) / 6) * 0.8, 0.6, Math.sin((i * Math.PI) / 6) * 0.8]}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={frosting.color} roughness={0.5} metalness={0.1} envMapIntensity={0.5} />
        </mesh>
      ))}

      {/* Sprinkles */}
      {toppings.includes("sprinkles") && (
        <>
          {[...Array(80)].map((_, i) => (
            <mesh
              key={`sprinkle-${i}`}
              position={[(Math.random() - 0.5) * 1.6, 0.62, (Math.random() - 0.5) * 1.6]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <boxGeometry args={[0.02, 0.02, 0.1]} />
              <meshStandardMaterial
                color={new THREE.Color().setHSL(Math.random(), 0.8, 0.6)}
                roughness={0.5}
                metalness={0.3}
                envMapIntensity={1}
              />
            </mesh>
          ))}
        </>
      )}

      {/* Chocolate Chips */}
      {toppings.includes("chocolate_chips") && (
        <>
          {[...Array(40)].map((_, i) => (
            <mesh key={`chip-${i}`} position={[(Math.random() - 0.5) * 1.6, 0.62, (Math.random() - 0.5) * 1.6]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#3d2314" roughness={0.5} metalness={0.2} envMapIntensity={0.8} />
            </mesh>
          ))}
        </>
      )}

      {/* Fresh Fruits */}
      {toppings.includes("fruits") && (
        <>
          {/* Strawberries */}
          {[...Array(8)].map((_, i) => (
            <group
              key={`strawberry-${i}`}
              position={[(Math.random() - 0.5) * 1.2, 0.65, (Math.random() - 0.5) * 1.2]}
              rotation={[(Math.random() * Math.PI) / 4, Math.random() * Math.PI * 2, (Math.random() * Math.PI) / 4]}
            >
              <mesh>
                <coneGeometry args={[0.1, 0.2, 16]} />
                <meshStandardMaterial color="#ff0000" roughness={0.6} metalness={0.1} envMapIntensity={0.8} />
              </mesh>
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
                <meshStandardMaterial color="#00aa00" roughness={0.6} metalness={0.1} />
              </mesh>

              {/* Strawberry seeds */}
              {[...Array(10)].map((_, j) => (
                <mesh
                  key={`seed-${j}`}
                  position={[(Math.random() - 0.5) * 0.15, -0.05 + Math.random() * 0.1, (Math.random() - 0.5) * 0.15]}
                >
                  <sphereGeometry args={[0.01, 4, 4]} />
                  <meshStandardMaterial color="#ffff00" roughness={0.5} />
                </mesh>
              ))}
            </group>
          ))}

          {/* Blueberries */}
          {[...Array(15)].map((_, i) => (
            <mesh key={`blueberry-${i}`} position={[(Math.random() - 0.5) * 1.4, 0.65, (Math.random() - 0.5) * 1.4]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#4169e1" roughness={0.4} metalness={0.2} envMapIntensity={0.8} />
            </mesh>
          ))}
        </>
      )}

      {/* Chopped Nuts */}
      {toppings.includes("nuts") && (
        <>
          {[...Array(50)].map((_, i) => (
            <mesh
              key={`nut-${i}`}
              position={[(Math.random() - 0.5) * 1.6, 0.62, (Math.random() - 0.5) * 1.6]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <boxGeometry args={[0.05, 0.05, 0.05]} />
              <meshStandardMaterial color="#8b5a2b" roughness={0.7} metalness={0.1} envMapIntensity={0.5} />
            </mesh>
          ))}
        </>
      )}

      {/* Caramel Drizzle */}
      {toppings.includes("caramel") && (
        <>
          {[...Array(12)].map((_, i) => {
            const radius = 0.4 + Math.random() * 0.4
            const startAngle = Math.random() * Math.PI * 2
            const endAngle = startAngle + (Math.random() * Math.PI) / 2 + Math.PI / 4

            return (
              <mesh key={`caramel-${i}`} position={[0, 0.62, 0]} rotation={[0, Math.random() * Math.PI * 2, 0]}>
                <torusGeometry args={[radius, 0.02, 8, 16, endAngle - startAngle]} />
                <meshStandardMaterial
                  color="#c68e17"
                  roughness={0.3}
                  metalness={0.4}
                  transparent={true}
                  opacity={0.9}
                  envMapIntensity={1}
                />
              </mesh>
            )
          })}
        </>
      )}
    </group>
  )
}

