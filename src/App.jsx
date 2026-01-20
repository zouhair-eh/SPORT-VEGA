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
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

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
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop onAdd={onAdd} /></ProtectedRoute>} />
          <Route path="/customize" element={<ProtectedRoute><CustomizeKit onAdd={onAdd} /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} setCart={setCart} onRemove={onRemove} onUpdateQty={onUpdateQty} /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout cart={cart} onClear={onClear} /></ProtectedRoute>} />

          {/* Admin Protected */}
          <Route path="/admin" element={<ProtectedRoute requirePatron={true}><Admin /></ProtectedRoute>} />

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
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar is inside BrowserRouter but should probably be hidden on Login? 
            User didn't specify, but usually login pages don't have full nav. 
            However, we can safeguard it inside. For now, let's keep it global OR conditionally render it.
            Let's keep it simple for now, maybe hide connection links if not logged in.
            Actually, let's hide Navbar on Login page for cleaner "Portal" feel.
         */}
        <NavigationWrapper cartCount={cartCount} setIsDrawerOpen={setIsDrawerOpen} />

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

        <FooterWrapper />
        <VegaCoachWrapper />
      </BrowserRouter>
    </AuthProvider>
  )
}

// Helpers to conditionall render Nav/Footer
function NavigationWrapper({ cartCount, setIsDrawerOpen }) {
  const location = useLocation();
  if (location.pathname === '/login') return null;
  return <Navbar cartCount={cartCount} /> // If Navbar has "open drawer" logic, might need prop
}

function FooterWrapper() {
  const location = useLocation();
  if (location.pathname === '/login') return null;
  return <Footer />;
}

function VegaCoachWrapper() {
  const location = useLocation();
  if (location.pathname === '/login') return null;
  return <VegaCoach />;
}
