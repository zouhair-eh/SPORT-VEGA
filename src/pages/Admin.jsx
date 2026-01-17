import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { loadPrices, setProductPrice, resetAllPrices } from '../utils/prices'
import { motion } from 'framer-motion'
import { FaLock, FaUnlock, FaSave, FaUndo } from 'react-icons/fa'

export default function Admin() {
    const [prices, setPrices] = useState({})
    const [editedPrices, setEditedPrices] = useState({})
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const loaded = loadPrices()
        setPrices(loaded)
        setEditedPrices(loaded)
    }, [])

    function handlePriceChange(productId, value) {
        setEditedPrices(prev => ({ ...prev, [productId]: parseFloat(value) || 0 }))
        setSaved(false)
    }

    function handleSave() {
        Object.entries(editedPrices).forEach(([id, price]) => {
            setProductPrice(id, price)
        })
        setPrices(editedPrices)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    function handleReset() {
        if (confirm('Réinitialiser tous les prix aux valeurs par défaut?')) {
            resetAllPrices()
            setPrices({})
            setEditedPrices({})
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        }
    }

    return (
        <div className="container py-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
                            <FaLock /> Admin Panel
                        </h2>
                        <div className="text-slate-300" style={{ fontSize: 13 }}>
                            Gestion des prix (localStorage)
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/shop" className="text-decoration-none">
                            <button className="btn-ghost" type="button">
                                Retour à la boutique
                            </button>
                        </Link>
                        <button
                            className="btn-ghost"
                            type="button"
                            onClick={handleReset}
                        >
                            <FaUndo /> Réinitialiser
                        </button>
                        <button
                            className="btn-primary"
                            type="button"
                            onClick={handleSave}
                        >
                            <FaSave /> Sauvegarder
                        </button>
                    </div>
                </div>

                {saved && (
                    <div className="alert alert-success mb-3" role="alert">
                        ✅ Prix sauvegardés avec succès!
                    </div>
                )}

                <div className="glass rounded-4 p-4">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produit</th>
                                <th>Prix par défaut</th>
                                <th>Prix actuel</th>
                                <th>Nouveau prix (MAD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PRODUCTS.map((product) => {
                                const currentPrice = prices[product.id] ?? product.priceMAD
                                const editedPrice = editedPrices[product.id] ?? currentPrice

                                return (
                                    <tr key={product.id}>
                                        <td className="text-slate-300" style={{ fontSize: 12 }}>
                                            {product.id}
                                        </td>
                                        <td className="fw-bold">{product.name}</td>
                                        <td className="text-slate-300">{product.priceMAD} MAD</td>
                                        <td className="fw-bold text-success">{currentPrice} MAD</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                style={{ maxWidth: 150 }}
                                                value={editedPrice}
                                                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                                                min="0"
                                                step="10"
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3 text-slate-300" style={{ fontSize: 13 }}>
                    <FaUnlock className="me-2" />
                    Note: Les prix sont stockés dans le localStorage du navigateur.
                    Ils persisteront jusqu'à ce que vous les réinitialisiez ou vidiez le cache.
                </div>
            </motion.div>
        </div>
    )
}
