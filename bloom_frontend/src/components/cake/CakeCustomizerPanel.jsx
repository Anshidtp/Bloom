import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../../store/cartStore.js'
import { useCakeStore } from '../../store/cakeStore.js'
import { calculatePrice } from '../../utils/priceCalculator.js'
import FlavorSelector  from './FlavorSelector.jsx'
import DesignSelector  from './DesignSelector.jsx'
import WeightSelector  from './WeightSelector.jsx'
import AddOnSelector   from './AddOnSelector.jsx'
import MessageInput    from './MessageInput.jsx'
import PriceSummary    from './PriceSummary.jsx'

export default function CakeCustomizerPanel() {
  const navigate   = useNavigate()
  const { addItem, openCart } = useCartStore()
  const store      = useCakeStore()

  function handleAddToCart() {
    const { flavor, weight, design, addOns, message, reset } = store
    const { total } = calculatePrice({ flavor, weight, design, addOns })

    const item = {
      id:         `cake-${Date.now()}`,
      name:       `${flavor} Cake`,
      flavor,
      weight,
      design,
      addOns,
      message,
      basePrice:  total,
      totalPrice: total,
    }

    addItem(item)
    openCart()
    reset()
  }

  const sections = [
    { component: <FlavorSelector />,  delay: 0    },
    { component: <DesignSelector />,  delay: 0.05 },
    { component: <WeightSelector />,  delay: 0.1  },
    { component: <AddOnSelector />,   delay: 0.15 },
    { component: <MessageInput />,    delay: 0.2  },
  ]

  return (
    <div className="space-y-8">
      {sections.map(({ component, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.5 }}
          className="p-6 rounded-2xl bg-white/40 border border-outline-variant/20 shadow-sm"
        >
          {component}
        </motion.div>
      ))}

      {/* Sticky price summary */}
      <PriceSummary onAddToCart={handleAddToCart} />
    </div>
  )
}
