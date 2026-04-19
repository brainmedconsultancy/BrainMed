import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../data/siteData";
import SectionHeading from "./SectionHeading";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Student stories that build trust quickly."
          description="These can stay static for a lightweight setup now and later be connected to a CMS or database if needed."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="rounded-[2rem] bg-ink p-6 text-white shadow-panel"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent-300">
                <Quote size={22} />
              </div>
              <p className="mt-5 text-base leading-7 text-slate-200">"{item.review}"</p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-lg font-bold">{item.name}</p>
                <p className="mt-1 text-sm text-brand-200">{item.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
