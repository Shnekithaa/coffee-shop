"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function CoffeeModel({ coffeeType, toppings, cupSize = 1 }) {
  const group = useRef()
  const cupRef = useRef()
  const coffeeRef = useRef()
  const creamRef = useRef()
  const cinnamonRef = useRef()
  const chocolateRef = useRef()
  const caramelRef = useRef()

  // Steam particles
  const steamParticles = useRef([])

  useEffect(() => {
    // Create steam particles
    if (steamParticles.current.length === 0) {
      for (let i = 0; i < 10; i++) {
        steamParticles.current.push({
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            0.8 + Math.random() * 0.5,
            (Math.random() - 0.5) * 0.3,
          ),
          scale: 0.05 + Math.random() * 0.05,
          speed: 0.01 + Math.random() * 0.01,
        })
      }
    }
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003
    }

    // Animate steam particles
    steamParticles.current.forEach((particle) => {
      particle.position.y += particle.speed
      if (particle.position.y > 2) {
        particle.position.y = 0.8
        particle.position.x = (Math.random() - 0.5) * 0.3
        particle.position.z = (Math.random() - 0.5) * 0.3
      }
    })
  })

  // Create texture for cup
  const cupTexture = new THREE.TextureLoader().load("/placeholder.svg?height=200&width=200")
  cupTexture.wrapS = THREE.RepeatWrapping
  cupTexture.wrapT = THREE.RepeatWrapping
  cupTexture.repeat.set(4, 4)

  return (
    <group ref={group} position={[0, -1, 0]} scale={[cupSize, cupSize, cupSize]}>
      {/* Cup */}
      <mesh ref={cupRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.4, 1, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.3} envMapIntensity={1} />
      </mesh>

      {/* Cup texture/design */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.501, 0.401, 1.001, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.5}
          metalness={0.2}
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Cup handle */}
      <mesh position={[0.6, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.3} envMapIntensity={1} />
      </mesh>

      {/* Coffee liquid */}
      <mesh ref={coffeeRef} position={[0, coffeeType.fillLevel / 2, 0]}>
        <cylinderGeometry args={[0.48, 0.48, coffeeType.fillLevel, 32]} />
        <meshStandardMaterial color={coffeeType.color} roughness={0.1} metalness={0.1} envMapIntensity={0.5} />
      </mesh>

      {/* Coffee surface reflection */}
      <mesh position={[0, coffeeType.fillLevel, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.48, 32]} />
        <meshStandardMaterial color={coffeeType.color} roughness={0} metalness={0.5} envMapIntensity={1} />
      </mesh>

      {/* Whipped Cream */}
      {toppings.includes("cream") && (
        <group ref={creamRef} position={[0, 0.6, 0]}>
          <mesh>
            <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
          </mesh>

          {/* Cream texture */}
          {[...Array(10)].map((_, i) => (
            <mesh
              key={i}
              position={[(Math.random() - 0.5) * 0.6, Math.random() * 0.1, (Math.random() - 0.5) * 0.6]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <sphereGeometry args={[0.1 + Math.random() * 0.05, 8, 8]} />
              <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </mesh>
          ))}
        </group>
      )}

      {/* Cinnamon */}
      {toppings.includes("cinnamon") && (
        <mesh ref={cinnamonRef} position={[0, 0.61, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
          <meshStandardMaterial color="#d2691e" roughness={0.8} metalness={0.1} />

          {/* Cinnamon texture */}
          {[...Array(20)].map((_, i) => (
            <mesh key={i} position={[(Math.random() - 0.5) * 0.7, 0.01, (Math.random() - 0.5) * 0.7]}>
              <boxGeometry args={[0.02, 0.01, 0.02]} />
              <meshStandardMaterial color="#a0522d" roughness={0.7} />
            </mesh>
          ))}
        </mesh>
      )}

      {/* Chocolate Sprinkles */}
      {toppings.includes("chocolate") && (
        <>
          {[...Array(30)].map((_, i) => (
            <mesh
              key={i}
              ref={chocolateRef}
              position={[(Math.random() - 0.5) * 0.6, 0.62, (Math.random() - 0.5) * 0.6]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <boxGeometry args={[0.02, 0.02, 0.1]} />
              <meshStandardMaterial color="#3d2314" roughness={0.5} metalness={0.2} />
            </mesh>
          ))}
        </>
      )}

      {/* Caramel Drizzle */}
      {toppings.includes("caramel") && (
        <>
          {[...Array(8)].map((_, i) => {
            const radius = 0.2 + Math.random() * 0.2
            const startAngle = Math.random() * Math.PI * 2
            const endAngle = startAngle + (Math.random() * Math.PI) / 2 + Math.PI / 4

            return (
              <mesh key={i} ref={caramelRef} position={[0, 0.62, 0]} rotation={[0, Math.random() * Math.PI * 2, 0]}>
                <torusGeometry args={[radius, 0.02, 8, 16, endAngle - startAngle]} />
                <meshStandardMaterial
                  color="#c68e17"
                  roughness={0.3}
                  metalness={0.4}
                  transparent={true}
                  opacity={0.9}
                />
              </mesh>
            )
          })}
        </>
      )}

      {/* Steam particles */}
      {steamParticles.current.map((particle, i) => (
        <mesh key={i} position={particle.position.toArray()}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshStandardMaterial color="#ffffff" transparent={true} opacity={0.3} envMapIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

