import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaUserAlt, FaUserTie, FaLock, FaEnvelope } from 'react-icons/fa'
import { useI18n } from '../i18n'

export default function Login() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const [role, setRole] = useState('client') // 'client' or 'patron'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        // Simulate login
        if (role === 'patron') {
            localStorage.setItem('vega-user-role', 'admin')
            navigate('/admin')
        } else {
            localStorage.setItem('vega-user-role', 'client')
            navigate('/')
        }
    }

    return (
        <div className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <motion.div
                        className="glass rounded-5 p-4 p-md-5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-center mb-4">
                            <h2 className="fw-bold mb-1">{t('login.title')}</h2>
                            <p className="text-slate-400">{t('login.subtitle')}</p>
                        </div>

                        <div className="d-flex gap-2 mb-4">
                            <button
                                className={`flex-fill py-3 rounded-4 border-0 d-flex align-items-center justify-content-center gap-2 transition-all ${role === 'client' ? 'btn-primary-sm shadow-lg' : 'btn-ghost-sm text-slate-300'}`}
                                onClick={() => setRole('client')}
                                type="button"
                            >
                                <FaUserAlt /> Client
                            </button>
                            <button
                                className={`flex-fill py-3 rounded-4 border-0 d-flex align-items-center justify-content-center gap-2 transition-all ${role === 'patron' ? 'btn-primary-sm shadow-lg' : 'btn-ghost-sm text-slate-300'}`}
                                onClick={() => setRole('patron')}
                                type="button"
                            >
                                <FaUserTie /> Patron
                            </button>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label text-slate-300 small ms-1">{t('login.email')}</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white/5 border-white/10 text-slate-400">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control bg-white/5 border-white/10 text-white shadow-none py-2"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-slate-300 small ms-1">{t('login.password')}</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white/5 border-white/10 text-slate-400">
                                        <FaLock />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control bg-white/5 border-white/10 text-white shadow-none py-2"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary w-100 py-3 rounded-4 shadow-lg border-0"
                                type="submit"
                            >
                                {t('nav.login')}
                            </motion.button>
                        </form>

                        <div className="text-center mt-4 pt-2">
                            <p className="text-slate-400 mb-0 small">
                                {t('login.noAccount')} <a href="#" className="text-primary text-decoration-none fw-bold">Sign Up</a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
