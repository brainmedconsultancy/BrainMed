import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Globe, Sparkles } from "lucide-react";
import { stats } from "../../data/siteData";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden px-4 pt-6 pb-4 mb-4 md:pt-16 md:pb-4 md:mb-1 "
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
          {/* Text Content */}
          <div className="order-2 lg:order-1 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[10px] xs:text-xs sm:text-sm font-semibold text-brand-700 shadow-soft sm:px-4 sm:py-2"
            >
              <Sparkles size={16} className="shrink-0" />
              <span className="truncate">Trusted support for global admissions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-7xl"
            >
              Turn your study abroad plan into a confident next move.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg md:mt-6 md:leading-8"
            >
              BrainMed helps students choose the right country, shortlist
              colleges, manage applications, and navigate visas with clarity
              from day one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.7 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row md:gap-4"
            >
              <a
                href="#contact"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400 px-8 text-sm font-bold text-white transition hover:scale-[1.02] active:scale-[0.98] sm:h-14"
              >
                Apply Now
                <ArrowRight size={16} />
              </a>
              <a
                href="#colleges"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 text-sm font-bold text-slate-900 transition hover:border-brand-200 hover:text-brand-700 active:scale-[0.98] sm:h-14"
              >
                Explore Colleges
              </a>
            </motion.div>

            <div className="mt-10 grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08, duration: 0.6 }}
                  className="glass-panel rounded-3xl p-4 md:p-5 shadow-soft"
                >
                  <p className="text-2xl md:text-3xl font-extrabold text-ink">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs md:text-sm leading-tight text-slate-600">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative z-10 flex items-center justify-center w-full px-4 md:px-0"
          >
            <div className="absolute -left-10 top-16 hidden h-28 w-28 rounded-full bg-accent-300/40 blur-3xl md:block" />
            <div className="absolute -right-8 bottom-10 hidden h-36 w-36 rounded-full bg-brand-300/40 blur-3xl md:block" />

            <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-md lg:max-w-none flex justify-center">
              <img
                src="/hero-doctors-6.png"
                alt="Medical Professionals"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Watermark - Tighter spacing */}
      <div className="pointer-events-none relative mt-8 md:mt-16 z-0 flex justify-center overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-display select-none whitespace-nowrap text-[10vw] font-black uppercase tracking-[0.14em] text-emerald-400/20 sm:text-[12vw] md:text-[10vw] lg:text-[8.5rem] md:text-emerald-300/40"
        >
          BrainMed
        </motion.p>
      </div>
    </section>
  );
}
