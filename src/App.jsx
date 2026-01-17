import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import VegaAI from './components/VegaAI'
import Home from './pages/Home'
import Shop from './pages/Shop'
import CustomizeKit from './pages/CustomizeKit'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { addToCart, loadCart, removeFromCart, saveCart, updateQty } from './utils/cart'

export default function App() {
  const [cart, setCart] = useState(() => loadCart())
  const [toast, setToast] = useState('')

  useEffect(() => { saveCart(cart) }, [cart])

  const cartCount = useMemo(() => cart.reduce((s, x) => s + x.qty, 0), [cart])

  function onAdd(product) {
    setCart((c) => addToCart(c, {
      id: product.id,
      name: product.name,
      priceMAD: product.priceMAD,
      meta: product.meta,
      // Unique key per customization
      key: `${product.id}:${JSON.stringify(product.meta || {})}`
    }))
    setToast(`Ajouté: ${product.name}`)
    setTimeout(() => setToast(''), 1500)
  }

  function onRemove(key) {
    setCart((c) => removeFromCart(c, key))
  }

  function onUpdateQty(key, qty) {
    setCart((c) => updateQty(c, key, qty))
  }

  function onClear() {
    setCart([])
  }

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      {toast ? (
        <div style={{ position: 'fixed', top: 80, right: 16, zIndex: 70 }}>
          <div className="glass rounded-4 px-3 py-2">{toast}</div>
        </div>
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop onAdd={onAdd} />} />
        <Route path="/customize" element={<CustomizeKit onAdd={onAdd} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} onRemove={onRemove} onUpdateQty={onUpdateQty} />} />
        <Route path="/checkout" element={<Checkout cart={cart} onClear={onClear} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <VegaAI />
    </BrowserRouter>
  )
}
