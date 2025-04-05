"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export function ChocolateModel({ chocolateType }) {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003
    }
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Chocolate bar */}
      <group position={[0, 0, 0]}>
        {/* Main chocolate bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 0.2, 1.5]} />
          <meshStandardMaterial color={chocolateType.color} roughness={0.4} metalness={0.2} envMapIntensity={0.8} />
        </mesh>

        {/* Chocolate segments */}
        {[...Array(6)].map((_, i) => (
          <mesh key={`segment-h-${i}`} position={[-0.75 + i * 0.3, 0.11, 0]}>
            <boxGeometry args={[0.02, 0.02, 1.5]} />
            <meshStandardMaterial
              color={chocolateType.id === "white" ? "#e0d9c8" : "#2a1506"}
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
        ))}

        {[...Array(4)].map((_, i) => (
          <mesh key={`segment-v-${i}`} position={[0, 0.11, -0.6 + i * 0.4]}>
            <boxGeometry args={[2, 0.02, 0.02]} />
            <meshStandardMaterial
              color={chocolateType.id === "white" ? "#e0d9c8" : "#2a1506"}
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
        ))}

        {/* Chocolate texture */}
        <mesh position={[0, 0.101, 0]}>
          <boxGeometry args={[2.001, 0.001, 1.501]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} transparent={true} opacity={0.05} wireframe={true} />
        </mesh>

        {/* Special fillings for filled chocolates */}
        {chocolateType.id === "caramel" && (
          <>
            {[...Array(12)].map((_, i) => {
              const x = Math.floor(i / 3) * 0.6 - 0.9
              const z = (i % 3) * 0.6 - 0.6

              return (
                <mesh key={`filling-${i}`} position={[x, 0.05, z]}>
                  <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                  <meshStandardMaterial color="#c68e17" roughness={0.3} metalness={0.4} envMapIntensity={1} />
                </mesh>
              )
            })}
          </>
        )}

        {chocolateType.id === "hazelnut" && (
          <>
            {[...Array(12)].map((_, i) => {
              const x = Math.floor(i / 3) * 0.6 - 0.9
              const z = (i % 3) * 0.6 - 0.6

              return (
                <mesh key={`nut-${i}`} position={[x, 0.05, z]}>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial color="#8b5a2b" roughness={0.7} metalness={0.2} envMapIntensity={0.5} />
                </mesh>
              )
            })}
          </>
        )}
      </group>

      {/* Chocolate wrapper */}
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 32]}>
          <boxGeometry args={[2.2, 0.01, 1.7]} />
          <meshStandardMaterial
            color={
              chocolateType.id === "dark"
                ? "#1a1a1a"
                : chocolateType.id === "milk"
                  ? "#8b4513"
                  : chocolateType.id === "white"
                    ? "#f0f0f0"
                    : chocolateType.id === "caramel"
                      ? "#d4a76a"
                      : "#a0522d"
            }
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={1}
          />
        </mesh>

        {/* Wrapper folds */}
        <mesh position={[1.1, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.3, 0.01, 1.7]} />
          <meshStandardMaterial
            color={
              chocolateType.id === "dark"
                ? "#1a1a1a"
                : chocolateType.id === "milk"
                  ? "#8b4513"
                  : chocolateType.id === "white"
                    ? "#f0f0f0"
                    : chocolateType.id === "caramel"
                      ? "#d4a76a"
                      : "#a0522d"
            }
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={1}
          />
        </mesh>

        <mesh position={[-1.1, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.3, 0.01, 1.7]} />
          <meshStandardMaterial
            color={
              chocolateType.id === "dark"
                ? "#1a1a1a"
                : chocolateType.id === "milk"
                  ? "#8b4513"
                  : chocolateType.id === "white"
                    ? "#f0f0f0"
                    : chocolateType.id === "caramel"
                      ? "#d4a76a"
                      : "#a0522d"
            }
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={1}
          />
        </mesh>

        {/* Wrapper shine */}
        <mesh position={[0, 0.001, 0]} rotation={[0, 0, Math.PI / 32]}>
          <boxGeometry args={[2.2, 0.001, 1.7]} />
          <meshStandardMaterial color="#ffffff" roughness={0} metalness={1} transparent={true} opacity={0.2} />
        </mesh>
      </group>
    </group>
  )
}

