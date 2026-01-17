import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaShoppingCart, FaGlobe, FaBars, FaTimes, FaUser } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n'

export default function Navbar({ cartCount = 0 }) {
  const { lang, setLang, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [location])

  const languages = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ar', label: 'AR', flag: '🇲🇦' },
  ]

  const navLinks = [
    { path: '/shop', label: t('nav.shop') },
    { path: '/customize', label: t('nav.customize') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/admin', label: t('nav.admin') },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sport-accent to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sport-accent/20 group-hover:scale-110 transition-transform">
            VG
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-black text-lg leading-tight tracking-tighter">VEGA STORE</div>
            <div className="text-sport-accent text-[10px] font-bold tracking-[0.2em] uppercase">{t('footer.tagline')}</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `px-6 py-2.5 rounded-xl text-sm font-bold no-underline transition-all ${isActive ? 'bg-sport-accent text-white shadow-xl shadow-sport-accent/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Icons & Actions */}
        <div className="flex items-center gap-3">
          {/* Lang */}
          <div className="relative group">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              <FaGlobe />
            </button>
            <div className="absolute top-full right-0 mt-3 w-40 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all backdrop-blur-3xl shadow-2xl">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`w-full px-5 py-4 text-left text-sm font-bold flex items-center gap-3 hover:bg-white/5 transition-colors ${lang === l.code ? 'text-sport-neon' : 'text-slate-400'}`}
                >
                  <span className="text-xl">{l.flag}</span> {l.label}
                </button>
              ))}
            </div>
          </div>

          <Link to="/cart" className="relative group">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sport-fire text-white text-[10px] font-black rounded-full flex items-center justify-center ring-4 ring-slate-950 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>

          <Link to="/login" className="hidden border-none md:flex items-center gap-3 px-6 py-2.5 rounded-xl bg-sport-neon text-slate-950 font-black text-sm hover:scale-105 active:scale-95 transition-all no-underline shadow-xl shadow-sport-neon/30">
            <FaUser className="text-xs" />
            {t('nav.login')}
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-sport-accent text-white flex items-center justify-center shadow-lg shadow-sport-accent/30"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-slate-950/95 backdrop-blur-3xl z-40 lg:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="text-4xl font-black text-white no-underline hover:text-sport-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              className="mt-8 px-12 py-5 rounded-3xl bg-sport-neon text-slate-950 font-black text-2xl no-underline shadow-2xl shadow-sport-neon/40"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.login')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
