import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { motion } from 'framer-motion'
import PageTransition from '../../components/animations/PageTransition.jsx'
import FadeUp         from '../../components/animations/FadeUp.jsx'
import Button         from '../../components/common/Button/Button.jsx'
import { useCartStore } from '../../store/cartStore.js'
import { formatINR }    from '../../utils/priceCalculator.js'
import { generateOrderId } from '../../utils/priceCalculator.js'
import { orderService }   from '../../services/orderService.js'

// ── Zod schema ────────────────────────────────────────────
const schema = z.object({
  fullName:     z.string().min(2, 'Please enter your full name'),
  mobile:       z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email:        z.string().email('Enter a valid email').optional().or(z.literal('')),
  address:      z.string().min(10, 'Please enter a complete delivery address'),
  deliveryDate: z.string().min(1, 'Please select a delivery date'),
  timeSlot:     z.string().min(1, 'Please select a preferred time'),
  instructions: z.string().optional(),
})

// ── Input field wrapper ───────────────────────────────────
function FormField({ label, error, children, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="label-caps text-cocoa/50">
        {label}{required && <span className="text-roseGold ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400 font-inter mt-0.5">{error.message}</p>}
    </div>
  )
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCartStore()
  const [submitting, setSubmitting]   = useState(false)
  const total    = subtotal()
  const delivery = total > 2000 ? 0 : 149
  const grand    = total + delivery

  const { register, handleSubmit, formState: { errors } } = useForm()

  const TIME_SLOTS = [
    'Morning (09:00 – 12:00)',
    'Afternoon (13:00 – 16:00)',
    'Evening (17:00 – 20:00)',
  ]

  async function onSubmit(data) {
    setSubmitting(true)
    try {
      const orderId = generateOrderId()
      const orderPayload = {
        orderId,
        customerName: data.fullName,
        mobile:       data.mobile,
        email:        data.email,
        address:      data.address,
        deliveryDate: data.deliveryDate,
        timeSlot:     data.timeSlot,
        instructions: data.instructions,
        items,
        total: grand,
      }

      // Fire WhatsApp link
      const waLink = orderService.buildWhatsAppLink(orderPayload)
      window.open(waLink, '_blank')

      // Optionally POST to API (gracefully ignore errors)
      try { await orderService.placeOrder(orderPayload) } catch {}

      clearCart()
      navigate('/success', { state: { orderId } })
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <PageTransition>
      {/* Atmospheric blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cream/80 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-roseGold/8 rounded-full blur-[80px]" />
      </div>

      <div className="pt-28 pb-20 px-5 md:px-16 min-h-screen">
        <div className="container-max mx-auto">
          <FadeUp>
            <p className="label-caps text-roseGold mb-2">Almost There</p>
            <h1 className="heading-lg text-cocoa mb-2">Finalise Your Order</h1>
            <p className="text-base text-cocoa/55 font-inter italic mb-10">
              Just a few details away from your handcrafted masterpiece.
            </p>
          </FadeUp>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT — form fields */}
              <div className="lg:col-span-7 space-y-6">

                {/* Customer details */}
                <FadeUp delay={0.1}>
                  <div className="glass-card rounded-3xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">👤</span>
                      <h2 className="font-playfair text-xl font-semibold text-secondary">Customer Details</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Full Name" error={errors.fullName} required>
                        <input {...register('fullName', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                          placeholder="E.g. Priya Menon"
                          className="input-luxury border-b border-outline-variant" />
                      </FormField>
                      <FormField label="Mobile Number" error={errors.mobile} required>
                        <input {...register('mobile', { required: 'Mobile is required', pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid number' } })}
                          placeholder="+91 98765 43210" type="tel"
                          className="input-luxury border-b border-outline-variant" />
                      </FormField>
                      <div className="sm:col-span-2">
                        <FormField label="Email Address (optional)" error={errors.email}>
                          <input {...register('email')} placeholder="you@example.com" type="email"
                            className="input-luxury border-b border-outline-variant" />
                        </FormField>
                      </div>
                    </div>
                  </div>
                </FadeUp>

                {/* Delivery details */}
                <FadeUp delay={0.15}>
                  <div className="glass-card rounded-3xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📅</span>
                      <h2 className="font-playfair text-xl font-semibold text-secondary">Delivery Details</h2>
                    </div>
                    <div className="sm:col-span-2">
                      <FormField label="Delivery Address" error={errors.address} required>
                        <textarea {...register('address', { required: 'Address is required', minLength: { value: 10, message: 'Please be more specific' } })}
                          placeholder="House/Flat no., Street, Landmark, City, Pincode"
                          rows={3}
                          className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-3 text-sm font-inter text-cocoa placeholder:text-cocoa/30 resize-none focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all" />
                      </FormField>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Preferred Date" error={errors.deliveryDate} required>
                        <input {...register('deliveryDate', { required: 'Date is required' })}
                          type="date" min={today}
                          className="input-luxury border-b border-outline-variant cursor-pointer" />
                      </FormField>
                      <FormField label="Preferred Time" error={errors.timeSlot} required>
                        <select {...register('timeSlot', { required: 'Time slot is required' })}
                          className="input-luxury border-b border-outline-variant cursor-pointer appearance-none">
                          <option value="">Select a slot</option>
                          {TIME_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </FormField>
                    </div>
                    <FormField label="Special Instructions (optional)" error={errors.instructions}>
                      <textarea {...register('instructions')}
                        placeholder="Allergies, gate code, candle preferences…"
                        rows={2}
                        className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-3 text-sm font-inter text-cocoa placeholder:text-cocoa/30 resize-none focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all" />
                    </FormField>
                  </div>
                </FadeUp>
              </div>

              {/* RIGHT — order summary */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <FadeUp delay={0.2}>
                  <div className="glass-card rounded-3xl p-8 border border-outline-variant/20 shadow-gold relative overflow-hidden">
                    {/* Decorative cake icon */}
                    <div className="absolute -right-8 -bottom-8 opacity-5 text-[120px] rotate-12 select-none pointer-events-none">🎂</div>

                    <h2 className="font-playfair text-xl font-semibold text-secondary mb-6 border-b border-outline-variant/20 pb-4">
                      Your Sweet Creation
                    </h2>

                    {/* Items */}
                    <div className="space-y-4 mb-6">
                      {items.length === 0 ? (
                        <p className="text-sm text-cocoa/40 font-inter italic">No items in cart</p>
                      ) : items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-2xl flex-shrink-0">🎂</div>
                          <div className="flex-1">
                            <p className="text-sm font-inter font-semibold text-secondary">{item.name}</p>
                            <p className="text-xs text-cocoa/50 font-inter">{item.weight} · {item.design}</p>
                            {item.addOns?.length > 0 && (
                              <p className="text-xs text-cocoa/40 font-inter">+ {item.addOns.join(', ')}</p>
                            )}
                          </div>
                          <span className="text-sm font-inter font-semibold text-secondary">{formatINR(item.totalPrice)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 pb-4 mb-4 border-t border-b border-outline-variant/20 pt-4">
                      <div className="flex justify-between text-xs font-inter text-cocoa/50">
                        <span>Subtotal</span><span>{formatINR(total)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-inter text-cocoa/50">
                        <span>Delivery</span>
                        <span className={delivery === 0 ? 'text-green-600' : ''}>{delivery === 0 ? 'FREE' : formatINR(delivery)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-inter text-cocoa/50">
                        <span>Packaging</span><span className="text-green-600">FREE</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <p className="label-caps text-cocoa/40">Total Amount</p>
                        <p className="text-[10px] text-cocoa/30 font-inter italic">Incl. taxes &amp; luxury packaging</p>
                      </div>
                      <span className="font-playfair text-2xl font-bold text-gradient-gold">{formatINR(grand)}</span>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      loading={submitting}
                      className="w-full text-base"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                      </svg>
                      Confirm Order via WhatsApp
                    </Button>

                    <p className="text-center text-[10px] text-cocoa/35 font-inter mt-4 leading-relaxed px-4">
                      You'll be redirected to WhatsApp to finalise details with our head pâtissier.
                    </p>

                    {/* Trust badges */}
                    <div className="flex justify-around mt-6 pt-4 border-t border-outline-variant/20 opacity-50 hover:opacity-100 transition-opacity">
                      {[
                        { icon: '✅', label: 'Premium Grade' },
                        { icon: '🌿', label: 'Pure Ingredients' },
                        { icon: '⏱', label: 'Timely Delivery' },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                          <span className="text-lg">{icon}</span>
                          <span className="text-[8px] font-inter font-bold text-cocoa/50 uppercase tracking-widest text-center">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}
