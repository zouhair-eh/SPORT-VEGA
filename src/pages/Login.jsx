import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
    const [isPatron, setIsPatron] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [patronPass, setPatronPass] = useState('');
    const [error, setError] = useState('');

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/shop'; // Default to shop instead of home for flow
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const handleClientLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields (Demo: user@vega.com / demo)');
            return;
        }
        // Demo validation
        login('client', email);
    };

    const handlePatronLogin = (e) => {
        e.preventDefault();
        if (patronPass === 'vega-admin-2026') {
            // Hardcoded secure-ish password for demo
            login('patron', 'admin@vega.com');
        } else {
            setError('Invalid Patron Access Code');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-green/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md p-8 bg-glass border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-display tracking-tighter mb-2">VEGA <span className="text-neon-blue">STORE</span></h1>
                    <p className="text-white/60">Enter the simulation</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-2 rounded-lg mb-6 text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                {!isPatron ? (
                    <form onSubmit={handleClientLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-neon-blue mb-1 tracking-widest">IDENTITY (EMAIL)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                                placeholder="user@vega.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-neon-blue mb-1 tracking-widest">ACCESS CODE (PASS)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                                placeholder="demo"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                        >
                            INITIALIZE SESSION
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handlePatronLogin} className="space-y-4">
                        <div className="text-center mb-4">
                            <span className="inline-block px-3 py-1 bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-full text-xs font-mono">
                                PATRON LEVEL ACCESS
                            </span>
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-neon-green mb-1 tracking-widest">MASTER KEY</label>
                            <input
                                type="password"
                                value={patronPass}
                                onChange={(e) => setPatronPass(e.target.value)}
                                className="w-full bg-white/5 border border-neon-green/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-neon-green hover:bg-neon-green/80 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                        >
                            GRANT ACCESS
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => { setIsPatron(!isPatron); setError(''); }}
                        className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                    >
                        {isPatron ? "Return to Standard Protocol" : "Patron Override"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
