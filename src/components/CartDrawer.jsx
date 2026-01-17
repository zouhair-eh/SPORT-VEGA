import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowRight } from 'react-icons/fa'
import { getProductImage } from '../utils/media'

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onUpdateQty }) {
    const total = cart.reduce((s, x) => s + x.priceMAD * x.qty, 0)
    const freeShippingThreshold = 500
    const shippingProgress = Math.min((total / freeShippingThreshold) * 100, 100)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-slate-900 border-l border-white/10 z-[110] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white text-xl">
                                    <FaShoppingCart />
                                </div>
                                <div>
                                    <div className="text-white font-black text-2xl tracking-tighter italic uppercase">Your Cart</div>
                                    <div className="text-slate-500 font-bold text-xs uppercase tracking-widest">{cart.length} ITEMS SELECTED</div>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Free Shipping Indicator */}
                        <div className="px-8 py-6 border-b border-white/5 bg-sport-accent/5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-black text-white uppercase italic">
                                    {total >= freeShippingThreshold ? 'Free Shipping Earned! 🚀' : `Add ${freeShippingThreshold - total} MAD for Free Shipping`}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500">{Math.round(shippingProgress)}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${shippingProgress}%` }}
                                    className="h-full bg-gradient-to-r from-sport-accent to-blue-400 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 no-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <FaShoppingCart className="text-6xl mb-6" />
                                    <div className="text-xl font-black uppercase italic">Empty Cart</div>
                                    <p className="text-xs font-bold mt-2">Go fill it with some pro gear!</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.key} className="flex gap-4 group">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0 relative">
                                            <img src={getProductImage({ id: item.id, category: 'sport' })} alt={item.name} className="w-full h-full object-cover" />
                                            {item.meta?.custom && (
                                                <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-sport-neon text-sport-950 text-[8px] font-black uppercase">Custom</div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="text-white font-black text-sm uppercase leading-tight mb-1">{item.name}</div>
                                                <div className="text-sport-accent font-black text-xs">{item.priceMAD} MAD</div>
                                                {item.meta?.name && (
                                                    <div className="text-[10px] text-slate-500 font-bold mt-1 uppercase italic">"{item.meta.name}" #{item.meta.number}</div>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-white/5 rounded-lg p-1">
                                                    <button onClick={() => onUpdateQty(item.key, item.qty - 1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"><FaMinus className="text-[10px]" /></button>
                                                    <span className="w-8 text-center text-white font-black text-xs">{item.qty}</span>
                                                    <button onClick={() => onUpdateQty(item.key, item.qty + 1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"><FaPlus className="text-[10px]" /></button>
                                                </div>
                                                <button onClick={() => onRemove(item.key)} className="text-slate-600 hover:text-sport-fire transition-colors"><FaTrash className="text-sm" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-slate-500 font-black text-sm uppercase italic">Estimated Total</span>
                                <span className="text-white font-black text-3xl">{total} MAD</span>
                            </div>
                            <Link to="/checkout" onClick={onClose} className="no-underline">
                                <button className="w-full py-5 rounded-2xl bg-sport-accent text-white font-black text-xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-sport-accent/30 group">
                                    CHECKOUT NOW <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                            <button
                                onClick={onClose}
                                className="w-full mt-4 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                            >
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
