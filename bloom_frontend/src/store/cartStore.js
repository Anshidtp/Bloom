import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * cartStore — global shopping cart state
 *
 * Each cart item shape:
 * {
 *   id        : string  (unique cartItem id)
 *   name      : string
 *   flavor    : string
 *   design    : string
 *   weight    : string
 *   addOns    : string[]
 *   message   : string
 *   image     : string  (url or placeholder)
 *   basePrice : number
 *   totalPrice: number
 *   quantity  : number
 * }
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      // ── Open / close cart sidebar ─────────────────────
      openCart:  () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart:() => set((s) => ({ isCartOpen: !s.isCartOpen })),

      // ── Add item ─────────────────────────────────────
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }))
        } else {
          set((s) => ({ items: [...s.items, { ...item, quantity: 1 }] }))
        }
      },

      // ── Remove item ───────────────────────────────────
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      // ── Update quantity ───────────────────────────────
      updateQuantity: (id, qty) => {
        if (qty < 1) { get().removeItem(id); return }
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        }))
      },

      // ── Clear cart ────────────────────────────────────
      clearCart: () => set({ items: [] }),

      // ── Derived: total item count ─────────────────────
      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      // ── Derived: subtotal ─────────────────────────────
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0),
    }),
    { name: 'artisan-bloom-cart' }
  )
)
