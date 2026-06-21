// ── Flavor options ────────────────────────────────────────
export const FLAVORS = [
  { key: 'Vanilla',     label: 'Vanilla',      color: '#FFF8ED', border: '#ccc6bc', price: 0,   description: 'Classic Madagascar vanilla with cream frosting' },
  { key: 'Chocolate',   label: 'Dark Chocolate',color: '#3D1F1A', border: '#4A2C2A', price: 200, description: 'Rich single-origin dark chocolate ganache' },
  { key: 'Strawberry',  label: 'Strawberry',   color: '#F8C8DC', border: '#e8a0b8', price: 150, description: 'Fresh strawberry compote with rose cream' },
  { key: 'RedVelvet',   label: 'Red Velvet',   color: '#8B1A1A', border: '#6B1414', price: 250, description: 'Deep crimson velvet with cream cheese frosting' },
  { key: 'BlackForest', label: 'Black Forest', color: '#2C1A2E', border: '#4A2C2A', price: 300, description: 'Chocolate sponge with Morello cherry kirsch' },
]

// ── Design styles ─────────────────────────────────────────
export const DESIGNS = [
  { key: 'Minimal',    label: 'Minimal',     price: 0   },
  { key: 'Floral',     label: 'Floral',      price: 300 },
  { key: 'Birthday',   label: 'Birthday',    price: 200 },
  { key: 'Cartoon',    label: 'Cartoon',     price: 350 },
  { key: 'LuxuryGold', label: 'Luxury Gold', price: 500 },
  { key: 'Wedding',    label: 'Wedding',     price: 600 },
]

// ── Weight options ────────────────────────────────────────
export const WEIGHTS = [
  { key: '500g', label: '500g', price: 800  },
  { key: '1kg',  label: '1 kg', price: 1200 },
  { key: '2kg',  label: '2 kg', price: 1900 },
  { key: '3kg',  label: '3 kg', price: 2800 },
]

// ── Add-ons ───────────────────────────────────────────────
export const ADD_ONS = [
  { key: 'ferrero',   label: 'Ferrero Rocher',    price: 300, icon: '🍫' },
  { key: 'kitkat',    label: 'KitKat Layers',      price: 200, icon: '🍬' },
  { key: 'oreo',      label: 'Oreo Crush',         price: 150, icon: '🍪' },
  { key: 'fruits',    label: 'Fresh Fruits',        price: 250, icon: '🍓' },
  { key: 'macarons',  label: 'Assorted Macarons',  price: 500, icon: '🌸' },
  { key: 'cream',     label: 'Extra Cream Rosette', price: 100, icon: '🤍' },
  { key: 'candles',   label: 'Gold Candles',        price: 80,  icon: '✨' },
  { key: 'topper',    label: 'Name Topper',         price: 200, icon: '🎂' },
]

// ── Collections ───────────────────────────────────────────
export const COLLECTIONS = [
  {
    id: 1,
    slug: 'birthday',
    name: 'Birthday',
    tagline: 'Unforgettable moments, crafted in sugar.',
    startingPrice: 1200,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    tag: 'Bestseller',
  },
  {
    id: 2,
    slug: 'wedding',
    name: 'Wedding',
    tagline: 'Timeless elegance for your forever after.',
    startingPrice: 4500,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80',
    tag: 'Premium',
  },
  {
    id: 3,
    slug: 'anniversary',
    name: 'Anniversary',
    tagline: 'Celebrate every cherished milestone.',
    startingPrice: 2000,
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&q=80',
    tag: null,
  },
  {
    id: 4,
    slug: 'kids',
    name: 'Kids',
    tagline: 'Magical designs for little ones.',
    startingPrice: 900,
    image: 'https://images.unsplash.com/photo-1547634928-abf27c901e2e?w=600&q=80',
    tag: 'Fun',
  },
  {
    id: 5,
    slug: 'luxury',
    name: 'Luxury',
    tagline: 'Bespoke artistry for the elite palate.',
    startingPrice: 4500,
    image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&q=80',
    tag: 'Exclusive',
  },
  {
    id: 6,
    slug: 'corporate',
    name: 'Corporate',
    tagline: 'Branded elegance for business events.',
    startingPrice: 3000,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80',
    tag: null,
  },
]

// ── Testimonials ──────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Menon',
    role: 'Bride, 2024',
    rating: 5,
    text: 'The wedding cake was an absolute masterpiece. Every guest was in awe — the rose gold detailing matched our décor perfectly.',
    avatar: 'PM',
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    role: 'Corporate Client',
    rating: 5,
    text: 'Our brand cake was delivered on time and looked exactly as designed. The chocolate mousse interior was incredible.',
    avatar: 'RS',
  },
  {
    id: 3,
    name: 'Anya Krishnan',
    role: 'Regular Customer',
    rating: 5,
    text: 'I order birthday cakes every year from Artisan Bloom. The quality and creativity never disappoint. Truly premium.',
    avatar: 'AK',
  },
  {
    id: 4,
    name: 'Vikram Nair',
    role: 'Anniversary Celebration',
    rating: 5,
    text: 'Surprised my wife with a Black Forest cake with our wedding photo on top. She cried happy tears. Absolutely magical.',
    avatar: 'VN',
  },
]

// ── Why choose us ─────────────────────────────────────────
export const WHY_US = [
  { icon: '🌿', title: 'Handmade Fresh Daily',    desc: 'Baked from scratch on the day of delivery for peak freshness and flavour.' },
  { icon: '✨', title: 'Premium Ingredients',      desc: 'Madagascar vanilla, organic eggs, single-origin chocolate — never compromised.' },
  { icon: '🎨', title: 'Custom Designs',           desc: 'Your vision, our craft. Every cake is a unique edible work of art.' },
  { icon: '🚚', title: 'On-Time Delivery',         desc: 'White-glove concierge delivery ensures arrival in perfect condition.' },
]

// ── WhatsApp number (replace with real number) ────────────
export const WHATSAPP_NUMBER = '919876543210'
