import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import CakeModel  from './CakeModel.jsx'
import Particles  from '../Particles.jsx'

/**
 * CakeScene — the main Three.js canvas used on the Home hero and Custom Cake designer.
 *
 * Props:
 *   flavor  — controls cake colour
 *   weight  — controls scale
 *   design  — controls decorations
 *   interactive — if true, enables OrbitControls drag/zoom
 */
export default function CakeScene({ flavor = 'Vanilla', weight = '1kg', design = 'Minimal', interactive = true }) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 42 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      {/* Ambient + key lighting */}
      <ambientLight intensity={0.7} color="#fff8ed" />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow
        shadow-mapSize={[1024, 1024]} color="#fffdf5" />
      <pointLight position={[-3, 3, -3]} intensity={0.5} color="#b76e79" />
      <pointLight position={[3, -1, 3]}  intensity={0.3} color="#d4af37" />

      <Suspense fallback={null}>
        <CakeModel flavor={flavor} weight={weight} design={design} />
        <Particles />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.35}
          scale={6}
          blur={2.5}
          color="#4A2C2A"
        />
        <Environment preset="studio" />
      </Suspense>

      {interactive && (
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={1.2}
        />
      )}
    </Canvas>
  )
}
