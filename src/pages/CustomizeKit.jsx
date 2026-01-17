import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSyncAlt, FaPalette, FaFont, FaChevronRight, FaCheck, FaTshirt } from 'react-icons/fa'
import { PRODUCTS } from '../data/products'
import { getProductPrice } from '../utils/prices'
import { useI18n } from '../i18n'

const COLORS = [
  { id: 'blue', label: 'Pro Blue', bg: '#5b8cff', fg: '#ffffff' },
  { id: 'black', label: 'Midnight', bg: '#020617', border: '#ffffff30', fg: '#ffffff' },
  { id: 'neon', label: 'Electric', bg: '#ccff00', fg: '#000000' },
  { id: 'red', label: 'Fire Red', bg: '#ff3b3b', fg: '#ffffff' },
  { id: 'white', label: 'Apex White', bg: '#f8fafc', fg: '#0f172a' },
]

const FONTS = [
  { id: 'modern', label: 'Modern Sans', family: "'Outfit', sans-serif" },
  { id: 'classic', label: 'Classic Sport', family: "'Inter', sans-serif" },
  { id: 'retro', label: 'Retro Block', family: "serif" }, // Will map to a heavy block font if available
]

export default function CustomizeKit({ onAdd }) {
  const { t } = useI18n()
  const customOptions = useMemo(() => PRODUCTS.filter(p => p.customizable), [])

  const [selectedId, setSelectedId] = useState(customOptions[0]?.id)
  const product = customOptions.find(p => p.id === selectedId)
  const price = getProductPrice(product?.id, product?.priceMAD || 0)

  const [name, setName] = useState('VEGA')
  const [number, setNumber] = useState('07')
  const [color, setColor] = useState(COLORS[0])
  const [font, setFont] = useState(FONTS[0])
  const [view, setView] = useState('back') // 'front' or 'back'
  const [size, setSize] = useState('M')

  const handleAdd = () => {
    if (!product) return
    onAdd?.({
      ...product,
      priceMAD: price,
      meta: {
        custom: true,
        name: name.toUpperCase(),
        number,
        color: color.label,
        font: font.label,
        size
      }
    })
  }

  return (
    <div className="bg-sport-950 min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Preview Section */}
          <div className="flex-1 w-full sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square md:aspect-auto md:h-[650px] bg-sport-900 rounded-[3rem] border border-white/5 flex items-center justify-center p-8 md:p-12 overflow-hidden shadow-2xl shadow-black/50"
            >
              {/* Bg Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-sport-accent/10 via-transparent to-sport-neon/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sport-accent/20 blur-[150px] rounded-full" />

              {/* Jersey SVG (Simulated) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 w-full max-w-[400px] drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
                >
                  <svg viewBox="0 0 400 500" className="w-full h-auto">
                    {/* Simplified Jersey Shape */}
                    <path
                      d="M80 110 L20 180 L70 240 L110 190 L110 450 L290 450 L290 190 L330 240 L380 180 L320 110 L300 110 L280 140 L200 140 L120 140 L100 110 Z"
                      fill={color.bg}
                      stroke={color.border || 'none'}
                      strokeWidth="2"
                    />

                    {/* Detail Lines */}
                    <path d="M110 190 L290 190" stroke="rgba(0,0,0,0.1)" strokeWidth="4" fill="none" />
                    <circle cx="200" cy="140" r="45" fill="rgba(0,0,0,0.05)" />

                    {/* Custom Text/Numbers */}
                    {view === 'back' ? (
                      <>
                        <motion.text
                          x="200" y="220"
                          textAnchor="middle"
                          fontSize="24"
                          fontWeight="900"
                          fill={color.fg}
                          style={{ fontFamily: font.family }}
                          className="uppercase tracking-[0.3em]"
                        >
                          {name || 'YOUR NAME'}
                        </motion.text>
                        <motion.text
                          x="200" y="360"
                          textAnchor="middle"
                          fontSize="140"
                          fontWeight="black"
                          fill={color.fg}
                          style={{ fontFamily: font.family }}
                        >
                          {number || '00'}
                        </motion.text>
                      </>
                    ) : (
                      <>
                        <circle cx="150" cy="190" r="15" fill="rgba(255,255,255,0.2)" />
                        <rect x="230" y="175" width="40" height="30" rx="4" fill="rgba(255,255,255,0.1)" />
                      </>
                    )}
                  </svg>
                </motion.div>
              </AnimatePresence>

              {/* View Toggle */}
              <button
                onClick={() => setView(view === 'front' ? 'back' : 'front')}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl bg-white text-sport-950 font-black text-sm flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <FaSyncAlt className={view === 'front' ? 'rotate-180 transition-transform' : ''} />
                {view === 'front' ? 'SHOW BACK' : 'SHOW FRONT'}
              </button>
            </motion.div>
          </div>

          {/* Controls Section */}
          <div className="w-full lg:w-[450px] flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-white font-black text-5xl md:text-7xl italic tracking-tighter uppercase leading-[0.85] mb-4">
                CUSTOM <br /> <span className="text-sport-neon">SQUAD PRO</span>
              </h1>
              <p className="text-slate-400 font-bold">Configure your elite identity. High-performance fabrics with precision detailing.</p>
            </motion.div>

            {/* Selection */}
            <div className="flex flex-col gap-8">
              {/* Product Select */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <FaTshirt /> Select Base Model
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:outline-none focus:ring-2 focus:ring-sport-accent/50 appearance-none cursor-pointer"
                >
                  {customOptions.map(o => (
                    <option key={o.id} value={o.id} className="bg-sport-900">{o.name} — {o.priceMAD} MAD</option>
                  ))}
                </select>
              </div>

              {/* Name & Number */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Jersey Name</label>
                  <input
                    type="text"
                    maxLength={12}
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-black uppercase text-xl focus:outline-none focus:ring-2 focus:ring-sport-accent/50"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Number</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={number}
                    onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-black text-xl focus:outline-none focus:ring-2 focus:ring-sport-accent/50"
                  />
                </div>
              </div>

              {/* Color & Font */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><FaPalette /> Primary Color</label>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c)}
                      className={`w-12 h-12 rounded-xl border-2 transition-all flex items-center justify-center ${color.id === c.id ? 'border-sport-neon scale-110 shadow-lg shadow-sport-neon/20' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: c.bg }}
                    >
                      {color.id === c.id && <FaCheck className={c.id === 'white' ? 'text-black' : 'text-white'} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><FaFont /> Typography Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {FONTS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFont(f)}
                      className={`px-4 py-4 rounded-2xl border font-black text-[10px] uppercase transition-all ${font.id === f.id ? 'bg-sport-neon text-sport-950 border-sport-neon' : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Select Size</label>
                <div className="flex gap-3">
                  {['S', 'M', 'L', 'XL', '2XL'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-full py-4 rounded-xl border font-black text-sm transition-all ${size === s ? 'bg-sport-accent text-white border-sport-accent shadow-lg shadow-sport-accent/20' : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-8 p-10 rounded-[2.5rem] bg-gradient-to-br from-sport-900 to-sport-950 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sport-accent/10 blur-[60px] group-hover:bg-sport-neon/10 transition-colors" />
              <div className="flex items-center justify-between gap-6 relative z-10 font-black">
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">Total Price</div>
                  <div className="text-white text-4xl">{price} MAD</div>
                </div>
                <button
                  onClick={handleAdd}
                  className="px-10 py-5 rounded-2xl bg-sport-accent text-white hover:bg-sport-neon hover:text-sport-950 transition-all flex items-center gap-3 active:scale-95"
                >
                  ADD TO SQUAD <FaChevronRight />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
