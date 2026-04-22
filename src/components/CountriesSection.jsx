import { useState } from "react";
import { motion } from "framer-motion";
import { countries } from "../data/siteData";
import SectionHeading from "./SectionHeading";

export default function CountriesSection() {
  const initialVisibleCount = 3;
  const [showAllCountries, setShowAllCountries] = useState(false);

  const visibleCountries = showAllCountries
    ? countries
    : countries.slice(0, initialVisibleCount);
  const hasMoreCountries = countries.length > initialVisibleCount;

  return (
    <section id="countries" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Destinations"
          title="Countries your students can explore with confidence."
          description="Each destination is presented as a simple card with a short overview and services available for that country."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCountries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white to-brand-50 shadow-soft"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={country.flagUrl}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent" />
                <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-sm">
                    Popular
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="text-2xl font-bold text-white drop-shadow-sm">
                    {country.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-base leading-7 text-slate-600">
                  {country.description}
                </p>
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
            </motion.div>
          ))}
        </div>

        {hasMoreCountries ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllCountries((current) => !current)}
              className="rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-500 shadow-sm transition hover:border-brand-300 hover:bg-brand-50"
            >
              {showAllCountries ? "Show less countries" : "Show more countries"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
