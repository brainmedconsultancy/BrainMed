import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
import { countries } from "../data/siteData";
import SectionHeading from "./SectionHeading";

export default function CountriesSection() {
  return (
    <section id="countries" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Destinations"
          title="Countries your students can explore with confidence."
          description="Each destination is presented as a simple card with a short overview and services available for that country."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-br from-white to-brand-50 p-6 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
                  <MapPinned size={22} />
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Popular
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-ink">{country.name}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{country.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {country.services.map((service) => (
                  <span key={service} className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
