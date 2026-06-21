import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../../components/animations/PageTransition.jsx'
import FadeUp         from '../../components/animations/FadeUp.jsx'
import SectionHeading from '../../components/common/SectionHeading/SectionHeading.jsx'
import { COLLECTIONS } from '../../utils/constants.js'
import { formatINR }   from '../../utils/formatter.js'

const FILTERS = ['All', 'Birthday', 'Wedding', 'Anniversary', 'Kids', 'Luxury', 'Corporate']
const SORT_OPTIONS = ['Popular', 'Price: Low to High', 'Price: High to Low']

export default function Collections() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy]             = useState('Popular')
  const [favorites, setFavorites]       = useState(new Set())

  const toggleFav = (id) =>
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const filtered = COLLECTIONS
    .filter((c) => activeFilter === 'All' || c.name === activeFilter)
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High')  return a.startingPrice - b.startingPrice
      if (sortBy === 'Price: High to Low')  return b.startingPrice - a.startingPrice
      return 0
    })

  return (
    <PageTransition>
      {/* Hero banner */}
      <div className="relative pt-32 pb-16 px-5 md:px-16 bg-gradient-to-br from-cream to-surface-container overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-roseGold/10 rounded-full blur-[80px]" />
        <div className="container-max mx-auto">
          <FadeUp>
            <p className="label-caps text-roseGold mb-3">Handcrafted with Love</p>
            <h1 className="heading-xl text-cocoa mb-4">Our Collections</h1>
            <p className="text-base text-cocoa/60 font-inter max-w-xl leading-relaxed">
              Browse our curated range of signature cakes. Every design can be personalised to your vision.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-max mx-auto">
          {/* Filter + Sort bar */}
          <FadeUp>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs font-inter font-semibold transition-all ${
                      activeFilter === f
                        ? 'bg-secondary text-white shadow-md'
                        : 'glass-card text-cocoa/60 border border-outline-variant hover:text-secondary hover:border-secondary/50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-inter bg-white/60 border border-outline-variant rounded-lg px-3 py-2 text-cocoa focus:outline-none focus:border-secondary"
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </FadeUp>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((col, i) => (
                <motion.div
                  key={col.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <CollectionCard
                    col={col}
                    isFav={favorites.has(col.id)}
                    onFav={() => toggleFav(col.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <span className="text-5xl">🎂</span>
              <p className="font-playfair text-xl text-secondary mt-4">No cakes found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

function CollectionCard({ col, isFav, onFav }) {
  const [tilted, setTilted] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x    = ((e.clientY - rect.top)  / rect.height - 0.5) * 12
    const y    = ((e.clientX - rect.left) / rect.width  - 0.5) * -12
    setTilted({ x, y })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilted({ x: 0, y: 0 })}
      style={{ rotateX: tilted.x, rotateY: tilted.y, transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="group relative overflow-hidden rounded-3xl shadow-chocolate cursor-pointer bg-white"
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden relative">
        <img
          src={col.image}
          alt={col.name}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        {/* Favourite */}
        <button
          onClick={(e) => { e.preventDefault(); onFav() }}
          className="absolute top-4 left-4 w-9 h-9 glass-card rounded-full flex items-center justify-center border border-white/30 shadow hover:scale-110 transition-all"
          aria-label="Toggle favourite"
        >
          <span className={`text-base ${isFav ? 'text-roseGold' : 'text-cocoa/30'}`}>
            {isFav ? '♥' : '♡'}
          </span>
        </button>
        {/* Tag */}
        {col.tag && (
          <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full">
            <span className="text-[10px] font-inter font-semibold text-secondary">{col.tag}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-playfair text-xl font-semibold text-secondary mb-1">{col.name} Cakes</h3>
        <p className="text-sm text-cocoa/55 font-inter mb-4 leading-relaxed">{col.tagline}</p>
        <div className="flex items-center justify-between">
          <span className="label-caps text-gold">from {formatINR(col.startingPrice)}</span>
          <Link
            to="/custom-cake"
            className="text-xs font-inter font-semibold text-secondary border border-secondary/30 px-4 py-2 rounded-full hover:bg-secondary hover:text-white transition-all"
          >
            Customise →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
