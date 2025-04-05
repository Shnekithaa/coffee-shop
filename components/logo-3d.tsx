"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, Center, PerspectiveCamera } from "@react-three/drei"

function CoffeeCup() {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={group}>
      {/* Cup */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.5, 1, 32]} />
        <meshStandardMaterial color="#222222" roughness={0.2} metalness={0.8} envMapIntensity={1} />
      </mesh>

      {/* Cup handle */}
      <mesh position={[0.8, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#222222" roughness={0.2} metalness={0.8} envMapIntensity={1} />
      </mesh>

      {/* Coffee liquid */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.4, 32]} />
        <meshStandardMaterial color="#c68e17" roughness={0.1} metalness={0.1} envMapIntensity={0.5} />
      </mesh>

      {/* Steam */}
      <group position={[0, 0.6, 0]}>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[(i - 1) * 0.2, Math.sin(Date.now() * 0.001 + i) * 0.1, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#ffffff" transparent={true} opacity={0.3} />
          </mesh>
        ))}
      </group>

      {/* Letter C */}
      <mesh position={[-0.2, 0.55, 0.4]} rotation={[0, 0, 0]} scale={0.3}>
        <Text3D font="/fonts/Inter_Bold.json" size={1} height={0.2} curveSegments={12}>
          C
          <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.8} envMapIntensity={1} />
        </Text3D>
      </mesh>

      {/* Letter V */}
      <mesh position={[0.1, 0.55, 0.4]} rotation={[0, 0, 0]} scale={0.3}>
        <Text3D font="/fonts/Inter_Bold.json" size={1} height={0.2} curveSegments={12}>
          V
          <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.8} envMapIntensity={1} />
        </Text3D>
      </mesh>
    </group>
  )
}

export default function Logo3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Center>
          <CoffeeCup />
        </Center>
      </Canvas>
    </div>
  )
}

