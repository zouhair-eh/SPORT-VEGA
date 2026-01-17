import { useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products'
import { motion } from 'framer-motion'
import { getProductPrice } from '../utils/prices'
import { useI18n } from '../i18n'

const COLORS = [
  { id: 'blue', label: 'Bleu', bg: '#5b8cff', fg: '#081022' },
  { id: 'black', label: 'Noir', bg: '#0f172a', fg: '#f8fafc' },
  { id: 'red', label: 'Rouge', bg: '#ef4444', fg: '#081022' },
  { id: 'white', label: 'Blanc', bg: '#f8fafc', fg: '#081022' },
  { id: 'green', label: 'Vert', bg: '#10b981', fg: '#081022' },
]

function JerseySVG({ bg, fg, name, number }) {
  return (
    <svg viewBox="0 0 360 360" className="w-100 h-100">
      <path d="M65 70 L115 40 L155 70 L205 70 L245 40 L295 70 L330 120 L300 150 L280 120 L280 320 L80 320 L80 120 L60 150 L30 120 Z" fill={bg} opacity="0.95" />
      <path d="M120 60 L140 85 L220 85 L240 60" stroke={fg} strokeWidth="8" fill="none" opacity="0.4" />
      {/* Name and Number Overlay */}
      <text x="180" y="160" fontSize="28" fontWeight="900" fill={fg} textAnchor="middle" letterSpacing="2">
        {name.toUpperCase()}
      </text>
      <text x="180" y="220" fontSize="84" fontWeight="900" fill={fg} textAnchor="middle">
        {number}
      </text>
    </svg>
  )
}

export default function CustomizeKit({ onAdd }) {
  const { t } = useI18n()
  const options = useMemo(() => PRODUCTS.filter((p) => p.customizable), [])
  const [selectedId, setSelectedId] = useState(options[0]?.id)
  const selected = options.find((p) => p.id === selectedId)
  const price = getProductPrice(selected?.id, selected?.priceMAD || 0)

  const [playerName, setPlayerName] = useState('VEGA')
  const [playerNumber, setPlayerNumber] = useState('10')
  const [colorId, setColorId] = useState('blue')

  const c = COLORS.find((x) => x.id === colorId) || COLORS[0]

  function addCustomized() {
    if (!selected) return
    const meta = {
      playerName: playerName.trim() || 'PLAYER',
      playerNumber: String(playerNumber || '').slice(0, 3) || '00',
      color: c.id,
      type: selected.name,
    }
    onAdd?.({ ...selected, priceMAD: price, meta })
  }

  return (
    <div className="container py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
          <div>
            <h2 className="fw-bold mb-1">{t('customize.title')}</h2>
            <div className="text-slate-300" style={{ fontSize: 13 }}>
              {t('customize.subtitle')}
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-5">
            <div className="glass rounded-4 p-3">
              <div className="fw-bold mb-2">{t('customize.options')}</div>

              <label className="form-label text-slate-200">{t('customize.product')}</label>
              <select className="form-select mb-3" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                {options.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} — {getProductPrice(p.id, p.priceMAD)} MAD</option>
                ))}
              </select>

              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <label className="form-label text-slate-200">{t('customize.name')}</label>
                  <input className="form-control" value={playerName} maxLength={12} onChange={(e) => setPlayerName(e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-slate-200">{t('customize.number')}</label>
                  <input className="form-control" value={playerNumber} maxLength={3} onChange={(e) => setPlayerNumber(e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>

              <label className="form-label text-slate-200 mt-3">{t('customize.color')}</label>
              <div className="d-flex flex-wrap gap-2">
                {COLORS.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    className={x.id === c.id ? 'btn-primary' : 'btn-ghost'}
                    onClick={() => setColorId(x.id)}
                  >
                    {x.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 d-flex align-items-center justify-content-between gap-2">
                <div className="fw-bold" style={{ fontSize: 18 }}>{price} MAD</div>
                <button type="button" className="btn-primary" onClick={addCustomized}>
                  {t('product.addToCart')}
                </button>
              </div>

              <div className="text-slate-300 mt-3" style={{ fontSize: 12 }}>
                {t('customize.tip')}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <motion.div
              className="glass rounded-4 p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="fw-bold mb-2">{t('customize.preview')}</div>
              <div className="rounded-4 overflow-hidden d-flex align-items-center justify-content-center" style={{ height: 420, background: 'rgba(0,0,0,0.25)' }}>
                <div style={{ width: 360, height: 360 }}>
                  <JerseySVG
                    bg={c.bg}
                    fg={c.fg}
                    name={playerName || 'PLAYER'}
                    number={String(playerNumber || '00').slice(0, 3)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
