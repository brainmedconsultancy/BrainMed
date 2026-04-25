import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <p className="mb-3 font-display text-4xl font-extrabold uppercase tracking-[0.35em] text-emerald-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold text-ink md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}
