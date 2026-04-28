import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-10 max-w-3xl text-center md:mb-16"
    >
      <p className="mb-3 font-display text-xs font-extrabold uppercase tracking-[0.35em] text-emerald-500 sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-ink">{title}</h2>
      <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
        {description}
      </p>
    </motion.div>
  );
}
