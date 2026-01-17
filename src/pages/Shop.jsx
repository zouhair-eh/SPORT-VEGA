import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { useI18n } from '../i18n'

export default function Shop({ onAdd }) {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return PRODUCTS.filter((p) => {
      const inCat = cat === 'all' || p.category === cat
      const inSearch = !qq || `${p.name} ${p.short}`.toLowerCase().includes(qq)
      return inCat && inSearch
    })
  }, [q, cat])

  return (
    <div className="container py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
          <div>
            <h2 className="fw-bold mb-1">{t('shop.title')}</h2>
            <div className="text-slate-300" style={{ fontSize: 13 }}>{t('shop.subtitle')}</div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <input
              className="form-control"
              style={{ minWidth: 260 }}
              placeholder={t('shop.search')}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <select className="form-select" value={cat} onChange={(e) => setCat(e.target.value)} style={{ minWidth: 190 }}>
              <option value="all">{t('shop.allCategories')}</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{t(`categories.${c.id}`) || c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-3">
          {filtered.map((p, i) => (
            <div key={p.id} className="col-12 col-md-6 col-lg-4">
              <ProductCard product={p} index={i} onAdd={onAdd} />
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-slate-300 mt-4">{t('shop.noProducts')}</div>
        ) : null}
      </motion.div>
    </div>
  )
}
