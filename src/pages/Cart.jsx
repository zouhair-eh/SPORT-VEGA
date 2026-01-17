import { Link } from 'react-router-dom'
import { cartTotalMAD } from '../utils/cart'

export default function Cart({ cart, setCart, onRemove, onUpdateQty }) {
  const total = cartTotalMAD(cart)

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start align-items-md-center flex-column flex-md-row gap-2 mb-3">
        <div>
          <h2 className="fw-bold mb-1">Panier</h2>
          <div className="text-slate-300" style={{ fontSize: 13 }}>{cart.length} article(s)</div>
        </div>
        <div className="d-flex gap-2">
          <Link to="/shop" className="text-decoration-none"><button className="btn-ghost" type="button">Continuer shopping</button></Link>
          <Link to="/checkout" className="text-decoration-none"><button className="btn-primary" type="button" disabled={!cart.length}>Paiement</button></Link>
        </div>
      </div>

      {!cart.length ? (
        <div className="glass rounded-4 p-4">
          <div className="fw-bold">Votre panier est vide.</div>
          <div className="text-slate-300" style={{ fontSize: 13 }}>Ajoutez des produits depuis la boutique.</div>
        </div>
      ) : (
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="glass rounded-4 p-3">
              {cart.map((x) => (
                <div key={x.key} className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 py-3 border-bottom border-white/10">
                  <div>
                    <div className="fw-bold">{x.name}</div>
                    {x.meta?.playerName ? (
                      <div className="text-slate-300" style={{ fontSize: 13 }}>
                        Custom: <span className="badge">{x.meta.playerName}</span> <span className="badge">#{x.meta.playerNumber}</span> <span className="badge">{x.meta.color}</span>
                      </div>
                    ) : null}
                    <div className="text-slate-300" style={{ fontSize: 13 }}>Prix: {x.priceMAD} MAD</div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      className="form-control"
                      style={{ width: 90 }}
                      value={x.qty}
                      onChange={(e) => onUpdateQty(x.key, e.target.value)}
                    />
                    <button className="btn-ghost" type="button" onClick={() => onRemove(x.key)}>Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="glass rounded-4 p-3">
              <div className="fw-bold mb-2">Résumé</div>
              <div className="d-flex justify-content-between text-slate-200">
                <span>Total</span>
                <span className="fw-bold">{total} MAD</span>
              </div>
              <div className="text-slate-300 mt-2" style={{ fontSize: 12 }}>Livraison calculée au checkout (démo).</div>
              <Link to="/checkout" className="text-decoration-none d-block mt-3">
                <button className="btn-primary w-100" type="button">Passer au paiement</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
