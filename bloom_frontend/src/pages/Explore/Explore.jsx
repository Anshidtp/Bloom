import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../../components/animations/PageTransition.jsx'
import FadeUp         from '../../components/animations/FadeUp.jsx'
import SectionHeading from '../../components/common/SectionHeading/SectionHeading.jsx'
import { formatINR }  from '../../utils/formatter.js'

// ── Explore gallery data ───────────────────────────────────
const GALLERY = [
  { id: 1,  title: 'Rosewood Dream',      mood: 'Romantic', flavor: 'Vanilla',     price: 2800, size: 'large',  image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80' },
  { id: 2,  title: 'Midnight Velvet',     mood: 'Luxury',   flavor: 'RedVelvet',   price: 3600, size: 'small',  image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80' },
  { id: 3,  title: 'Golden Hour',         mood: 'Wedding',  flavor: 'Vanilla',     price: 5200, size: 'large',  image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&q=80' },
  { id: 4,  title: 'Sakura Bloom',        mood: 'Floral',   flavor: 'Strawberry',  price: 1900, size: 'small',  image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&q=80' },
  { id: 5,  title: 'Dark Forest',         mood: 'Luxury',   flavor: 'BlackForest', price: 3200, size: 'medium', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80' },
  { id: 6,  title: 'Birthday Carnival',   mood: 'Fun',      flavor: 'Chocolate',   price: 1500, size: 'small',  image: 'https://images.unsplash.com/photo-1547634928-abf27c901e2e?w=600&q=80' },
  { id: 7,  title: 'Gilded Elegance',     mood: 'Wedding',  flavor: 'Vanilla',     price: 6800, size: 'large',  image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=700&q=80' },
  { id: 8,  title: 'Chocolate Obsession', mood: 'Romantic', flavor: 'Chocolate',   price: 2400, size: 'medium', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80' },
  { id: 9,  title: 'Pastel Garden',       mood: 'Floral',   flavor: 'Strawberry',  price: 2100, size: 'medium', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=700&q=80' },
  { id: 10, title: 'Sunset Tier',         mood: 'Fun',      flavor: 'RedVelvet',   price: 1800, size: 'small',  image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&q=80' },
  { id: 11, title: 'Ivory Lace',          mood: 'Wedding',  flavor: 'Vanilla',     price: 4400, size: 'large',  image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=700&q=80' },
  { id: 12, title: 'Forest Berry',        mood: 'Luxury',   flavor: 'BlackForest', price: 3900, size: 'medium', image: 'https://images.unsplash.com/photo-1547634928-abf27c901e2e?w=700&q=80' },
]

const MOODS   = ['All', 'Romantic', 'Luxury', 'Wedding', 'Floral', 'Fun']
const FLAVORS = ['All', 'Vanilla', 'Chocolate', 'Strawberry', 'RedVelvet', 'BlackForest']

// Map size to grid-span classes
const SIZE_CLASS = {
  small:  'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-1 md:col-span-1',
  large:  'col-span-1 md:col-span-2',
}

export default function Explore() {
  const [search,      setSearch]      = useState('')
  const [activeMood,  setActiveMood]  = useState('All')
  const [activeFlavor,setActiveFlavor]= useState('All')
  const [hoveredId,   setHoveredId]   = useState(null)
  const [favorites,   setFavorites]   = useState(new Set())

  const toggleFav = (id) =>
    setFavorites((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })

  const results = useMemo(() => GALLERY.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.flavor.toLowerCase().includes(search.toLowerCase())
    const matchMood   = activeMood   === 'All' || item.mood   === activeMood
    const matchFlavor = activeFlavor === 'All' || item.flavor === activeFlavor
    return matchSearch && matchMood && matchFlavor
  }), [search, activeMood, activeFlavor])

  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-5 md:px-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-cream/60 to-transparent" />
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-gold/8 rounded-full blur-[80px]" />
        </div>
        <div className="container-max mx-auto">
          <FadeUp>
            <p className="label-caps text-roseGold mb-3">Get Inspired</p>
            <h1 className="heading-xl text-cocoa mb-5">
              Explore the <span className="text-gradient-gold italic">Gallery</span>
            </h1>
            <p className="text-base text-cocoa/60 font-inter max-w-xl leading-relaxed mb-8">
              Browse our portfolio of artisan creations. Find your perfect style and customise it for your celebration.
            </p>

            {/* Search bar */}
            <div className="relative max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoa/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or flavor…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/70 border border-outline-variant rounded-2xl text-sm font-inter
                           text-cocoa placeholder:text-cocoa/30 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-cocoa/30 hover:text-secondary">✕</button>
              )}
            </div>
          </FadeUp>
        </div>
      </div>

      <div className="section-pad pt-0">
        <div className="container-max mx-auto">
          {/* Filter chips */}
          <FadeUp>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Mood */}
              <div>
                <p className="label-caps text-cocoa/40 mb-2">Mood</p>
                <div className="flex flex-wrap gap-2">
                  {MOODS.map((m) => (
                    <button key={m} onClick={() => setActiveMood(m)}
                      className={`px-4 py-1.5 rounded-full text-xs font-inter font-semibold transition-all ${
                        activeMood === m ? 'bg-roseGold text-white shadow-sm' : 'glass-card text-cocoa/60 border border-outline-variant hover:border-roseGold/50'
                      }`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              {/* Flavor */}
              <div>
                <p className="label-caps text-cocoa/40 mb-2">Flavor</p>
                <div className="flex flex-wrap gap-2">
                  {FLAVORS.map((f) => (
                    <button key={f} onClick={() => setActiveFlavor(f)}
                      className={`px-4 py-1.5 rounded-full text-xs font-inter font-semibold transition-all ${
                        activeFlavor === f ? 'bg-gold text-cocoa shadow-sm' : 'glass-card text-cocoa/60 border border-outline-variant hover:border-gold/50'
                      }`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Results count */}
          <p className="text-xs text-cocoa/40 font-inter mb-6">
            Showing <strong className="text-secondary">{results.length}</strong> creations
          </p>

          {/* Masonry-style grid */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative overflow-hidden rounded-2xl shadow-chocolate cursor-pointer ${
                    item.size === 'large' ? 'sm:col-span-2' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`overflow-hidden ${item.size === 'large' ? 'aspect-[16/9]' : 'aspect-square'}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <motion.div
                    animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/30 to-transparent flex flex-col justify-end p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="label-caps text-gold/80 mb-1">{item.mood}</p>
                        <h3 className="font-playfair text-lg font-semibold text-cream mb-1">{item.title}</h3>
                        <p className="text-xs text-cream/60 font-inter">{item.flavor} · from {formatINR(item.price)}</p>
                      </div>
                      <div className="flex flex-col gap-2 ml-3">
                        <button
                          onClick={() => toggleFav(item.id)}
                          className="w-9 h-9 glass-card rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-all"
                        >
                          <span className={`text-sm ${favorites.has(item.id) ? 'text-roseGold' : 'text-white/60'}`}>
                            {favorites.has(item.id) ? '♥' : '♡'}
                          </span>
                        </button>
                      </div>
                    </div>
                    <Link
                      to="/custom-cake"
                      className="mt-4 inline-flex items-center gap-2 gradient-rose text-white text-xs font-inter font-semibold px-5 py-2.5 rounded-xl self-start hover:opacity-90 transition-opacity"
                    >
                      Recreate This →
                    </Link>
                  </motion.div>

                  {/* Mood badge (always visible) */}
                  <div className="absolute top-3 right-3">
                    <span className="glass-card text-[9px] font-inter font-semibold text-secondary px-2.5 py-1 rounded-full border border-white/30">
                      {item.mood}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <span className="text-6xl">🎂</span>
              <p className="font-playfair text-xl text-secondary mt-5 mb-2">No matches found</p>
              <p className="text-sm text-cocoa/50 font-inter">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setActiveMood('All'); setActiveFlavor('All') }}
                className="mt-5 btn-outline text-sm"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}

          {/* CTA */}
          {results.length > 0 && (
            <FadeUp>
              <div className="mt-16 text-center glass-card rounded-3xl p-12 border border-outline-variant/20">
                <span className="text-5xl">✨</span>
                <h3 className="heading-md text-secondary mt-4 mb-3">Don't see exactly what you imagined?</h3>
                <p className="text-sm text-cocoa/60 font-inter mb-6">Use our 3D designer to craft it from scratch.</p>
                <Link to="/custom-cake" className="btn-primary">Open Cake Designer</Link>
              </div>
            </FadeUp>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
