import { motion } from 'framer-motion'

const EVENTS = [
  {
    title: 'Vega Cup 5v5',
    date: 'Chaque samedi',
    desc: 'Tournoi futsal amateur. Inscription par équipe.',
    prize: 'Cash + bons d’achat VEGA STORE',
  },
  {
    title: 'Challenge Fitness',
    date: 'Mensuel',
    desc: 'Programme 4 semaines. Classement, badges, surprises.',
    prize: 'Matériel gym + t-shirts sport',
  },
  {
    title: 'Boxing Sparring Night',
    date: '2x par mois',
    desc: 'Session encadrée, niveaux débutant/intermédiaire.',
    prize: 'Gants + équipements',
  },
]

export default function Competitions() {
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Compétitions & Challenges</h2>
      <div className="text-slate-300" style={{ fontSize: 13 }}>Pour attirer la communauté et augmenter les ventes: événements + promos.</div>

      <div className="row g-3 mt-2">
        {EVENTS.map((e, i) => (
          <div key={i} className="col-12 col-lg-4">
            <motion.div className="glass rounded-4 p-3 h-100" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
              <div className="badge mb-2">{e.date}</div>
              <div className="fw-bold" style={{ fontSize: 18 }}>{e.title}</div>
              <div className="text-slate-300 mt-2" style={{ fontSize: 13 }}>{e.desc}</div>
              <div className="text-slate-200 mt-3" style={{ fontSize: 13 }}><span className="fw-bold">Prix:</span> {e.prize}</div>
              <button className="btn-primary mt-3" type="button">Je m'inscris</button>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="glass rounded-4 p-3 mt-4">
        <div className="fw-bold mb-2">Formulaire (démo)</div>
        <div className="row g-2">
          <div className="col-12 col-md-4"><input className="form-control" placeholder="Nom" /></div>
          <div className="col-12 col-md-4"><input className="form-control" placeholder="Téléphone" /></div>
          <div className="col-12 col-md-4"><input className="form-control" placeholder="Événement" /></div>
          <div className="col-12"><textarea className="form-control" placeholder="Message" rows={3} /></div>
        </div>
        <button className="btn-primary mt-3" type="button">Envoyer</button>
        <div className="text-slate-300 mt-2" style={{ fontSize: 12 }}>Pour rendre ça réel: connectez une base de données + email/SMS.</div>
      </div>
    </div>
  )
}
