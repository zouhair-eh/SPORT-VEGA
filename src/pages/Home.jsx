import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBolt, FaArrowRight, FaPlay, FaUsers, FaDumbbell, FaFutbol, FaTshirt } from 'react-icons/fa'
import { useI18n } from '../i18n'
import { getCategoryVideo } from '../utils/media'
import { CATEGORIES } from '../data/products'

export default function Home() {
  const { t } = useI18n()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="bg-sport-950 min-h-screen">
      {/* Video Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-soccer-player-kicking-the-ball-in-the-stadium-1422-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-sport-950 via-sport-950/40 to-transparent" />

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="px-5 py-2 rounded-full glass border-sport-accent/30 text-sport-accent font-black text-xs uppercase tracking-[0.25em] flex items-center gap-2">
                <FaBolt className="animate-pulse" /> {t('home.promo')}
              </div>
            </div>
            <h1 className="text-white font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter italic uppercase">
              {t('home.title').split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sport-accent to-blue-400">
                {t('home.title').split(' ')[1] || 'STORE'}
              </span>
            </h1>
            <p className="text-slate-300 text-lg md:text-2xl mt-8 max-w-2xl font-semibold leading-relaxed">
              {t('home.description')}
            </p>
            <div className="flex flex-wrap gap-4 mt-12">
              <Link to="/shop" className="group no-underline">
                <button className="px-10 py-5 rounded-2xl bg-sport-accent text-white font-black text-xl flex items-center gap-3 hover:scale-105 hover:shadow-2xl hover:shadow-sport-accent/40 active:scale-95 transition-all">
                  {t('home.viewShop')} <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
              <Link to="/customize" className="no-underline">
                <button className="px-10 py-5 rounded-2xl glass text-white font-black text-xl flex items-center gap-3 border-white/20 hover:bg-white/10 active:scale-95 transition-all">
                  <FaTshirt /> {t('home.customizeKit')}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Modern Grid */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-white font-black text-5xl md:text-7xl italic uppercase tracking-tighter leading-none mb-4">
                LEVEL UP <br /> <span className="text-sport-neon">YOUR GEAR</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-lg font-bold">
                Professional equipment for every athlete. From training to the final whistle.
              </p>
            </div>
            <Link to="/shop" className="text-sport-accent font-black text-xl no-underline flex items-center gap-2 hover:gap-4 transition-all">
              EXPLORE ALL <FaArrowRight />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {CATEGORIES.slice(0, 8).map((cat) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-sport-900 border border-white/5 cursor-pointer"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                >
                  <source src={getCategoryVideo(cat.id)} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-sport-950 via-sport-950/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:bg-sport-neon group-hover:text-sport-950 transition-colors">
                    <FaPlay className="ml-1" />
                  </div>
                  <h3 className="text-white font-black text-3xl uppercase italic tracking-tighter leading-none mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Explore high-performance gear
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-sport-900/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-[3rem] p-12 md:p-20 border-white/5 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="text-sport-neon font-black text-sm tracking-[0.3em] uppercase mb-4">New Era</div>
              <h2 className="text-white font-black text-6xl md:text-8xl tracking-tighter leading-[0.85] italic uppercase mb-8">
                TEAM KIT <br /> <span className="text-sport-accent">SQUAD PRO</span>
              </h2>
              <p className="text-slate-300 text-xl font-medium leading-relaxed mb-10">
                Design your identity. Full customization with live 3D preview, premium fabrics, and expert stitching.
              </p>
              <Link to="/customize" className="no-underline inline-block">
                <button className="px-12 py-5 rounded-2xl bg-white text-sport-950 font-black text-xl hover:bg-sport-neon transition-colors">
                  START DESIGNING
                </button>
              </Link>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-sport-accent/20 blur-[100px] absolute inset-0 -z-10" />
                <FaTshirt className="text-[200px] md:text-[300px] text-white drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
