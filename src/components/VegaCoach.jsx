import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaChevronRight, FaPaperPlane, FaMagic } from 'react-icons/fa'
import { useI18n } from '../i18n'

export default function VegaCoach() {
    const { t, lang } = useI18n()
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'bot', content: lang === 'ar' ? "السلام عليكم! أنا مدرب فيغا. كيف يمكنني مساعدتك اليوم؟" : (lang === 'fr' ? "Salut ! Je suis VEGA COACH. Comment puis-je t'aider aujourd'hui ?" : "Hey! I'm VEGA COACH. How can I help you level up today?") }
    ])
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return
        const userMsg = input.trim()
        setMessages([...messages, { role: 'user', content: userMsg }])
        setInput('')

        setTimeout(() => {
            let reply = "I'm on it! Our catalog is full of professional gear. Are you looking for training equipment, or maybe a custom team kit?"
            if (lang === 'ar') reply = "أنا معك! لدينا أفضل المعدات الاحترافية. هل تبحث عن أدوات تدريب أم طقم فريق مخصص؟"
            if (lang === 'fr') reply = "Je m'en occupe ! Notre catalogue est rempli de matériel pro. Tu cherches de l'équipement ou un kit personnalisé ?"

            const lowInput = userMsg.toLowerCase()
            if (lowInput.includes('football') || lowInput.includes('soccer') || lowInput.includes('كرة')) {
                reply = lang === 'ar' ? "كرة القدم تخصصنا! لدينا أحدث أطقم المغرب وكرات احترافية. هل تريد عرض منتجات كرة القدم؟" : "Football is our specialty! We have the latest Morocco kits and pro match balls."
            }
            setMessages(prev => [...prev, { role: 'bot', content: reply }])
        }, 800)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-10 right-10 w-20 h-20 rounded-[2rem] bg-sport-accent text-white flex items-center justify-center text-3xl shadow-2xl shadow-sport-accent/40 hover:scale-110 active:scale-95 transition-all z-[60] group border-4 border-sport-950"
            >
                <div className="absolute inset-0 bg-white/20 rounded-[2rem] scale-0 group-hover:scale-100 transition-transform duration-500" />
                <FaRobot className="relative z-10" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-sport-neon rounded-full border-4 border-sport-950 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-sport-950 rounded-full animate-ping" />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
                        className={`fixed bottom-32 right-10 w-[90vw] md:w-[420px] h-[650px] bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl z-[70] flex flex-col overflow-hidden ring-1 ring-white/20 ${lang === 'ar' ? 'font-arabic' : ''}`}
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-sport-accent to-blue-600 p-8 flex items-center justify-between relative overflow-hidden text-white">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-sport-950/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-2xl">
                                    <FaRobot className="animate-float" />
                                </div>
                                <div>
                                    <div className="text-white font-black text-2xl tracking-tighter italic uppercase leading-none">VEGA COACH</div>
                                    <div className="bg-sport-neon/20 px-2 py-0.5 rounded text-[10px] font-black text-sport-neon uppercase inline-block mt-1">Live Support</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 relative z-10"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 no-scrollbar">
                            {messages.map((m, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: (m.role === 'user' ? (lang === 'ar' ? -20 : 20) : (lang === 'ar' ? 20 : -20)) }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-6 rounded-[2rem] font-bold text-[13px] leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-sport-accent text-white rounded-br-none' : 'bg-white/5 text-slate-200 rounded-bl-none border border-white/5'}`}>
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Suggestions */}
                        <div className="px-8 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
                            {(lang === 'ar' ? ['كرة قدم', 'بناء عضلات', 'أطقم مخصصة'] : ['Football Gear', 'Muscle Build', 'Custom Kits']).map(s => (
                                <button
                                    key={s}
                                    onClick={() => { setInput(s); }}
                                    className="px-4 py-2 rounded-full glass border-white/10 text-[10px] font-black text-slate-400 hover:text-white hover:border-sport-accent transition-all whitespace-nowrap bg-white/5"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-8 bg-black/20 border-t border-white/5">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder={lang === 'ar' ? "اسأل المدرب..." : "Ask Coach Vega..."}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 ps-7 pe-16 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sport-accent/50 transition-all placeholder:text-slate-600 shadow-inner"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-sport-accent text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-sport-accent/30 ${lang === 'ar' ? 'left-3' : 'right-3'}`}
                                >
                                    <FaPaperPlane className="text-sm" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
