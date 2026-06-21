import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition   from '../../components/animations/PageTransition.jsx'
import FadeUp           from '../../components/animations/FadeUp.jsx'
import SlideIn          from '../../components/animations/SlideIn.jsx'
import SectionHeading   from '../../components/common/SectionHeading/SectionHeading.jsx'
import { COLLECTIONS, TESTIMONIALS, WHY_US } from '../../utils/constants.js'
import { formatINR }    from '../../utils/formatter.js'

const CakeScene = lazy(() => import('../../components/three/CakeScene/CakeScene.jsx'))

// ── Hero ──────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-bl from-cream via-cream/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-roseGold/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[80px] animate-pulse" />
      </div>

      <div className="container-max mx-auto px-5 md:px-16 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="space-y-7 z-10">
          <SlideIn direction="left" delay={0.1}>
            <p className="label-caps text-roseGold">Premium Artisan Confectionery</p>
          </SlideIn>

          <SlideIn direction="left" delay={0.2}>
            <h1 className="heading-xl text-cocoa leading-[1.1]">
              Every Celebration
              <br />
              Deserves a{' '}
              <span className="text-gradient-gold italic font-playfair">Masterpiece</span>
            </h1>
          </SlideIn>

          <SlideIn direction="left" delay={0.3}>
            <p className="text-base text-cocoa/60 font-inter leading-relaxed max-w-md">
              Handcrafting luxury experiences through the art of fine confectionery.
              Each layer tells a story of passion, precision, and the finest ingredients.
            </p>
          </SlideIn>

          <SlideIn direction="left" delay={0.4}>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/custom-cake" className="btn-primary">
                Create Your Cake
              </Link>
              <Link to="/collections" className="btn-outline">
                Explore Collection
              </Link>
            </div>
          </SlideIn>

          {/* Trust pills */}
          <SlideIn direction="left" delay={0.5}>
            <div className="flex flex-wrap gap-3 pt-4">
              {['500+ Custom Cakes', 'Same-Day Delivery', '100% Fresh Baked'].map((t) => (
                <span key={t} className="glass-card px-4 py-2 rounded-full text-xs font-inter font-medium text-secondary border border-secondary/20">
                  ✦ {t}
                </span>
              ))}
            </div>
          </SlideIn>
        </div>

        {/* Right — 3D cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="relative h-[480px] lg:h-[580px]"
        >
          {/* Glow blob behind canvas */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-roseGold/10 to-transparent rounded-full blur-3xl" />
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl animate-float">🎂</span>
            </div>
          }>
            <CakeScene interactive={true} />
          </Suspense>

          {/* Floating label */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 left-4 glass-card px-4 py-2 rounded-full border border-white/40 shadow-sm"
          >
            <span className="text-xs font-inter font-semibold text-secondary flex items-center gap-1.5">
              ✨ Real-time 3D Preview
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-12 right-4 glass-card px-4 py-2 rounded-full border border-white/40 shadow-sm"
          >
            <span className="text-xs font-inter font-semibold text-roseGold">🎨 Fully Customisable</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cocoa/30"
      >
        <span className="text-[10px] font-inter tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border-2 border-cocoa/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-roseGold rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

// ── Featured Collections ──────────────────────────────────
function FeaturedCollections() {
  return (
    <section className="section-pad bg-surface-container/30">
      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="Our Signature Range"
          title="Featured Collections"
          subtitle="From intimate celebrations to grand affairs — we craft every cake with equal devotion."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.slice(0, 3).map((col, i) => (
            <FadeUp key={col.id} delay={i * 0.1}>
              <Link to="/collections" className="block group relative overflow-hidden rounded-3xl card-hover shadow-chocolate">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/20 to-transparent" />
                {/* Tag */}
                {col.tag && (
                  <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full">
                    <span className="text-[10px] font-inter font-semibold text-secondary">{col.tag}</span>
                  </div>
                )}
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="font-playfair text-2xl font-semibold text-cream mb-1">{col.name}</h3>
                  <p className="text-sm text-cream/70 font-inter mb-3">{col.tagline}</p>
                  <span className="label-caps text-gold/80">Starting from {formatINR(col.startingPrice)}</span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.3}>
          <div className="text-center mt-10">
            <Link to="/collections" className="btn-outline">View All Collections</Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Why Choose Us ─────────────────────────────────────────
function WhyChooseUs() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-roseGold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="The Artisan Difference"
          title="Why Families Choose Us"
          subtitle="More than a bakery — we are storytellers who craft your most cherished memories in sugar and cream."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.1}>
              <div className="glass-card p-8 rounded-3xl text-center group hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-playfair text-lg font-semibold text-secondary mb-3">{item.title}</h3>
                <p className="text-sm text-cocoa/60 font-inter leading-relaxed">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials carousel ─────────────────────────────────
function Testimonials() {
  return (
    <section className="section-pad bg-gradient-to-br from-chocolate to-cocoa relative overflow-hidden">
      {/* Gold dust */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="Customer Memories"
          title="Stories That Sweeten Us"
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.id} delay={i * 0.1}>
              <div className="glass-dark p-6 rounded-2xl h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-cream/80 font-inter leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full gradient-rose flex items-center justify-center text-xs font-bold text-white font-inter">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-cream font-inter">{t.name}</p>
                    <p className="text-[11px] text-cream/50 font-inter">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="section-pad">
      <div className="container-max mx-auto">
        <FadeUp>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-secondary py-20 px-8 md:px-16 text-center">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 space-y-5">
              <p className="label-caps text-roseGold/80">Design Your Dream</p>
              <h2 className="heading-lg text-cream max-w-2xl mx-auto">
                Have a specific vision in mind?
              </h2>
              <p className="text-base text-cream/70 font-inter max-w-xl mx-auto">
                Connect with our head pastry chef to create a completely unique flavour profile and aesthetic.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Link to="/custom-cake" className="bg-cream text-secondary font-inter font-semibold px-8 py-4 rounded-xl hover:bg-white transition-all hover:scale-105 active:scale-95">
                  Start Designing
                </Link>
                <Link to="/contact" className="border-2 border-cream/40 text-cream font-inter font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all active:scale-95">
                  Schedule a Tasting
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Home page ─────────────────────────────────────────────
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <FeaturedCollections />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </PageTransition>
  )
}
