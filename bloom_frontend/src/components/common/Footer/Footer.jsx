import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  Discover:  [
    { to: '/collections', label: 'Collections'   },
    { to: '/explore',     label: 'Explore All'   },
    { to: '/custom-cake', label: 'Bespoke Cakes' },
  ],
  Company: [
    { to: '/contact',  label: 'Contact Us'      },
    { to: '/contact',  label: 'Our Story'       },
    { to: '/contact',  label: 'Sustainability'  },
  ],
  Legal: [
    { to: '/', label: 'Privacy Policy'   },
    { to: '/', label: 'Terms of Service' },
    { to: '/', label: 'Wholesale'        },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface-low border-t border-outline-variant/40">
      <div className="container-max mx-auto px-5 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-playfair text-2xl font-bold text-secondary">
              Artisan <span className="text-roseGold italic">Bloom</span>
            </Link>
            <p className="mt-4 text-sm text-cocoa/60 leading-relaxed max-w-xs font-inter">
              Crafting edible masterpieces with passion and precision since 2012.
              Every cake tells a story — yours.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {['Instagram', 'WhatsApp', 'Pinterest'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-9 h-9 glass-card rounded-full flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all"
                >
                  <span className="text-xs font-bold font-inter">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="label-caps text-secondary mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-cocoa/60 hover:text-secondary font-inter transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-cocoa/40 font-inter">
            © {new Date().getFullYear()} Artisan Bloom Confectionery. Crafted with passion.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="Your email for exclusive drops…"
              className="input-luxury border border-outline-variant rounded-lg px-4 py-2 text-sm flex-1 md:w-64"
            />
            <button type="submit" className="btn-primary !px-5 !py-2 text-sm rounded-lg">
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}
