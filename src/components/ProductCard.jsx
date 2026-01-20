import { motion } from 'framer-motion'
import { FaPlus, FaTshirt, FaStar } from 'react-icons/fa'
import { getProductPrice } from '../utils/prices'
import { useI18n } from '../i18n'

export default function ProductCard({ product, index = 0, onAdd }) {
  const { t } = useI18n()
  const price = getProductPrice(product.id, product.priceMAD)
  // Use product.image if available, otherwise fallback to placeholder
  const img = product.image || `https://source.unsplash.com/800x800/?${product.category}-equipment&sig=${index}`


  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-sport-900/40 backdrop-blur-xl rounded-[2rem] border border-white/5 overflow-hidden hover:border-sport-accent/50 transition-colors duration-500 flex flex-col h-full shadow-2xl relative"
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
        />
        {/* Custom Tag */}
        {product.customizable && (
          <div className="absolute top-4 left-4 ps-1 pe-1">
            <div className="bg-sport-neon text-sport-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-xl">
              <FaTshirt className="text-xs" /> {t('product.customizable')}
            </div>
          </div>
        )}
        {/* Popularity Badge */}
        {product.popularity > 90 && (
          <div className="absolute top-4 right-4">
            <div className="bg-sport-fire text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
              TRENDING
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sport-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-white font-black text-xl italic uppercase tracking-tighter leading-tight group-hover:text-sport-accent transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest line-clamp-2 mb-6">
          {product.short}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{t('product.price')}</span>
            <span className="text-white font-black text-2xl italic tracking-tighter">{price} <span className="text-xs">MAD</span></span>
          </div>
          <button
            onClick={() => onAdd?.({ ...product, priceMAD: price })}
            className="w-12 h-12 rounded-2xl bg-sport-accent text-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-xl shadow-sport-accent/20 group/btn"
          >
            <FaPlus className="group-hover/btn:rotate-90 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
