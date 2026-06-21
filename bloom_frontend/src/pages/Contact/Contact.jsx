import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../../components/animations/PageTransition.jsx'
import FadeUp         from '../../components/animations/FadeUp.jsx'
import SlideIn        from '../../components/animations/SlideIn.jsx'
import SectionHeading from '../../components/common/SectionHeading/SectionHeading.jsx'
import Button         from '../../components/common/Button/Button.jsx'
import { WHATSAPP_NUMBER } from '../../utils/constants.js'

const CONTACT_INFO = [
  {
    icon: '📍',
    title: 'Our Studio',
    lines: ['12 Baker's Lane, MG Road', 'Kozhikode, Kerala 673001'],
  },
  {
    icon: '📞',
    title: 'Phone & WhatsApp',
    lines: ['+91 98765 43210', 'Mon–Sat, 9 AM – 7 PM'],
  },
  {
    icon: '📸',
    title: 'Instagram',
    lines: ['@artisanbloom.in', 'Follow for daily creations'],
  },
  {
    icon: '⏰',
    title: 'Working Hours',
    lines: ['Mon–Sat: 9:00 AM – 7:00 PM', 'Sunday: 10:00 AM – 4:00 PM'],
  },
]

const FAQ = [
  {
    q: 'How early should I place my custom cake order?',
    a: 'We recommend placing orders at least 48–72 hours in advance for standard designs. For elaborate wedding or luxury cakes, please allow 5–7 days.',
  },
  {
    q: 'Can I change my order after placing it?',
    a: 'Minor changes (flavour, message) are accepted up to 24 hours before delivery. Design changes may not be possible after baking begins.',
  },
  {
    q: 'Do you offer eggless or vegan options?',
    a: 'Yes! All our cakes can be made eggless. We also offer vegan variants using plant-based butter and dairy alternatives — just mention it in special instructions.',
  },
  {
    q: 'What areas do you deliver to?',
    a: 'We currently deliver within a 30 km radius of Kozhikode. For outstation orders, please contact us to arrange courier-safe packaging.',
  },
  {
    q: 'Is there a minimum order value?',
    a: 'Our minimum order is ₹800 (500g cake). Delivery is free for orders above ₹2,000.',
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="border border-outline-variant/30 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left glass-card hover:bg-white/80 transition-colors"
      >
        <span className="font-inter font-semibold text-sm text-cocoa pr-4">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-roseGold text-xl flex-shrink-0 font-light"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm font-inter text-cocoa/60 leading-relaxed bg-white/30">
          {item.a}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', mobile: '', message: '', sent: false, sending: false })

  function handleChange(e) {
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formState.name || !formState.mobile) return
    setFormState((p) => ({ ...p, sending: true }))
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200))
    setFormState((p) => ({ ...p, sending: false, sent: true }))
  }

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I'd like to enquire about a custom cake from Artisan Bloom.')}`

  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-5 md:px-16 overflow-hidden bg-gradient-to-br from-cream to-surface-container">
        <div className="absolute top-0 right-0 w-80 h-80 bg-roseGold/8 rounded-full blur-[80px]" />
        <div className="container-max mx-auto">
          <FadeUp>
            <p className="label-caps text-roseGold mb-3">Get In Touch</p>
            <h1 className="heading-xl text-cocoa mb-4">Contact Us</h1>
            <p className="text-base text-cocoa/60 font-inter max-w-xl leading-relaxed">
              Have a vision? A question? Or simply want to say hello? We'd love to hear from you.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-max mx-auto">

          {/* Contact cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {CONTACT_INFO.map((info, i) => (
              <FadeUp key={info.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(74,44,42,0.14)' }}
                  className="glass-card rounded-3xl p-7 border border-outline-variant/20 h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-2xl mb-5 shadow-sm">
                    {info.icon}
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-secondary mb-3">{info.title}</h3>
                  {info.lines.map((line) => (
                    <p key={line} className="text-sm font-inter text-cocoa/60 leading-relaxed">{line}</p>
                  ))}
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Contact form */}
            <SlideIn direction="left">
              <div className="glass-card rounded-3xl p-10 border border-outline-variant/20 shadow-chocolate">
                <h2 className="font-playfair text-2xl font-semibold text-secondary mb-2">Send Us a Message</h2>
                <p className="text-sm text-cocoa/50 font-inter mb-8">We usually reply within 2–4 hours during working hours.</p>

                {formState.sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <span className="text-6xl block mb-4">🎉</span>
                    <h3 className="font-playfair text-xl text-secondary mb-2">Message Received!</h3>
                    <p className="text-sm text-cocoa/55 font-inter">
                      Thank you, {formState.name}! We'll reach out to you shortly.
                    </p>
                    <button
                      onClick={() => setFormState({ name: '', mobile: '', message: '', sent: false, sending: false })}
                      className="mt-6 btn-outline text-sm"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="label-caps text-cocoa/45">Your Name <span className="text-roseGold">*</span></label>
                        <input
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          placeholder="Priya Menon"
                          className="input-luxury border-b border-outline-variant"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="label-caps text-cocoa/45">Mobile <span className="text-roseGold">*</span></label>
                        <input
                          name="mobile"
                          value={formState.mobile}
                          onChange={handleChange}
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="input-luxury border-b border-outline-variant"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="label-caps text-cocoa/45">Your Message</label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your celebration, preferred flavors, or any questions…"
                        className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-3 text-sm font-inter text-cocoa placeholder:text-cocoa/30 resize-none focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all"
                      />
                    </div>
                    <Button type="submit" variant="primary" size="lg" loading={formState.sending} className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </SlideIn>

            {/* WhatsApp + Map placeholder */}
            <SlideIn direction="right">
              <div className="space-y-6">
                {/* WhatsApp CTA */}
                <motion.a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-5 p-6 rounded-3xl border-2 border-green-500/30 bg-green-50/60 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <div>
                    <p className="font-playfair text-lg font-semibold text-green-800 mb-1">Chat on WhatsApp</p>
                    <p className="text-sm text-green-700/70 font-inter">Fastest response — usually within minutes!</p>
                  </div>
                  <svg className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>

                {/* Instagram CTA */}
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-5 p-6 rounded-3xl border-2 border-roseGold/30 bg-roseGold/5 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-2xl gradient-rose flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    📸
                  </div>
                  <div>
                    <p className="font-playfair text-lg font-semibold text-secondary mb-1">@artisanbloom.in</p>
                    <p className="text-sm text-cocoa/55 font-inter">See our daily creations &amp; behind-the-scenes</p>
                  </div>
                  <svg className="w-5 h-5 text-roseGold ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>

                {/* Map placeholder */}
                <div className="rounded-3xl overflow-hidden border border-outline-variant/20 shadow-sm h-60 bg-gradient-to-br from-cream to-surface-container flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-5xl block mb-3">🗺️</span>
                    <p className="font-playfair text-secondary font-semibold">Baker's Lane Studio</p>
                    <p className="text-xs text-cocoa/50 font-inter mt-1">12 Baker's Lane, MG Road, Kozhikode</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs text-roseGold font-inter font-semibold hover:underline"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Common Questions"
              title="Frequently Asked"
              subtitle="Everything you need to know before placing your order."
            />
            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <FAQItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
