import { Link } from 'react-router-dom'
import { FaInstagram, FaWhatsapp, FaFacebook, FaPaperPlane, FaBolt } from 'react-icons/fa'
import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-sport-950 border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Bg Decor */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sport-accent/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Col */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 no-underline group">
              <div className="w-10 h-10 rounded-xl bg-sport-accent flex items-center justify-center text-white font-black text-lg">VG</div>
              <div className="text-white font-black text-2xl tracking-tighter italic uppercase">VEGA STORE</div>
            </Link>
            <p className="text-slate-500 font-bold leading-relaxed pr-8">
              The premier destination for elite athletes and teams. High-performance gear engineered for champions.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaWhatsapp, FaFacebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-sport-accent hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4 font-bold text-slate-400 text-sm">
              <li><Link to="/shop" className="hover:text-sport-neon transition-colors no-underline">The Pro Shop</Link></li>
              <li><Link to="/customize" className="hover:text-sport-accent transition-colors no-underline">Custom SQUAD Kits</Link></li>
              <li><Link to="/contact" className="hover:text-sport-accent transition-colors no-underline">Contact Command</Link></li>
              <li><Link to="/admin" className="hover:text-sport-accent transition-colors no-underline">Admin Access</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Support</h4>
            <ul className="space-y-4 font-bold text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors no-underline">Shipping Logistics</a></li>
              <li><a href="#" className="hover:text-white transition-colors no-underline">Return Protocol</a></li>
              <li><a href="#" className="hover:text-white transition-colors no-underline">Security Standards</a></li>
              <li><a href="#" className="hover:text-white transition-colors no-underline">Track Shipment</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="p-8 rounded-[2.5rem] glass border-white/5 relative group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-sport-accent/10 blur-[40px]" />
            <h4 className="text-white font-black text-xl uppercase italic mb-4 leading-none tracking-tighter">JOIN THE <br /> ELITE SQUAD</h4>
            <div className="relative mt-6">
              <input
                type="email"
                placeholder="squad@vegalab.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-12 text-xs text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-sport-accent/50 transition-all font-bold"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sport-accent hover:text-sport-neon transition-colors"><FaPaperPlane /></button>
            </div>
            <div className="mt-4 text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <FaBolt className="text-sport-neon" /> SPEED IS OUR STANDARD
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 font-bold text-[10px] uppercase tracking-widest italic">
            © {new Date().getFullYear()} VEGA LAB INDUSTRIES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors no-underline">Privacy</a>
            <a href="#" className="hover:text-white transition-colors no-underline">Terms</a>
            <a href="#" className="hover:text-white transition-colors no-underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
