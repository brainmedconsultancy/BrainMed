import { motion } from "framer-motion";
import { teamMembers } from "../data/siteData";
import SectionHeading from "./SectionHeading";

export default function TeamSection() {
  return (
    <section id="team" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Team"
          title="The people behind the guidance."
          description="Team cards keep the brand human and credible while staying lightweight enough for a simple business website."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="rounded-[2rem] bg-white p-6 shadow-soft"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-200 to-brand-600 text-xl font-extrabold text-white">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h3 className="mt-5 text-2xl font-bold text-ink">{member.name}</h3>
              <p className="mt-2 font-semibold text-brand-600">{member.role}</p>
              <p className="mt-3 text-base leading-7 text-slate-600">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
