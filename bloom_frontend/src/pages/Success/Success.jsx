import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../../components/animations/PageTransition.jsx'
import FadeUp         from '../../components/animations/FadeUp.jsx'

// ── Confetti particles ────────────────────────────────────
const COLORS = ['#B76E79', '#D4AF37', '#795553', '#ffcfcb', '#FFF8ED', '#4A2C2A']

function useConfetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 120 }, () => ({
      x:    Math.random() * canvas.width,
      y:    -20,
      r:    Math.random() * 7 + 3,
      d:    Math.random() * 80 + 60,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      tilt:  Math.random() * 10 - 10,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0,
      opacity: 1,
    }))

    let angle  = 0
    let frameId

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      angle += 0.01
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental
        p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) * 1.8
        p.x += Math.sin(angle) * 2
        p.tilt = Math.sin(p.tiltAngle - Math.PI / 3) * 12
        p.opacity -= 0.004
        if (p.opacity <= 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width
          p.y = -20
          p.opacity = 1
        }
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(p.x + p.tilt + p.r / 2, p.y, p.r, p.r * 0.4, p.tiltAngle, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      frameId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frameId)
  }, [])

  return canvasRef
}

// ── Floating balloon ──────────────────────────────────────
function Balloon({ color, delay = 0, x = '50%' }) {
  return (
    <motion.div
      initial={{ y: '110%', opacity: 0 }}
      animate={{ y: '-10%', opacity: 1 }}
      transition={{ duration: 6, delay, ease: 'easeOut' }}
      style={{ left: x, position: 'absolute', bottom: 0 }}
      className="pointer-events-none"
    >
      <div className="w-10 h-12 rounded-full shadow-lg" style={{ backgroundColor: color }} />
      <div className="w-px h-16 mx-auto bg-cocoa/20" />
    </motion.div>
  )
}

export default function Success() {
  const { state }   = useLocation()
  const orderId     = state?.orderId || 'AB-' + Math.random().toString(36).slice(2, 8).toUpperCase()
  const canvasRef   = useConfetti()

  return (
    <PageTransition>
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Floating balloons */}
      <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden">
        {[
          { color: '#B76E79', delay: 0.2, x: '15%' },
          { color: '#D4AF37', delay: 0.5, x: '80%' },
          { color: '#795553', delay: 0.8, x: '35%' },
          { color: '#ffcfcb', delay: 0.3, x: '65%' },
        ].map((b, i) => <Balloon key={i} {...b} />)}
      </div>

      {/* Background */}
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'radial-gradient(circle at top right, #fff8ed 0%, #ffdad7 40%, #fdf8f7 100%)' }}>

        <div className="relative z-10 text-center px-5 max-w-2xl mx-auto">

          {/* Animated cake */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[100px] mb-8 block"
          >
            🎂
          </motion.div>

          {/* Heading */}
          <FadeUp delay={0.3}>
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
              className="heading-xl text-secondary mb-4"
            >
              Your Cake Journey Has Begun! 🎉
            </motion.h1>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="text-base text-cocoa/60 font-inter leading-relaxed mb-8">
              We've received your order and our artisans are already gathering the finest ingredients for your masterpiece.
            </p>
          </FadeUp>

          {/* Order card */}
          <FadeUp delay={0.5}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-card rounded-3xl p-8 border border-outline-variant/30 shadow-2xl max-w-md mx-auto mb-8"
            >
              <div className="bg-cream px-5 py-2.5 rounded-full border border-secondary/20 inline-block mb-4">
                <p className="label-caps text-secondary">Order ID: #{orderId}</p>
              </div>

              <div className="space-y-3 text-left">
                {[
                  { icon: '📧', text: 'Confirmation sent to your WhatsApp' },
                  { icon: '⏳', text: 'Estimated preparation: 24–48 hours' },
                  { icon: '🚚', text: 'Real-time delivery tracking active' },
                  { icon: '📞', text: 'Our team will call to confirm details' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm font-inter text-cocoa/70">
                    <span className="text-lg flex-shrink-0">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collections" className="btn-primary">
                Continue Exploring
              </Link>
              <Link to="/" className="btn-outline">
                Back to Home
              </Link>
            </div>
          </FadeUp>

          {/* Decorative floating badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-24 left-8 md:left-20 glass-card p-4 rounded-full shadow-lg"
          >
            <span className="text-2xl">✨</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-32 right-8 md:right-20 glass-card p-5 rounded-full shadow-lg"
          >
            <span className="text-2xl">❤️</span>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
