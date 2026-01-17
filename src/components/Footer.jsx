import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-top border-white/10 mt-5">
      <div className="container py-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <div className="fw-bold">VEGA STORE</div>
          <div className="text-slate-300" style={{ fontSize: 13 }}>Matériel sport, tenues, kits équipe. Livraison Maroc.</div>
        </div>
        <div className="d-flex gap-3">
          <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/shop">Boutique</Link>
          <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/customize">Personnaliser</Link>
          <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/contact">Contact</Link>
        </div>
        <div className="text-slate-400" style={{ fontSize: 12 }}>© {new Date().getFullYear()} VEGA STORE</div>
      </div>
    </footer>
  )
}
