import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { useI18n } from '../i18n'

export default function Contact() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-sport-950 min-h-screen pt-32 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-sport-accent/10 blur-[150px] rounded-full translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-sport-neon/5 blur-[150px] rounded-full -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left: Info */}
            <div className="flex-1 w-full">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="px-5 py-2 rounded-full glass border-sport-accent/30 text-sport-accent font-black text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-sport-accent animate-ping" /> Connection Hub
                </div>
                <h1 className="text-white font-black text-6xl md:text-8xl italic uppercase tracking-tighter leading-[0.85] mb-8">
                  JOIN THE <br /> <span className="text-sport-neon text-glow">TEAM</span>
                </h1>
                <p className="text-slate-400 text-xl font-bold leading-relaxed mb-12 max-w-lg">
                  Need custom team gear? Have a question about our professional equipment? Our coaches are ready to help.
                </p>

                <div className="flex flex-col gap-6">
                  {[
                    { icon: FaPhone, label: 'Hotline', val: '+212 600 000 000' },
                    { icon: FaEnvelope, label: 'Official Mail', val: 'squad@vegalab.com' },
                    { icon: FaMapMarkerAlt, label: 'Hq Location', val: 'Casablanca, Morocco' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group cursor-pointer">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-xl group-hover:bg-sport-accent group-hover:scale-110 transition-all duration-500">
                        <item.icon />
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</div>
                        <div className="text-white font-black text-lg group-hover:text-sport-neon transition-colors">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Socials */}
                <div className="flex gap-4 mt-12">
                  <button className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-sport-accent transition-colors"><FaInstagram /></button>
                  <button className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-green-500 transition-colors"><FaWhatsapp /></button>
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1 }}
                className="glass rounded-[3rem] p-10 md:p-16 border-white/5 relative shadow-2xl"
              >
                <h3 className="text-white font-black text-3xl uppercase italic mb-8">Direct Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Your Name</label>
                    <input type="text" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:ring-2 focus:ring-sport-accent/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Email Address</label>
                    <input type="email" required placeholder="you@domain.com" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:ring-2 focus:ring-sport-accent/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Message</label>
                    <textarea rows="4" required placeholder="Tell us about your project or inquiry..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:ring-2 focus:ring-sport-accent/50 outline-none resize-none"></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 rounded-2xl bg-sport-accent text-white font-black text-xl flex items-center justify-center gap-4 hover:bg-sport-neon hover:text-sport-950 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-sport-accent/20"
                  >
                    SEND TRANSMISSION <FaPaperPlane />
                  </button>
                </form>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-sport-950/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-12 rounded-[3rem]"
                    >
                      <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl mb-6 shadow-2xl">
                        <FaCheck />
                      </div>
                      <h4 className="text-white font-black text-3xl uppercase italic">Message Sent!</h4>
                      <p className="text-slate-400 font-bold mt-2">Our coaches will get back to you within 12 hours.</p>
                      <button onClick={() => setSent(false)} className="mt-8 text-sport-neon font-black uppercase text-sm">Send another message</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
