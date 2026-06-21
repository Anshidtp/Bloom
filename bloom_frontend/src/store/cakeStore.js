import { create } from 'zustand'
import { calculatePrice } from '../utils/priceCalculator.js'

/**
 * cakeStore — tracks every choice in the Custom Cake designer.
 * The 3D viewer reads from this store to update colours/size.
 */
export const useCakeStore = create((set, get) => ({
  // ── Selections ────────────────────────────────────────
  flavor:  'Vanilla',    // Vanilla | Chocolate | Strawberry | RedVelvet | BlackForest
  design:  'Minimal',    // Minimal | Floral | Birthday | Cartoon | LuxuryGold | Wedding
  weight:  '1kg',        // 500g | 1kg | 2kg | 3kg
  addOns:  [],           // array of add-on keys
  message: '',           // personalised cake message
  tiers:   2,            // 1 | 2 | 3  (derived from weight)

  // ── Setters ───────────────────────────────────────────
  setFlavor:  (flavor)  => set({ flavor }),
  setDesign:  (design)  => set({ design }),
  setMessage: (message) => set({ message }),

  setWeight: (weight) => {
    const tierMap = { '500g': 1, '1kg': 2, '2kg': 2, '3kg': 3 }
    set({ weight, tiers: tierMap[weight] ?? 2 })
  },

  toggleAddOn: (key) =>
    set((s) => ({
      addOns: s.addOns.includes(key)
        ? s.addOns.filter((a) => a !== key)
        : [...s.addOns, key],
    })),

  // ── Derived: live price ────────────────────────────────
  livePrice: () => {
    const { flavor, weight, addOns } = get()
    return calculatePrice({ flavor, weight, addOns })
  },

  // ── Reset ─────────────────────────────────────────────
  reset: () =>
    set({ flavor: 'Vanilla', design: 'Minimal', weight: '1kg', addOns: [], message: '', tiers: 2 }),
}))
