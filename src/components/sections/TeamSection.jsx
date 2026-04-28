import { motion } from "framer-motion";
import { teamMembers } from "../../data/siteData";
import SectionHeading from "../layout/SectionHeading";

export default function TeamSection() {
  return (
    <section id="team" className="relative overflow-hidden px-4 py-16 md:py-24 max-w-full">
      {/* Background Decor */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-100/30 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Team"
          title="Meet our team."
          description="Meet the experts who support, guide, and empower students at every step of their study abroad journey. "
        />

        <div
          className="overflow-x-auto pb-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 transparent",
          }}
        >
          <div className="flex min-w-max gap-5">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="w-[280px] shrink-0 overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-sm md:w-[300px]"
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                    <span>Team Member</span>
                    <span>0{index + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-emerald-500">
                      {member.role}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-500">
                      {member.company}
                    </p>
                  </div>

                  <p className="text-sm leading-7 text-slate-600">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-sm font-medium text-slate-500">
          Swipe or scroll sideways to explore the team.
        </p>
      </div>
    </section>
  );
}
