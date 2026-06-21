import { motion } from 'framer-motion'

/**
 * Button — reusable luxury button component
 * variant: 'primary' | 'outline' | 'ghost' | 'gradient'
 */
export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  className= '',
  loading  = false,
  disabled = false,
  onClick,
  type     = 'button',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-inter font-semibold tracking-wide rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  const variants = {
    primary:  'bg-secondary text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    outline:  'border-2 border-secondary text-secondary hover:bg-secondary/5',
    ghost:    'text-secondary hover:bg-secondary/10',
    gradient: 'gradient-rose text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </motion.button>
  )
}
