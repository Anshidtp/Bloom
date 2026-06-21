import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Particles — soft floating gold sparkles orbiting the cake scene.
 */
export default function Particles({ count = 60 }) {
  const meshRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 6   // x
      arr[i * 3 + 1] = Math.random() * 4 - 1         // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6   // z
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D4AF37"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}
