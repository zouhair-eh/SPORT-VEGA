import { useMemo, useState } from 'react'
import { cartTotalMAD } from '../utils/cart'

function randId() {
  return Math.random().toString(16).slice(2, 10).toUpperCase()
}

export default function Checkout({ cart, onClear }) {
  const subtotal = cartTotalMAD(cart)
  const shipping = subtotal ? 39 : 0
  const total = subtotal + shipping

  const [form, setForm] = useState({
    name: '',
    phone: '0600209000',
    city: 'Casablanca',
    address: '',
  })
  const [payment, setPayment] = useState('online_demo')
  const [orderId, setOrderId] = useState('')

  const valid = useMemo(() => form.name && form.phone && form.address && cart.length, [form, cart.length])

  function placeOrder() {
    if (!valid) return
    const id = `VG-${randId()}`
    setOrderId(id)
    onClear?.()
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Paiement</h2>
      <div className="text-slate-300" style={{ fontSize: 13 }}>Commande + livraison (démo). Pour paiement réel, branchez Stripe/PayPal côté serveur.</div>

      {orderId ? (
        <div className="glass rounded-4 p-4 mt-3">
          <div className="fw-bold" style={{ fontSize: 18 }}>Merci. Commande confirmée.</div>
          <div className="text-slate-300" style={{ fontSize: 13 }}>Référence: <span className="badge">{orderId}</span></div>
          <div className="text-slate-300 mt-2" style={{ fontSize: 13 }}>Nous vous contacterons au <a className="text-white" href="tel:0600209000">0600209000</a>.</div>
        </div>
      ) : (
        <div className="row g-3 mt-2">
          <div className="col-12 col-lg-7">
            <div className="glass rounded-4 p-3">
              <div className="fw-bold mb-2">Informations de livraison</div>

              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <label className="form-label text-slate-200">Nom complet</label>
                  <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-slate-200">Téléphone</label>
                  <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-slate-200">Ville</label>
                  <input className="form-control" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-slate-200">Adresse</label>
                  <input className="form-control" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Rue, quartier, immeuble..." />
                </div>
              </div>

              <div className="fw-bold mt-3 mb-2">Mode de paiement</div>
              <div className="d-flex flex-column gap-2">
                <label className="d-flex align-items-center gap-2">
                  <input type="radio" name="pay" checked={payment === 'online_demo'} onChange={() => setPayment('online_demo')} />
                  <span>Paiement en ligne (démo)</span>
                </label>
                <label className="d-flex align-items-center gap-2">
                  <input type="radio" name="pay" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                  <span>Paiement à la livraison</span>
                </label>
              </div>

              <div className="mt-3 d-flex flex-wrap gap-2">
                <a className="btn-ghost text-decoration-none" href="https://www.google.com/maps?q=VEGA%20STORE" target="_blank" rel="noreferrer">Ouvrir Maps</a>
                <a className="btn-ghost text-decoration-none" href="tel:0600209000">Appeler: 0600209000</a>
              </div>

              <button className="btn-primary mt-3" type="button" disabled={!valid} onClick={placeOrder}>
                Confirmer la commande
              </button>

              <div className="text-slate-300 mt-2" style={{ fontSize: 12 }}>
                Important: le paiement en ligne est une démonstration. Pour activer Stripe/PayPal en réel, ajoutez un backend et vos clés API.
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="glass rounded-4 p-3">
              <div className="fw-bold mb-2">Résumé</div>
              <div className="d-flex justify-content-between text-slate-200"><span>Sous-total</span><span>{subtotal} MAD</span></div>
              <div className="d-flex justify-content-between text-slate-200"><span>Livraison</span><span>{shipping} MAD</span></div>
              <div className="d-flex justify-content-between mt-2"><span className="fw-bold">Total</span><span className="fw-bold">{total} MAD</span></div>

              <div className="mt-3 text-slate-300" style={{ fontSize: 12 }}>
                Articles: {cart.length}. Le panier se vide après confirmation.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
