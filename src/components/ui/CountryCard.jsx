import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CountryCard({ country, index, onClick }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onClick={onClick}
      className="group overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white to-brand-50 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-panel"
    >
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={country.flagUrl}
          alt={`${country.name} flag`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />
        <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-sm">
            MBBS Abroad
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition group-hover:bg-white">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <h3 className="text-2xl font-bold text-white drop-shadow-sm">
            {country.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-base leading-7 text-slate-600">{country.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {country.services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
