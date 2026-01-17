import { motion } from 'framer-motion'
import { getProductPrice } from '../utils/prices'
import { getProductImage } from '../utils/media'

export default function ProductCard({ product, index = 0, onAdd }) {
  // Get dynamic price from localStorage or use default
  const price = getProductPrice(product.id, product.priceMAD)
  const img = getProductImage(product, index)

  return (
    <motion.article
      className="glass rounded-4 p-3 h-100 d-flex flex-column gap-2"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.2) }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="rounded-4 overflow-hidden position-relative" style={{ height: 170, background: 'rgba(0,0,0,0.25)' }}>
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="w-100 h-100"
          style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
          onError={(e) => {
            // Fallback if image fails
            e.target.style.display = 'none'
          }}
        />
      </div>
      <div className="d-flex align-items-start justify-content-between gap-2">
        <div>
          <div className="fw-bold">{product.name}</div>
          <div className="text-slate-300" style={{ fontSize: 13 }}>{product.short}</div>
        </div>
        {product.customizable ? (
          <span className="badge">Personnalisable</span>
        ) : null}
      </div>
      <div className="mt-auto d-flex align-items-center justify-content-between gap-2 pt-2">
        <div className="fw-bold" style={{ fontSize: 18 }}>{price} MAD</div>
        <button className="btn-primary" type="button" onClick={() => onAdd?.({ ...product, priceMAD: price })}>
          Ajouter
        </button>
      </div>
    </motion.article>
  )
}
