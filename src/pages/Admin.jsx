import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTrash, FaCheck, FaEdit, FaPlus, FaSearch, FaBox, FaMoneyBillWave, FaChartLine } from 'react-icons/fa'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { getProductPrice, setProductPrice } from '../utils/prices'

export default function Admin() {
    const [products, setProducts] = useState([])
    const [query, setQuery] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editPrice, setEditPrice] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        // In a real app, we'd fetch from API. Here we use local prices mixed with hardcoded PRODUCTS.
        const list = PRODUCTS.map(p => ({
            ...p,
            currentPrice: getProductPrice(p.id, p.priceMAD)
        }))
        setProducts(list)
    }, [])

    const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

    const handleUpdate = (id) => {
        const val = parseFloat(editPrice)
        if (isNaN(val)) return
        setProductPrice(id, val)
        setProducts(products.map(p => p.id === id ? { ...p, currentPrice: val } : p))
        setEditingId(null)
        setMsg('Price updated successfully!')
        setTimeout(() => setMsg(''), 2000)
    }

    return (
        <div className="bg-sport-950 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Total Products', value: PRODUCTS.length, icon: FaBox, color: 'sport-accent' },
                        { label: 'Average Price', value: Math.round(PRODUCTS.reduce((s, x) => s + x.priceMAD, 0) / PRODUCTS.length) + ' MAD', icon: FaMoneyBillWave, color: 'sport-neon text-sport-950' },
                        { label: 'Platform Status', value: 'LIVE / OPTIMIZED', icon: FaChartLine, color: 'green-500' }
                    ].map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={i}
                            className="glass rounded-[2rem] p-8 border-white/5 flex items-center gap-6"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-${stat.color} flex items-center justify-center text-2xl`}>
                                <stat.icon />
                            </div>
                            <div>
                                <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-white text-3xl font-black italic">{stat.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="glass rounded-[3rem] p-10 border-white/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                        <div>
                            <h1 className="text-white font-black text-4xl italic uppercase tracking-tighter">Inventory Control</h1>
                            <p className="text-slate-500 font-bold">Manage pricing and availability for your 200+ sports products.</p>
                        </div>

                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-bold focus:outline-none focus:ring-2 focus:ring-sport-accent/50"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {msg && (
                            <motion.div
                                initial={{ opacity: 0, h: 0 }}
                                animate={{ opacity: 1, h: 'auto' }}
                                exit={{ opacity: 0, h: 0 }}
                                className="bg-green-500/20 text-green-400 font-bold p-4 rounded-xl mb-6 border border-green-500/30 text-center"
                            >
                                {msg}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                    <th className="pb-6 pl-4">Product Info</th>
                                    <th className="pb-6">Category</th>
                                    <th className="pb-6">Current Price</th>
                                    <th className="pb-6 pr-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((p) => (
                                    <tr key={p.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-6 pl-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-sport-900 border border-white/10 flex items-center justify-center text-slate-500 overflow-hidden shrink-0">
                                                    {/* Simple category-based icon placeholder if image fails */}
                                                    <FaBox />
                                                </div>
                                                <div>
                                                    <div className="text-white font-black text-sm uppercase">{p.name}</div>
                                                    <div className="text-slate-600 text-[10px] font-bold">ID: {p.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 uppercase font-black text-[10px] text-slate-400 italic">
                                            {p.category}
                                        </td>
                                        <td className="py-6">
                                            {editingId === p.id ? (
                                                <input
                                                    type="number"
                                                    className="bg-sport-950 border border-sport-accent rounded-lg px-3 py-2 text-white font-black w-32 focus:outline-none"
                                                    autoFocus
                                                    value={editPrice}
                                                    onChange={(e) => setEditPrice(e.target.value)}
                                                />
                                            ) : (
                                                <span className="text-white font-black">{p.currentPrice} MAD</span>
                                            )}
                                        </td>
                                        <td className="py-6 pr-4 text-right">
                                            {editingId === p.id ? (
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => setEditingId(null)} className="w-10 h-10 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center hover:bg-white/10 transition-colors"><FaTrash /></button>
                                                    <button onClick={() => handleUpdate(p.id)} className="w-10 h-10 rounded-xl bg-sport-neon text-sport-950 flex items-center justify-center hover:scale-105 transition-transform"><FaCheck /></button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => { setEditingId(p.id); setEditPrice(p.currentPrice); }}
                                                    className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-400 font-black text-[10px] uppercase hover:border-sport-accent hover:text-white transition-all flex items-center gap-2 ml-auto"
                                                >
                                                    <FaEdit /> Edit Price
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
