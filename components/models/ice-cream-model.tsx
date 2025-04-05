"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export function IceCreamModel({ flavor }) {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003
    }
  })

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Cone */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.5, 1.2, 32]} />
        <meshStandardMaterial color="#d4a76a" roughness={0.8} metalness={0.1} envMapIntensity={0.5} />

        {/* Cone texture - waffle pattern */}
        <mesh position={[0, 0, 0]}>
          {[...Array(8)].map((_, i) => (
            <mesh key={`line-h-${i}`} position={[0, -0.5 + i * 0.15, 0]}>
              <torusGeometry args={[0.3 + i * 0.025, 0.01, 8, 32]} />
              <meshStandardMaterial color="#c68e17" roughness={0.5} metalness={0.2} />
            </mesh>
          ))}

          {[...Array(16)].map((_, i) => (
            <mesh key={`line-v-${i}`} rotation={[0, (i * Math.PI) / 8, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 1.2, 8]} />
              <meshStandardMaterial color="#c68e17" roughness={0.5} metalness={0.2} />
            </mesh>
          ))}
        </mesh>
      </mesh>

      {/* Ice cream scoops */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={flavor.color} roughness={0.2} metalness={0.1} envMapIntensity={0.8} />

        {/* Ice cream texture */}
        <mesh>
          <sphereGeometry args={[0.601, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} transparent={true} opacity={0.1} wireframe={true} />
        </mesh>
      </mesh>

      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={flavor.color} roughness={0.2} metalness={0.1} envMapIntensity={0.8} />

        {/* Ice cream texture */}
        <mesh>
          <sphereGeometry args={[0.501, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} transparent={true} opacity={0.1} wireframe={true} />
        </mesh>
      </mesh>

      {/* Toppings */}
      {flavor.id === "chocolate" && (
        <>
          {[...Array(15)].map((_, i) => (
            <mesh
              key={`choc-bit-${i}`}
              position={[(Math.random() - 0.5) * 0.8, 1.3 + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.8]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <boxGeometry args={[0.05, 0.05, 0.05]} />
              <meshStandardMaterial color="#2a1506" roughness={0.5} metalness={0.2} envMapIntensity={0.8} />
            </mesh>
          ))}
        </>
      )}

      {flavor.id === "strawberry" && (
        <>
          {[...Array(5)].map((_, i) => (
            <group
              key={`strawberry-${i}`}
              position={[(Math.random() - 0.5) * 0.6, 1.3 + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.6]}
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
              {[...Array(8)].map((_, j) => (
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
        </>
      )}

      {flavor.id === "mint" && (
        <>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={`mint-${i}`}
              position={[(Math.random() - 0.5) * 0.8, 1.3 + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.8]}
            >
              <cylinderGeometry args={[0.05, 0.05, 0.01, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.2} envMapIntensity={0.8} />
            </mesh>
          ))}

          {/* Mint leaves */}
          {[...Array(3)].map((_, i) => (
            <group
              key={`leaf-${i}`}
              position={[(Math.random() - 0.5) * 0.4, 1.5 + (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.4]}
              rotation={[(Math.random() * Math.PI) / 4, Math.random() * Math.PI * 2, (Math.random() * Math.PI) / 4]}
            >
              <mesh>
                <boxGeometry args={[0.1, 0.01, 0.2]} />
                <meshStandardMaterial color="#00aa00" roughness={0.6} metalness={0.1} />
              </mesh>
            </group>
          ))}
        </>
      )}

      {/* Cherry on top */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff0000" roughness={0.3} metalness={0.3} envMapIntensity={1} />
      </mesh>

      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#2a1506" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  )
}

