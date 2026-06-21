import { motion } from 'framer-motion'
import { useInView } from '../../../hooks/useAnimation.js'

/**
 * SectionHeading — animated section title with decorative underline.
 */
export default function SectionHeading({ eyebrow, title, subtitle, center = true, light = false }) {
  const { ref, inView } = useInView()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <p className={`label-caps mb-3 ${light ? 'text-roseGold/80' : 'text-roseGold'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`heading-lg ${light ? 'text-cream' : 'text-cocoa'}`}>
        {title}
      </h2>
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={`mt-4 h-0.5 w-20 gradient-rose rounded-full origin-left ${center ? 'mx-auto' : ''}`}
      />
      {subtitle && (
        <p className={`mt-5 text-base leading-relaxed max-w-2xl font-inter ${
          center ? 'mx-auto' : ''
        } ${light ? 'text-cream/70' : 'text-cocoa/60'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
