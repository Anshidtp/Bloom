import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

// ── Colour map by flavor ──────────────────────────────────
const FLAVOR_COLORS = {
  Vanilla:     { frosting: '#FFF8ED', sponge: '#F5E6C8', accent: '#D4AF37' },
  Chocolate:   { frosting: '#3D1F1A', sponge: '#2C1008', accent: '#B76E79' },
  Strawberry:  { frosting: '#F8C8DC', sponge: '#FFE4EF', accent: '#E8689A' },
  RedVelvet:   { frosting: '#F0E6E6', sponge: '#8B1A1A', accent: '#C0392B' },
  BlackForest: { frosting: '#2C1A2E', sponge: '#1A0E1A', accent: '#B76E79' },
}

// ── Scale map by weight ───────────────────────────────────
const WEIGHT_SCALE = { '500g': 0.75, '1kg': 1.0, '2kg': 1.25, '3kg': 1.5 }

// ── Decoration count by design ────────────────────────────
const DESIGN_DECORATIONS = {
  Minimal: 0, Floral: 6, Birthday: 8, Cartoon: 6, LuxuryGold: 10, Wedding: 8,
}

export default function CakeModel({ flavor = 'Vanilla', weight = '1kg', design = 'Minimal' }) {
  const groupRef  = useRef()
  const colors    = FLAVOR_COLORS[flavor]  || FLAVOR_COLORS.Vanilla
  const scale     = WEIGHT_SCALE[weight]   || 1
  const decCount  = DESIGN_DECORATIONS[design] || 0

  // Slow bobbing animation
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })

  // Decorative spheres arranged in a ring
  const decorations = useMemo(() => {
    return Array.from({ length: decCount }, (_, i) => {
      const angle = (i / decCount) * Math.PI * 2
      return {
        x: Math.cos(angle) * 1.1 * scale,
        z: Math.sin(angle) * 1.1 * scale,
        size: 0.07 + Math.random() * 0.06,
      }
    })
  }, [decCount, scale])

  const frostMat  = <meshStandardMaterial color={colors.frosting} roughness={0.25} metalness={0.05} />
  const spongeMat = <meshStandardMaterial color={colors.sponge}   roughness={0.6} />
  const accentMat = <meshStandardMaterial color={colors.accent}   roughness={0.1} metalness={0.7} />

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* ── Cake stand ── */}
      <mesh position={[0, -0.55, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.55 * scale, 1.6 * scale, 0.12, 64]} />
        {accentMat}
      </mesh>

      {/* ── Tier 1 — sponge ── */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.2 * scale, 1.2 * scale, 0.55, 64]} />
        {spongeMat}
      </mesh>
      {/* ── Tier 1 — frosting ── */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[1.22 * scale, 1.2 * scale, 0.08, 64]} />
        {frostMat}
      </mesh>

      {/* ── Tier 2 — sponge ── */}
      <mesh position={[0, 0.75 * scale, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.85 * scale, 0.85 * scale, 0.5, 64]} />
        {spongeMat}
      </mesh>
      {/* ── Tier 2 — frosting ── */}
      <mesh position={[0, 1.0 * scale, 0]} castShadow>
        <cylinderGeometry args={[0.87 * scale, 0.85 * scale, 0.07, 64]} />
        {frostMat}
      </mesh>

      {/* ── Tier 3 (only for 3kg) ── */}
      {weight === '3kg' && (
        <>
          <mesh position={[0, 1.45, 0]} castShadow>
            <cylinderGeometry args={[0.55, 0.55, 0.45, 64]} />
            {spongeMat}
          </mesh>
          <mesh position={[0, 1.7, 0]} castShadow>
            <cylinderGeometry args={[0.57, 0.55, 0.07, 64]} />
            {frostMat}
          </mesh>
        </>
      )}

      {/* ── Decorations ring ── */}
      {decorations.map((d, i) => (
        <mesh key={i} position={[d.x, (1.05 * scale), d.z]} castShadow>
          <sphereGeometry args={[d.size * scale, 16, 16]} />
          {accentMat}
        </mesh>
      ))}

      {/* ── Cherry on top ── */}
      <mesh position={[0, 1.1 * scale + 0.12, 0]} castShadow>
        <sphereGeometry args={[0.1 * scale, 16, 16]} />
        <meshStandardMaterial color="#C0392B" roughness={0.1} metalness={0.2} />
      </mesh>
    </group>
  )
}
