import { motion } from 'framer-motion'

export default function Loader({ fullScreen = true }) {
  const wrapper = fullScreen
    ? 'fixed inset-0 z-[200] flex items-center justify-center bg-cream/80 backdrop-blur-sm'
    : 'flex items-center justify-center py-20'

  return (
    <div className={wrapper} role="status" aria-label="Loading">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        {/* Spinning cake tiers */}
        <div className="relative w-16 h-16">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-roseGold"
              style={{ margin: i * 5 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2 - i * 0.2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center text-xl">🎂</div>
        </div>
        <p className="font-playfair text-secondary text-sm italic">Crafting your experience…</p>
      </motion.div>
    </div>
  )
}
