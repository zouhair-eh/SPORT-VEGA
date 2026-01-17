import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import VegaCoach from './components/VegaCoach'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import CustomizeKit from './pages/CustomizeKit'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { addToCart, loadCart, removeFromCart, saveCart, updateQty } from './utils/cart'

function AnimatedRoutes({ onAdd, cart, setCart, onRemove, onUpdateQty, onClear }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop onAdd={onAdd} />} />
          <Route path="/customize" element={<CustomizeKit onAdd={onAdd} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} onRemove={onRemove} onUpdateQty={onUpdateQty} />} />
          <Route path="/checkout" element={<Checkout cart={cart} onClear={onClear} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [cart, setCart] = useState(() => loadCart())
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => { saveCart(cart) }, [cart])

  const cartCount = useMemo(() => cart.reduce((s, x) => s + x.qty, 0), [cart])

  function onAdd(product) {
    setCart((c) => addToCart(c, {
      id: product.id,
      name: product.name,
      priceMAD: product.priceMAD,
      meta: product.meta,
      key: `${product.id}:${JSON.stringify(product.meta || {})}`
    }))
    setIsDrawerOpen(true)
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

      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cart={cart}
        onRemove={onRemove}
        onUpdateQty={onUpdateQty}
      />

      <div className="min-h-screen">
        <AnimatedRoutes
          onAdd={onAdd}
          cart={cart}
          setCart={setCart}
          onRemove={onRemove}
          onUpdateQty={onUpdateQty}
          onClear={onClear}
        />
      </div>

      <Footer />
      <VegaCoach />
    </BrowserRouter>
  )
}
