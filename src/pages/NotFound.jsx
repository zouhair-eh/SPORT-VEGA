import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container py-5">
      <div className="glass rounded-4 p-4">
        <div className="fw-bold" style={{ fontSize: 18 }}>Page introuvable</div>
        <div className="text-slate-300" style={{ fontSize: 13 }}>Retournez vers l’accueil ou la boutique.</div>
        <div className="d-flex gap-2 mt-3">
          <Link to="/" className="text-decoration-none"><button className="btn-primary" type="button">Accueil</button></Link>
          <Link to="/shop" className="text-decoration-none"><button className="btn-ghost" type="button">Boutique</button></Link>
        </div>
      </div>
    </div>
  )
}
