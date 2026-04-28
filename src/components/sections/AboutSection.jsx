import { motion } from "framer-motion";
import { Award, Compass, Rocket } from "lucide-react";
import SectionHeading from "../layout/SectionHeading";

const cards = [
  {
    icon: Compass,
    title: "Mission",
    description:
      "Make international education decisions simpler, smarter, and more transparent for every student.",
  },
  {
    icon: Rocket,
    title: "Vision",
    description:
      "Build a guidance experience where students feel informed, prepared, and supported at every step.",
  },
  {
    icon: Award,
    title: "Background",
    description:
      "Built by experienced counselors with years of admissions, visa, and university application support.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-12 md:py-24 overflow-x-hidden max-w-full">
      {/* Background Decor */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-100/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-100/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About Us"
          title="A consultancy built for clarity, not confusion."
          description="We combine practical admissions experience, counseling discipline, and a modern student-first approach to help families make confident decisions."
        />

        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-ink p-6 md:p-10 text-white shadow-panel"
          >
            <p className="font-display text-sm uppercase tracking-[0.35em] text-emerald-500">
              Why families choose us
            </p>
            <h3 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold">
              Strong guidance, honest options, and a process that feels managed.
            </h3>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-7 text-slate-200">
              At BrainMed, we offer personalized guidance for students aiming to study MBBS abroad. Our expert team ensures a smooth, transparent, and hassle-free admission process, handling everything from university selection to visa assistance.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] md:rounded-[1.5rem] bg-white/10 p-5 md:p-6">
                <p className="text-3xl font-extrabold">12+</p>
                <p className="mt-2 text-sm text-slate-200">
                  Years in international admissions and student counseling
                </p>
              </div>
              <div className="rounded-[1.25rem] md:rounded-[1.5rem] bg-white/10 p-5 md:p-6">
                <p className="text-3xl font-extrabold">18</p>
                <p className="mt-2 text-sm text-slate-200">
                  Advisors and application specialists across key destinations
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="glass-panel rounded-[1.5rem] md:rounded-[2rem] p-6 shadow-soft"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl sm:text-2xl font-bold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base sm:text-lg leading-7 text-slate-600">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
