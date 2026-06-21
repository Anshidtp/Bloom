import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useAnimation.js'

/**
 * SlideIn — scroll-triggered slide from left or right.
 */
export default function SlideIn({
  children,
  direction= 'left',  // 'left' | 'right'
  delay    = 0,
  duration = 0.6,
  className= '',
}) {
  const { ref, inView } = useInView()
  const x = direction === 'left' ? -40 : 40

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
