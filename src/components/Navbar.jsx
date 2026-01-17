import { Link, NavLink } from 'react-router-dom'
import { FaShoppingCart, FaTshirt, FaPhone, FaGlobe, FaBars, FaUser } from 'react-icons/fa'
import { useI18n } from '../i18n'

const navClass = ({ isActive }) =>
  `nav-link px-3 py-2 rounded-3 ${isActive ? 'bg-white/10 text-white' : 'text-slate-200 hover:text-white'}`

export default function Navbar({ cartCount = 0 }) {
  const { lang, setLang, t } = useI18n()

  const languages = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ar', label: 'AR', flag: '🇲🇦' },
  ]

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-slate-950/80 border-b border-white/10 backdrop-blur-xl py-3">
        <div className="container">
          <Link to="/" className="navbar-brand text-decoration-none d-flex align-items-center gap-2 m-0 p-0">
            <div className="d-inline-grid place-items-center" style={{ width: 42, height: 42, borderRadius: 14, background: 'linear-gradient(135deg, #5b8cff, #3b6dff)', color: '#081022', fontWeight: 900 }}>
              VG
            </div>
            <div className="d-none d-sm-block">
              <div className="fw-bold text-white mb-0" style={{ lineHeight: 1, fontSize: 18 }}>VEGA STORE</div>
              <div className="text-slate-400" style={{ fontSize: 11 }}>{t('footer.tagline')}</div>
            </div>
          </Link>

          <div className="d-flex align-items-center gap-2 order-lg-last">
            {/* Language Switcher - Persistent on mobile */}
            <div className="dropdown me-1">
              <button
                className="btn-ghost-sm d-inline-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
              >
                <FaGlobe className="d-none d-sm-inline" />
                {languages.find(l => l.code === lang)?.flag} {lang.toUpperCase()}
              </button>
              <ul className="dropdown-menu dropdown-menu-end glass border-0 shadow-lg mt-2">
                {languages.map(({ code, label, flag }) => (
                  <li key={code}>
                    <button
                      className={`dropdown-item ${code === lang ? 'active' : ''} text-white hover:bg-white/10`}
                      onClick={() => setLang(code)}
                    >
                      {flag} {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/cart" className="text-decoration-none">
              <button className="btn-ghost-sm d-inline-flex align-items-center gap-2 position-relative" type="button">
                <FaShoppingCart />
                <span className="d-none d-md-inline">{t('nav.cart')}</span>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '10px', padding: '0.35em 0.5em' }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            <button
              className="navbar-toggler border-0 p-2 text-white shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#vegaNavbar"
            >
              <FaBars fontSize={24} />
            </button>
          </div>

          <div className="collapse navbar-collapse" id="vegaNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 mt-3 mt-lg-0">
              <li className="nav-item">
                <NavLink to="/shop" className={navClass}>{t('nav.shop')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/customize" className={navClass}>
                  <FaTshirt className="me-2" /> {t('nav.customize')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className={navClass}>
                  <FaPhone className="me-2" /> {t('nav.contact')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin" className={navClass}>
                  {t('nav.admin')}
                </NavLink>
              </li>
            </ul>
            <div className="d-lg-none mt-3 pt-3 border-top border-white/10">
              <Link to="/login" className="btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-3">
                <FaUser /> {t('nav.login') || 'Login'}
              </Link>
            </div>
            <div className="d-none d-lg-block ms-auto">
              <Link to="/login" className="btn-primary-sm d-flex align-items-center gap-2">
                <FaUser /> {t('nav.login') || 'Login'}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

