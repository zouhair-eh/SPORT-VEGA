import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaPaperPlane } from 'react-icons/fa'

function localReply(text) {
  const t = (text || '').toLowerCase()
  if (t.includes('taille') || t.includes('size')) {
    return "Pour la taille: si vous hésitez entre deux tailles, prenez la plus grande pour plus de confort. Pour les kits équipe, mesurez le tour de poitrine et comparez avec le guide."
  }
  if (t.includes('livraison') || t.includes('delivery')) {
    return "Livraison partout au Maroc. Les délais varient selon la ville (en général 24–72h)."
  }
  if (t.includes('personnal') || t.includes('nom') || t.includes('numéro') || t.includes('numero')) {
    return "Oui: vous pouvez personnaliser les tenues (nom + numéro). Allez dans Personnalisation, choisissez un kit puis saisissez votre nom et numéro."
  }
  if (t.includes('paiement') || t.includes('payment')) {
    return "Paiement en ligne (démo) ou à la livraison. Pour activer Stripe/PayPal en réel, ajoutez vos clés API côté serveur."
  }
  return "Dites-moi ce que vous cherchez: matériel (gym/football/boxing), tenue, ou kit équipe. Je vous recommande le bon produit et la bonne taille."
}

export default function VegaAI() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => ([
    { role: 'assistant', text: "Salut! Je suis VegaCoach. Posez-moi une question sur les produits, tailles, personnalisation, livraison ou paiement." }
  ]))

  const canSend = useMemo(() => input.trim().length > 0, [input])

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    // Local rule-based response (works offline)
    const reply = localReply(text)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: reply }])
    }, 250)
  }

  return (
    <>
      <button
        type="button"
        className="btn-primary d-inline-flex align-items-center gap-2"
        onClick={() => setOpen(true)}
        style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 50 }}
      >
        <FaRobot /> VegaCoach
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 60, background: 'rgba(0,0,0,0.55)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="glass rounded-4 p-3"
              style={{ width: 'min(520px, 92vw)', height: 'min(620px, 84vh)', margin: '10vh auto', overflow: 'hidden' }}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="d-inline-grid place-items-center" style={{ width: 36, height: 36, borderRadius: 14, background: '#5b8cff', color: '#081022', fontWeight: 900 }}>
                    VG
                  </div>
                  <div>
                    <div className="fw-bold">VegaCoach</div>
                    <div className="text-slate-300" style={{ fontSize: 12 }}>Assistant produits (démo)</div>
                  </div>
                </div>
                <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>Fermer</button>
              </div>

              <div className="rounded-4 p-3" style={{ height: 'calc(100% - 110px)', overflowY: 'auto', background: 'rgba(0,0,0,0.25)' }}>
                {messages.map((m, i) => (
                  <div key={i} className={`d-flex mb-2 ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div
                      className="rounded-4 px-3 py-2"
                      style={{
                        maxWidth: '85%',
                        background: m.role === 'user' ? 'rgba(91,140,255,0.25)' : 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)'
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-2 mt-2">
                <input
                  className="form-control"
                  placeholder="Écrivez ici..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                />
                <button type="button" className="btn-primary d-inline-flex align-items-center gap-2" onClick={send} disabled={!canSend}>
                  <FaPaperPlane /> Envoyer
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
