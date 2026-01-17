import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUserShield, FaUserPlus, FaChevronRight, FaLock, FaEnvelope, FaFingerprint } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [role, setRole] = useState('client') // 'client' or 'patron'
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        // Local simulation
        localStorage.setItem('vega-user-role', role)
        navigate(role === 'patron' ? '/admin' : '/shop')
    }

    return (
        <div className="min-h-screen bg-sport-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sport-accent/20 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sport-neon/10 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-sport-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl relative z-10"
            >
                {/* Left Side: Visual/Brand */}
                <div className="hidden lg:block relative overflow-hidden bg-sport-accent p-16">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-sport-accent opacity-90" />
                    <div className="relative z-10 h-full flex flex-col justify-between text-white">
                        <div className="text-4xl font-black italic tracking-tighter">VEGA STORE</div>
                        <div>
                            <h2 className="text-6xl font-black italic uppercase leading-none mb-6">UNLEASH <br /> THE BEAST</h2>
                            <p className="text-xl font-bold opacity-80 leading-relaxed">Join the elite squad of athletes. Premium gear, personalized kits, and expert advice.</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-black tracking-widest uppercase">
                            <FaFingerprint className="text-2xl" /> SECURE ACCESS ENCRYPTED
                        </div>
                    </div>
                    {/* Decorative shapes */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                </div>

                {/* Right Side: Form */}
                <div className="p-12 md:p-16 flex flex-col justify-center">
                    <div className="mb-12">
                        <h1 className="text-white font-black text-4xl uppercase italic tracking-tighter mb-2">Welcome Back</h1>
                        <p className="text-slate-500 font-bold">Select your access level to continue</p>
                    </div>

                    <div className="flex gap-4 mb-10 bg-white/5 p-2 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setRole('client')}
                            className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-3 font-black text-sm transition-all ${role === 'client' ? 'bg-sport-accent text-white shadow-lg shadow-sport-accent/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <FaUserPlus /> CLIENT
                        </button>
                        <button
                            onClick={() => setRole('patron')}
                            className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-3 font-black text-sm transition-all ${role === 'patron' ? 'bg-sport-neon text-sport-950 shadow-lg shadow-sport-neon/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <FaUserShield /> PATRON
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sport-accent transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="coach@gmail.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:outline-none focus:ring-2 focus:ring-sport-accent/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Secure Password</label>
                            <div className="relative group">
                                <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sport-accent transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:outline-none focus:ring-2 focus:ring-sport-accent/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl ${role === 'patron' ? 'bg-sport-neon text-sport-950 shadow-sport-neon/30' : 'bg-sport-accent text-white shadow-sport-accent/30'}`}
                            >
                                ENTER VEGA LAB <FaChevronRight />
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 text-center">
                        <span className="text-slate-600 font-bold text-sm">Don't have an account? </span>
                        <button className="text-sport-accent font-black text-sm uppercase hover:underline">Request Invite</button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
