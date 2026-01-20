import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroTunnel() {
    const [show, setShow] = useState(true);
    const [stage, setStage] = useState(0); // 0: init, 1: zoom, 2: fade out

    useEffect(() => {
        // Check if seen in this session
        const seen = sessionStorage.getItem('vega_intro_seen');
        if (seen) {
            setShow(false);
            return;
        }

        // Start sequence
        document.body.style.overflow = 'hidden';

        // Timer for stage 1 (Zoom effect)
        setTimeout(() => setStage(1), 500);

        // Timer for end
        const timer = setTimeout(() => {
            finishIntro();
        }, 3500); // 3.5s total duration

        return () => clearTimeout(timer);
    }, []);

    const finishIntro = () => {
        setStage(2);
        setTimeout(() => {
            setShow(false);
            sessionStorage.setItem('vega_intro_seen', 'true');
            document.body.style.overflow = 'auto';
        }, 1000); // Allow fade out to finish
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            {stage < 2 && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Tunnel Elements */}
                    <motion.div
                        className="absolute inset-0 border-[100px] border-neon-blue/20 rounded-full"
                        initial={{ scale: 0.1, opacity: 0, rotate: 0 }}
                        animate={{
                            scale: stage === 1 ? 20 : 0.1,
                            opacity: stage === 1 ? [0, 1, 0] : 1,
                            rotate: stage === 1 ? 180 : 0
                        }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute inset-0 border-[50px] border-neon-green/20 rounded-full delay-100"
                        initial={{ scale: 0.1, opacity: 0 }}
                        animate={{
                            scale: stage === 1 ? 15 : 0.1,
                            opacity: stage === 1 ? [0, 1, 0] : 1
                        }}
                        transition={{ duration: 2.8, ease: "easeInOut", delay: 0.1 }}
                    />

                    {/* Text/Logo */}
                    <motion.div
                        className="z-10 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: stage === 1 ? [0, 1, 0] : 1, scale: stage === 1 ? 1.5 : 1 }}
                        transition={{ duration: 2.5, times: [0, 0.2, 0.8] }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green tracking-tighter">
                            VEGA
                        </h1>
                        <p className="text-white font-mono tracking-[0.5em] text-sm mt-4">PREMIUM SPORT MODE</p>
                    </motion.div>

                    <button
                        onClick={finishIntro}
                        className="absolute bottom-10 right-10 text-white/30 hover:text-white text-xs uppercase tracking-widest z-50"
                    >
                        Skip Intro
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
