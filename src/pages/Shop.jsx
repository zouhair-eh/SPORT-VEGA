import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaSortAmountDown, FaThLarge, FaTimes, FaRobot, FaChevronRight } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { useI18n } from '../i18n'

export default function Shop({ onAdd }) {
  const { t, lang } = useI18n()
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const [sortBy, setSortBy] = useState('popular') // popular, price-low, price-high
  const [showFilters, setShowFilters] = useState(false)

  // Filter and Sort Logic
  const filtered = useMemo(() => {
    let result = [...PRODUCTS]

    // Category
    if (activeCat !== 'all') {
      result = result.filter(p => p.category === activeCat)
    }

    // Search
    const q = query.trim().toLowerCase()
    if (q) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.tags?.some(tag => tag.toLowerCase().includes(q))
      )
    }

    // Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.priceMAD - b.priceMAD)
    else if (sortBy === 'price-high') result.sort((a, b) => b.priceMAD - a.priceMAD)
    else if (sortBy === 'popular') result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

    return result
  }, [query, activeCat, sortBy])

  return (
    <div className="bg-sport-950 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-white font-black text-6xl md:text-8xl italic uppercase tracking-tighter leading-none mb-4">
              {t('shop.title')} <br />
              <span className="text-sport-accent">COLLECTION</span>
            </h1>
            <p className="text-slate-400 font-bold max-w-lg">
              {t('shop.subtitle')} • {filtered.length} products found
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sport-neon transition-colors" />
              <input
                type="text"
                placeholder={t('shop.search')}
                className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white font-bold focus:outline-none focus:ring-2 focus:ring-sport-neon/50 text-sm transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-4 rounded-2xl border flex items-center gap-3 font-black text-sm transition-all ${showFilters ? 'bg-sport-neon text-sport-950 border-sport-neon' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
            >
              <FaFilter /> {showFilters ? 'CLOSE' : 'FILTERS'}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveCat('all')}
            className={`px-8 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all border-none ${activeCat === 'all' ? 'bg-sport-accent text-white shadow-xl shadow-sport-accent/20' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
          >
            ALL GEAR
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-8 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all border-none ${activeCat === cat.id ? 'bg-sport-accent text-white shadow-xl shadow-sport-accent/20' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              {cat.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="row g-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="col-12 col-md-6 col-lg-4 xl:col-3"
              >
                <ProductCard product={product} index={idx} onAdd={onAdd} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <FaRobot className="text-8xl text-white/10 mx-auto mb-6" />
            <h3 className="text-white font-black text-3xl uppercase italic">{t('shop.noProducts')}</h3>
            <p className="text-slate-500 font-bold mt-2">Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setQuery(''); setActiveCat('all'); }}
              className="mt-8 px-10 py-4 rounded-2xl bg-sport-accent text-white font-black hover:scale-105 transition-transform"
            >
              RESET ALL
            </button>
          </div>
        )}
      </div>

      {/* Floating Chatbot Toggle */}
      <Chatbot />
    </div>
  )
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hey! I'm VEGA COACH. Looking for gear to improve your game? I can suggest products based on your goals!" }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages([...messages, { role: 'user', content: userMsg }])
    setInput('')

    // Simple rule-based logic for "VEGA COACH" personality
    setTimeout(() => {
      let reply = "That sounds cool! We have some great equipment for that. Check out our Football or Gym collections for the best results!"
      if (userMsg.toLowerCase().includes('weight') || userMsg.toLowerCase().includes('muscle')) {
        reply = "To build muscle or lose weight, I recommend our 'Gym & Crossfit' gear. High-quality dumbbells and benches are perfect for that. Need a specific recommendation?"
      } else if (userMsg.toLowerCase().includes('football') || userMsg.toLowerCase().includes('soccer')) {
        reply = "The pitch is waiting! Our new 2026 Team Kits and Pro Match Balls are trending right now. Want to see the Morocco kit?"
      } else if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('cheap')) {
        reply = "We have gear for every budget. Use the sort feature in the shop to see our best deals starting from 49 MAD!"
      }
      setMessages(prev => [...prev, { role: 'bot', content: reply }])
    }, 800)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 w-20 h-20 rounded-3xl bg-sport-neon text-sport-950 flex items-center justify-center text-3xl shadow-2xl shadow-sport-neon/50 hover:scale-110 active:scale-90 transition-all z-40"
      >
        <FaRobot />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-32 right-10 w-[90vw] md:w-[450px] h-[600px] bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-sport-neon p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sport-950 flex items-center justify-center text-white text-xl shadow-lg">
                  <FaRobot />
                </div>
                <div>
                  <div className="text-sport-950 font-black text-xl leading-none">VEGA COACH</div>
                  <div className="text-sport-950/70 text-xs font-bold mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sport-950 animate-pulse" /> Online Assistant
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-sport-950/10 flex items-center justify-center text-sport-950 hover:bg-sport-950/20"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-5 rounded-3xl font-bold text-sm leading-relaxed ${m.role === 'user' ? 'bg-sport-accent text-white rounded-br-none shadow-lg shadow-sport-accent/20' : 'bg-white/5 text-slate-200 rounded-bl-none border border-white/5'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-sport-950/50 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask your coach anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sport-neon/50 transition-all placeholder:text-slate-600"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-sport-neon text-sport-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
