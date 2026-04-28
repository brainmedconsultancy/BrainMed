import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { services } from "../../data/siteData";
import SectionHeading from "../layout/SectionHeading";

export default function ServicesSection() {
  return (
    <section id="services" className="relative px-4 py-16 md:py-24 overflow-x-hidden max-w-full">
      {/* Background Decor */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-100/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-100/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="The full support students expect from a modern consultancy."
          description="Explore top study destinations worldwide with trusted guidance tailored to your academic goals."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="group rounded-[2rem] bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-panel"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <BriefcaseBusiness size={22} />
              </div>
              <h3 className="mt-5 text-xl sm:text-2xl font-bold text-ink">
                {service.title}
              </h3>
              <p className="mt-3 text-base sm:text-lg leading-7 text-slate-600">
                {service.description}
              </p>
              <div className="mt-5 h-1 w-16 rounded-full bg-emerald-500 transition-all duration-300 ease-in-out group-hover:w-28" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
