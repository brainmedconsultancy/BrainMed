import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { colleges } from "../data/siteData";
import SectionHeading from "./SectionHeading";

export default function CollegesSection() {
  const [query, setQuery] = useState("");

  const filteredColleges = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return colleges;
    }

    return colleges.filter((college) => {
      const haystack = [
        college.name,
        college.country,
        college.description,
        ...college.courses,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <section id="colleges" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="College Search"
          title="A simple searchable college list for quick discovery."
          description="Students can search by college name, country, or course keywords. Right now the data is static and lightweight, which keeps the feature fast and easy to maintain."
        />

        <div className="glass-panel mx-auto max-w-3xl rounded-full px-5 py-4 shadow-soft">
          <label className="flex items-center gap-3">
            <Search className="text-brand-600" size={20} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by college name, country, or course"
              className="w-full border-0 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredColleges.map((college, index) => (
            <motion.article
              key={college.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="rounded-[2rem] bg-white p-6 shadow-soft"
            >
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-600">{college.country}</p>
              <h3 className="mt-3 text-2xl font-bold text-ink">{college.name}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{college.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {college.courses.map((course) => (
                  <span key={course} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
                    {course}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {!filteredColleges.length && (
          <div className="mt-10 rounded-[2rem] bg-white p-8 text-center shadow-soft">
            <p className="text-lg font-bold text-ink">No colleges match your search.</p>
            <p className="mt-2 text-slate-600">Try a country name like Canada or a course like Data Science.</p>
          </div>
        )}
      </div>
    </section>
  );
}
