import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaCreditCard, FaLock, FaShieldAlt, FaTruck, FaArrowLeft, FaReceipt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

export default function Checkout({ cart, onClear }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Success
  const total = cart.reduce((s, x) => s + x.priceMAD * x.qty, 0)

  const handleFinalize = (e) => {
    e.preventDefault()
    setStep(3)
    onClear?.()
  }

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-sport-950 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-white font-black text-4xl uppercase italic mb-8">Cart is empty</h2>
        <Link to="/shop" className="px-10 py-5 rounded-2xl bg-sport-accent text-white font-black no-underline">CONTINUE SHOPPING</Link>
      </div>
    )
  }

  return (
    <div className="bg-sport-950 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">

        {/* Progress Stepper */}
        <div className="max-w-4xl mx-auto flex items-center justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 -z-10" />
          <div className={`absolute top-1/2 left-0 h-1 bg-sport-accent -translate-y-1/2 -z-10 transition-all duration-700`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />

          {[
            { n: 1, label: 'Shipping' },
            { n: 2, label: 'Payment' },
            { n: 3, label: 'Confirm' }
          ].map(s => (
            <div key={s.n} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 border-4 ${step >= s.n ? 'bg-sport-accent text-white border-sport-950' : 'bg-sport-900 text-slate-600 border- sport-950'}`}>
                {step > s.n ? <FaCheck /> : s.n}
              </div>
              <div className={`mt-3 text-[10px] font-black uppercase tracking-widest ${step >= s.n ? 'text-white' : 'text-slate-600'}`}>{s.label}</div>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 3 ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto glass rounded-[3rem] p-16 text-center border-white/5 border shadow-2xl"
            >
              <div className="w-24 h-24 rounded-full bg-sport-neon text-sport-950 text-4xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-sport-neon/20">
                <FaCheck />
              </div>
              <h1 className="text-white font-black text-5xl uppercase italic tracking-tighter mb-4 leading-none">OPERATION <br /> <span className="text-sport-neon">SUCCESS</span></h1>
              <p className="text-slate-400 font-bold mb-10 leading-relaxed">Your gear is being prepared for the elite squad. You'll receive a confirmation email with tracking details shortly.</p>
              <div className="flex flex-col gap-4">
                <Link to="/shop" className="no-underline w-full py-5 rounded-2xl bg-sport-accent text-white font-black text-xl hover:scale-105 active:scale-95 transition-all">RETURN TO LAB</Link>
                <button onClick={() => window.print()} className="flex items-center justify-center gap-3 text-slate-500 font-black uppercase text-xs tracking-widest hover:text-white transition-colors">
                  <FaReceipt /> PRINT RECEIPT
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto"
            >
              {/* Left: Form */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="glass rounded-[3rem] p-10 md:p-14 border-white/5 border">
                  <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
                    <h3 className="text-white font-black text-3xl uppercase italic leading-none">{step === 1 ? 'Shipping Intel' : 'Payment Method'}</h3>
                    <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      <FaLock /> Secured 256-bit
                    </div>
                  </div>

                  {step === 1 ? (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 md:col-span-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Full Delivery Name</label>
                        <input type="text" placeholder="Athlete Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:ring-2 focus:ring-sport-accent/50 outline-none transition-all" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Phone Secret</label>
                        <input type="tel" placeholder="+212 ..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:ring-2 focus:ring-sport-accent/50 outline-none transition-all" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">City</label>
                        <input type="text" placeholder="Casablanca" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:ring-2 focus:ring-sport-accent/50 outline-none transition-all" />
                      </div>
                      <div className="space-y-4 md:col-span-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Full Tactical Address</label>
                        <textarea rows="3" placeholder="Street, Building, Apartment..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:ring-2 focus:ring-sport-accent/50 outline-none transition-all resize-none"></textarea>
                      </div>
                      <button type="button" onClick={() => setStep(2)} className="md:col-span-2 mt-4 py-5 rounded-2xl bg-sport-accent text-white font-black text-xl hover:bg-sport-neon hover:text-sport-950 transition-all flex items-center justify-center gap-4">
                        PROCEED TO PAYMENT <FaArrowLeft className="rotate-180" />
                      </button>
                    </form>
                  ) : (
                    <form className="space-y-8" onSubmit={handleFinalize}>
                      <div className="p-10 rounded-[2.5rem] bg-sport-accent/10 border-2 border-sport-accent flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-6">
                          <FaTruck className="text-3xl text-sport-accent" />
                          <div>
                            <div className="text-white font-black text-xl italic uppercase">Cash on Delivery</div>
                            <div className="text-slate-500 font-bold text-sm">Pay when your gear arrives</div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border-4 border-sport-accent bg-sport-accent flex items-center justify-center"><FaCheck className="text-xs text-white" /></div>
                      </div>
                      <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 flex items-center justify-between opacity-50 cursor-not-allowed grayscale">
                        <div className="flex items-center gap-6">
                          <FaCreditCard className="text-3xl text-slate-600" />
                          <div>
                            <div className="text-slate-500 font-black text-xl italic uppercase">Crypto / Card</div>
                            <div className="text-slate-700 font-bold text-sm">Coming soon for elite members</div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border-4 border-slate-800" />
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 rounded-2xl glass text-white font-black">BACK</button>
                        <button type="submit" className="flex-[2] py-5 rounded-2xl bg-sport-neon text-sport-950 font-black text-xl hover:scale-[1.02] shadow-xl shadow-sport-neon/20">FINALIZE MISSION</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Right: Summary */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="glass rounded-[3rem] p-10 border-white/5 border">
                  <h4 className="text-white font-black text-xl uppercase italic mb-8 border-b border-white/5 pb-4">Order Intelligence</h4>
                  <div className="space-y-6 mb-10">
                    {cart.map(item => (
                      <div key={item.key} className="flex justify-between items-start gap-4">
                        <div className="text-xs font-bold text-slate-400 line-clamp-1">{item.qty}x {item.name}</div>
                        <div className="text-xs font-black text-white whitespace-nowrap">{item.priceMAD * item.qty} MAD</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 pt-6 border-t border-white/5 text-[10px] font-black uppercase tracking-widest italic">
                    <div className="flex justify-between text-slate-500"><span>Squad Discount</span> <span className="text-green-500">-0 MAD</span></div>
                    <div className="flex justify-between text-slate-500"><span>Logistics</span> <span className="text-white">FREE</span></div>
                    <div className="flex justify-between text-xl text-white pt-4 mt-4 border-t border-white/5"><span>Total Score</span> <span className="text-sport-neon font-black italic">{total} MAD</span></div>
                  </div>
                </div>
                <div className="bg-sport-neon/10 p-10 rounded-[3rem] border border-sport-neon/20 flex items-center gap-6">
                  <FaShieldAlt className="text-3xl text-sport-neon" />
                  <div className="text-[10px] font-black text-sport-neon uppercase tracking-widest leading-loose">VEGA LAB GUARANTEE: Premium quality only, or full replacement.</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
