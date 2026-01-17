import { FaMapMarkedAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Contact</h2>
      <div className="text-slate-300" style={{ fontSize: 13 }}>Support, commandes, kits équipe, partenariats.</div>

      <div className="row g-3 mt-2">
        <div className="col-12 col-lg-6">
          <div className="glass rounded-4 p-3">
            <div className="fw-bold mb-2">Coordonnées</div>
            <div className="d-flex flex-column gap-2">
              <a className="btn-ghost text-decoration-none d-inline-flex align-items-center gap-2" href="tel:0600209000"><FaPhoneAlt /> 0600209000</a>
              <a className="btn-ghost text-decoration-none d-inline-flex align-items-center gap-2" href="https://wa.me/212600209000" target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>
              <a className="btn-ghost text-decoration-none d-inline-flex align-items-center gap-2" href="https://www.google.com/maps?q=VEGA%20STORE" target="_blank" rel="noreferrer"><FaMapMarkedAlt /> Ouvrir Maps</a>
            </div>
            <div className="text-slate-300 mt-3" style={{ fontSize: 12 }}>
              Astuce business: ajoutez Instagram/TikTok, et un formulaire connecté à email pour transformer les leads.
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="glass rounded-4 p-3">
            <div className="fw-bold mb-2">Message (démo)</div>
            <div className="row g-2">
              <div className="col-12 col-md-6"><input className="form-control" placeholder="Nom" /></div>
              <div className="col-12 col-md-6"><input className="form-control" placeholder="Téléphone" /></div>
              <div className="col-12"><input className="form-control" placeholder="Sujet" /></div>
              <div className="col-12"><textarea className="form-control" placeholder="Message" rows={4} /></div>
            </div>
            <button className="btn-primary mt-3" type="button">Envoyer</button>
          </div>
        </div>

        <div className="col-12">
          <div className="glass rounded-4 p-3">
            <div className="fw-bold mb-2">Carte</div>
            <div className="rounded-4 overflow-hidden" style={{ height: 320, background: 'rgba(0,0,0,0.25)' }}>
              <iframe
                title="VEGA STORE Maps"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=VEGA%20STORE&output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
