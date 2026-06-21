import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useAnimation.js'

/**
 * FadeUp — wraps children in a scroll-triggered fade-up animation.
 */
export default function FadeUp({
  children,
  delay    = 0,
  duration = 0.6,
  distance = 28,
  className= '',
}) {
  const { ref, inView } = useInView()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
