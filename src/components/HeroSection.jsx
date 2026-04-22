import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Globe, Sparkles } from "lucide-react";
import { stats } from "../data/siteData";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-24 pt-10 md:pb-7 md:pt-16"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-soft"
            >
              <Sparkles size={16} />
              Trusted support for global admissions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mt-6 max-w-3xl font-display text-5xl font-bold leading-tight text-ink md:text-7xl"
            >
              Turn your study abroad plan into a confident next move.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl"
            >
              BrainMed helps students choose the right country, shortlist
              colleges, manage applications, and navigate visas with clarity
              from day one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.7 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400 px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-700"
              >
                Apply Now
                <ArrowRight size={16} />
              </a>
              <a
                href="#colleges"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-900 transition hover:border-brand-200 hover:text-brand-700"
              >
                Explore Colleges
              </a>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08, duration: 0.6 }}
                  className="glass-panel rounded-3xl p-5 shadow-soft"
                >
                  <p className="text-3xl font-extrabold text-ink">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="absolute -left-10 top-16 hidden h-28 w-28 rounded-full bg-accent-300/40 blur-3xl md:block" />
            <div className="absolute -right-8 bottom-10 hidden h-36 w-36 rounded-full bg-brand-300/40 blur-3xl md:block" />

            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 shadow-panel md:p-8">
              <div className="absolute inset-0 bg-grid-fade bg-[size:26px_26px] opacity-20" />
              <div className="relative space-y-5">
                <div className="rounded-[1.75rem] bg-white/10 p-5 text-white backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-brand-200">
                        Advisory Flow
                      </p>
                      <h3 className="mt-2 text-2xl font-bold">
                        From first call to campus arrival
                      </h3>
                    </div>
                    <Globe className="text-accent-300" />
                  </div>
                  <div className="mt-6 grid gap-4">
                    {[
                      "Profile review and destination match",
                      "College shortlist with budget planning",
                      "Application and visa documentation support",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3"
                      >
                        <BadgeCheck size={18} className="text-accent-300" />
                        <span className="text-sm font-medium text-slate-100">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-white p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Top Focus
                    </p>
                    <p className="mt-3 text-2xl font-extrabold text-ink">
                      Career-first planning
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      We help students make destination choices that also make
                      sense for long-term work goals.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-gradient-to-b from-emerald-400 to-cyan-400 bg-opacity-20 p-5 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">
                      Response Time
                    </p>
                    <p className="mt-3 text-2xl font-extrabold">
                      Fast inquiry follow-up
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-50">
                      Your team can review form submissions quickly from the
                      admin dashboard and act without delay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className=" pointer-events-none  inset-x-0 bottom-2 z-0 flex justify-center md:-bottom-11">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8 }}
          className="select-none whitespace-nowrap font-display text-[4.1rem] font-black uppercase tracking-[0.14em] text-emerald-400 drop-shadow-[0_10px_34px_rgba(52,211,153,0.3)] sm:text-[5.8rem] md:text-[7.8rem] lg:text-[9.4rem]"
        >
          BrainMed
        </motion.p>
      </div>
    </section>
  );
}
