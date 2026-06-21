import { FLAVORS, WEIGHTS, DESIGNS, ADD_ONS } from './constants.js'

/**
 * calculatePrice — returns a full price breakdown object
 * @param {{ flavor: string, weight: string, design: string, addOns: string[] }} config
 * @returns {{ base: number, flavorExtra: number, designExtra: number, addOnsTotal: number, total: number, breakdown: object[] }}
 */
export function calculatePrice({ flavor, weight, design, addOns = [] }) {
  const weightObj  = WEIGHTS.find((w) => w.key === weight)   || WEIGHTS[1]
  const flavorObj  = FLAVORS.find((f) => f.key === flavor)   || FLAVORS[0]
  const designObj  = DESIGNS.find((d) => d.key === design)   || DESIGNS[0]

  const base        = weightObj.price
  const flavorExtra = flavorObj.price
  const designExtra = designObj.price

  const addOnItems = ADD_ONS.filter((a) => addOns.includes(a.key))
  const addOnsTotal = addOnItems.reduce((sum, a) => sum + a.price, 0)

  const total = base + flavorExtra + designExtra + addOnsTotal

  const breakdown = [
    { label: `Cake Base (${weightObj.label})`,  amount: base },
    ...(flavorExtra > 0 ? [{ label: `Flavour: ${flavorObj.label}`, amount: flavorExtra }] : []),
    ...(designExtra > 0 ? [{ label: `Design: ${designObj.label}`,  amount: designExtra }] : []),
    ...addOnItems.map((a) => ({ label: a.label, amount: a.price })),
  ]

  return { base, flavorExtra, designExtra, addOnsTotal, total, breakdown }
}

/**
 * formatINR — formats a number as Indian Rupees
 */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * generateOrderId — creates a short readable order ID
 */
export function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const rand  = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `AB-${rand}`
}
