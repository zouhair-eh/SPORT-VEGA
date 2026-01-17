import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBolt, FaShippingFast, FaShieldAlt, FaTshirt } from 'react-icons/fa'
import { useI18n } from '../i18n'

export default function Home() {
  const { t } = useI18n()

  return (
    <div>
      <section className="position-relative overflow-hidden">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="badge mb-3">
                  <FaBolt /> {t('home.promo')}
                </div>
                <h1 className="fw-bold" style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1.05 }}>
                  {t('home.title')}
                  <span className="d-block text-slate-200">{t('home.subtitle')}</span>
                </h1>
                <p className="text-slate-300 mt-3" style={{ fontSize: 16 }}>
                  {t('home.description')}
                </p>
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <Link to="/shop" className="text-decoration-none">
                    <motion.button
                      className="btn-primary"
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('home.viewShop')}
                    </motion.button>
                  </Link>
                  <Link to="/customize" className="text-decoration-none">
                    <motion.button
                      className="btn-ghost"
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTshirt /> {t('home.customizeKit')}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              <div className="row g-3 mt-4">
                <div className="col-12 col-md-4">
                  <motion.div
                    className="glass rounded-4 p-3 h-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="fw-bold d-flex align-items-center gap-2">
                      <FaShippingFast /> Livraison
                    </div>
                    <div className="text-slate-300" style={{ fontSize: 13 }}>24–72h selon la ville</div>
                  </motion.div>
                </div>
                <div className="col-12 col-md-4">
                  <motion.div
                    className="glass rounded-4 p-3 h-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="fw-bold d-flex align-items-center gap-2">
                      <FaShieldAlt /> Qualité
                    </div>
                    <div className="text-slate-300" style={{ fontSize: 13 }}>Sélection premium</div>
                  </motion.div>
                </div>
                <div className="col-12 col-md-4">
                  <motion.div
                    className="glass rounded-4 p-3 h-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="fw-bold d-flex align-items-center gap-2">
                      <FaTshirt /> Custom
                    </div>
                    <div className="text-slate-300" style={{ fontSize: 13 }}>Nom + numéro</div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <motion.div
                className="glass rounded-5 p-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="rounded-5 overflow-hidden" style={{ height: 340, background: 'radial-gradient(circle at 20% 20%, rgba(91,140,255,.35), transparent 50%), radial-gradient(circle at 70% 40%, rgba(59,109,255,.25), transparent 50%), rgba(0,0,0,.25)' }}>
                  <div className="h-100 w-100 d-flex flex-column justify-content-end p-4">
                    <div className="badge">Nouveau • Collection Training 2026</div>
                    <div className="fw-bold mt-2" style={{ fontSize: 22 }}>Matériel + Tenues d'équipe</div>
                    <div className="text-slate-300" style={{ fontSize: 13 }}>30+ produits • Maroc & Europe • Personnalisation</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            zIndex: -1,
            background: 'radial-gradient(circle at 10% 10%, rgba(91,140,255,0.18), transparent 42%), radial-gradient(circle at 80% 20%, rgba(59,109,255,0.14), transparent 45%), radial-gradient(circle at 40% 90%, rgba(148,163,184,0.10), transparent 55%)'
          }}
        />
      </section>

      <section className="container py-4">
        <motion.div
          className="glass rounded-4 p-4 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <div className="fw-bold" style={{ fontSize: 18 }}>Besoin d'une tenue équipe avec nom + numéro ?</div>
            <div className="text-slate-300" style={{ fontSize: 13 }}>Essayez la personnalisation instantanée (preview).</div>
          </div>
          <Link to="/customize" className="text-decoration-none">
            <motion.button
              className="btn-primary"
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Personnaliser maintenant
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
