import { Suspense, lazy, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition      from '../../components/animations/PageTransition.jsx'
import FadeUp              from '../../components/animations/FadeUp.jsx'
import CakeCustomizerPanel from '../../components/cake/CakeCustomizerPanel.jsx'
import { useCakeStore }    from '../../store/cakeStore.js'

const CakeScene = lazy(() => import('../../components/three/CakeScene/CakeScene.jsx'))

export default function CustomCake() {
  const { flavor, weight, design } = useCakeStore()
  const [cameraAngle, setCameraAngle] = useState('front')

  return (
    <PageTransition>
      {/* Page header */}
      <div className="pt-28 pb-10 px-5 md:px-16 bg-gradient-to-br from-cream to-surface-container">
        <div className="container-max mx-auto">
          <FadeUp>
            <p className="label-caps text-roseGold mb-2">Bespoke Experience</p>
            <h1 className="heading-lg text-cocoa">Customisation Studio</h1>
            <p className="text-base text-cocoa/55 font-inter mt-3 max-w-xl">
              Design your artisan masterpiece. Every choice updates the 3D preview in real time.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Main designer layout */}
      <div className="px-5 md:px-16 py-10">
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT — sticky 3D viewer */}
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <FadeUp delay={0.1}>
                <div className="relative rounded-3xl overflow-hidden border border-outline-variant/20 shadow-chocolate bg-gradient-to-br from-cream/60 to-surface-container/40">
                  {/* Canvas */}
                  <div className="aspect-square w-full">
                    <Suspense fallback={
                      <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                          <span className="text-8xl animate-float">🎂</span>
                          <p className="font-playfair text-secondary mt-4 text-sm italic">Loading 3D Studio…</p>
                        </div>
                      </div>
                    }>
                      <CakeScene flavor={flavor} weight={weight} design={design} interactive />
                    </Suspense>
                  </div>

                  {/* Real-time badge */}
                  <div className="absolute top-5 left-5">
                    <motion.div
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="glass-card px-4 py-2 rounded-full border border-white/40 shadow-sm flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-inter font-semibold text-secondary">Live Preview</span>
                    </motion.div>
                  </div>

                  {/* Viewer controls */}
                  <div className="absolute bottom-5 right-5 flex flex-col gap-2">
                    <div className="glass-card p-2 rounded-xl border border-white/40 shadow-sm flex items-center gap-1">
                      {[
                        { icon: '↕', label: 'Zoom in', action: () => {} },
                        { icon: '↺', label: 'Reset',   action: () => {} },
                        { icon: '⛶', label: 'Fullscreen', action: () => {} },
                      ].map(({ icon, label, action }) => (
                        <button
                          key={label}
                          onClick={action}
                          title={label}
                          className="w-8 h-8 flex items-center justify-center text-sm text-cocoa/60 hover:bg-white/50 hover:text-secondary rounded-lg transition-colors"
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected state display */}
                  <div className="absolute bottom-5 left-5 glass-card px-4 py-2.5 rounded-xl border border-white/30 shadow-sm">
                    <p className="text-[10px] font-inter font-semibold text-secondary/60 uppercase tracking-widest mb-1">Current Config</p>
                    <p className="text-xs font-inter text-cocoa font-medium">{flavor} · {weight} · {design}</p>
                  </div>
                </div>

                <p className="text-center text-xs text-cocoa/35 font-inter italic mt-3">
                  Drag to rotate · Scroll to zoom · Your cake updates as you design
                </p>
              </FadeUp>
            </div>

            {/* RIGHT — customizer controls */}
            <div className="lg:col-span-5">
              <FadeUp delay={0.2}>
                <CakeCustomizerPanel />
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
