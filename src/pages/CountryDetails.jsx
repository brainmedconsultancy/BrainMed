import { motion } from "framer-motion";
import { ChevronRight, Home, MoveLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CollegeCard from "../components/ui/CollegeCard";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import OverviewItem from "../components/ui/OverviewItem";
import ServicesList from "../components/ui/ServicesList";
import { countryDetails } from "../data/countryDetailsData";
import { countries } from "../data/siteData";
import { useNavigate } from "react-router-dom";

const overviewLabels = {
  duration: "Duration of MBBS",
  medium: "Medium of Instruction",
  eligibility: "Eligibility",
  tuition: "Average Tuition Fees",
  livingCost: "Living Cost",
  climate: "Climate",
  recognition: "Recognition",
};

export default function CountryDetails() {
  const { countryName } = useParams();
  const country = countries.find((item) => item.slug === countryName);
  const details = countryDetails[countryName];
  const navigate = useNavigate();

  if (!country || !details) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">
              Country Not Found
            </p>
            <h1 className="mt-4 text-4xl font-bold text-ink">
              We could not find that destination.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Try going back to the countries section and selecting one of the
              available study destinations.
            </p>
            <Link
              to="/#countries"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-bold text-white"
            >
              <MoveLeft size={16} />
              Back to Countries
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const overviewItems = Object.entries(details.overview).map(
    ([key, value]) => ({
      label: overviewLabels[key] || key,
      value,
    }),
  );

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <main>
        <section className="px-4 pb-12 pt-10 md:pb-16 md:pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(72,159,255,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_28%),linear-gradient(135deg,#08111F_0%,#10315f_54%,#114BA7_100%)] p-8 text-white shadow-panel md:p-12">
              <div className="flex flex-wrap items-center gap-2 text-sm text-white/80 ">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Home size={16} />
                  Home
                </Link>
                <ChevronRight size={16} />
                <button
                  onClick={() => navigate(-1)}
                  className="transition hover:text-white"
                >
                  Countries
                </button>
                <ChevronRight size={16} />
                <span className="text-white">{country.name}</span>
              </div>

              <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-300">
                    Study Medicine In {country.name}
                  </p>
                  <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
                    Build your MBBS journey in {country.name} with better
                    clarity.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                    {country.description} Explore tuition ranges, living costs,
                    eligibility, services, and top universities before students
                    make their next move.
                  </p>
                  <div className="mt-8">
                    <Link
                      to="/#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-ink transition hover:bg-slate-100"
                    >
                      Get Admission Guidance
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
                    <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white/10">
                      <img
                        src={country.flagUrl.replace("/w80/", "/w320/")}
                        alt={`${country.name} flag`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {country.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/90"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">
                  Country Overview
                </p>
                <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
                  Key facts students usually ask first
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {overviewItems.map((item) => (
                <OverviewItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-soft md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Services Included
            </p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
              Support students expect for {country.name}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              These are the support areas your consultancy can highlight for
              this destination, from admissions to travel readiness.
            </p>
            <div className="mt-6">
              <ServicesList services={country.services} />
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-12 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Top Medical Universities
            </p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
              Recommended colleges in {country.name}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              A curated overview of strong university options students often
              compare when planning their MBBS journey abroad.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {details.universities.map((college, index) => (
                <CollegeCard
                  key={college.name}
                  college={college}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
