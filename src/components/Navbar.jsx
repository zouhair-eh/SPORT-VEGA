import { Link, NavLink } from 'react-router-dom'
import { FaShoppingCart, FaTshirt, FaPhone, FaGlobe } from 'react-icons/fa'
import { useI18n } from '../i18n'

const navClass = ({ isActive }) =>
  `text-decoration-none px-2 py-1 rounded-3 ${isActive ? 'bg-white/10 text-white' : 'text-slate-200 hover:text-white'}`

export default function Navbar({ cartCount = 0 }) {
  const { lang, setLang, t } = useI18n()

  const languages = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ar', label: 'AR', flag: '🇲🇦' },
  ]

  return (
    <header className="sticky-top">
      <div className="bg-slate-950/70 border-b border-white/10 backdrop-blur-xl">
        <div className="container py-3 d-flex align-items-center justify-content-between gap-3">
          <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
            <div className="d-inline-grid place-items-center" style={{ width: 38, height: 38, borderRadius: 14, background: '#5b8cff', color: '#081022', fontWeight: 900 }}>
              VG
            </div>
            <div>
              <div className="fw-bold text-white" style={{ lineHeight: 1 }}>VEGA STORE</div>
              <div className="text-slate-300" style={{ fontSize: 12 }}>{t('footer.tagline')}</div>
            </div>
          </Link>

          <nav className="d-none d-md-flex align-items-center gap-1">
            <NavLink to="/shop" className={navClass}>{t('nav.shop')}</NavLink>
            <NavLink to="/customize" className={navClass}>
              <span className="d-inline-flex align-items-center gap-2">
                <FaTshirt /> {t('nav.customize')}
              </span>
            </NavLink>
            <NavLink to="/contact" className={navClass}>
              <span className="d-inline-flex align-items-center gap-2">
                <FaPhone /> {t('nav.contact')}
              </span>
            </NavLink>
            <NavLink to="/admin" className={navClass}>
              <span className="d-inline-flex align-items-center gap-2">
                {t('nav.admin')}
              </span>
            </NavLink>
          </nav>

          <div className="d-flex align-items-center gap-2">
            {/* Language Switcher */}
            <div className="dropdown">
              <button
                className="btn-ghost d-inline-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaGlobe />
                {languages.find(l => l.code === lang)?.flag} {lang.toUpperCase()}
              </button>
              <ul className="dropdown-menu dropdown-menu-end glass border-0">
                {languages.map(({ code, label, flag }) => (
                  <li key={code}>
                    <button
                      className={`dropdown-item ${code === lang ? 'active' : ''}`}
                      onClick={() => setLang(code)}
                    >
                      {flag} {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/cart" className="text-decoration-none">
              <button className="btn-ghost d-inline-flex align-items-center gap-2" type="button">
                <FaShoppingCart />
                {t('nav.cart')}
                <span className="badge">{cartCount}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
