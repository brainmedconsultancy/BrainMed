import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "../../data/siteData";
import CountryCard from "../ui/CountryCard";
import SectionHeading from "../layout/SectionHeading";

export default function CountriesSection() {
  const initialVisibleCount = 3;
  const [showAllCountries, setShowAllCountries] = useState(false);
  const navigate = useNavigate();

  const visibleCountries = showAllCountries
    ? countries
    : countries.slice(0, initialVisibleCount);
  const hasMoreCountries = countries.length > initialVisibleCount;

  return (
    <section id="countries" className="relative px-4 py-16 md:py-24 overflow-x-hidden max-w-full">
      {/* Background Decor */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-100/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-100/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Destinations"
          title="Countries your students can explore with confidence."
          description="Each destination is presented as a simple card with a short overview and services available for that country."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCountries.map((country, index) => (
            <CountryCard
              key={country.name}
              country={country}
              index={index}
              onClick={() => navigate(`/countries/${country.slug}`)}
            />
          ))}
        </div>

        {hasMoreCountries ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllCountries((current) => !current)}
              className="rounded-full border border-brand-200 bg-white px-8 h-12 w-full md:w-auto text-sm font-semibold text-emerald-500 shadow-sm transition hover:border-brand-300 hover:bg-brand-50"
            >
              {showAllCountries ? "Show less countries" : "Show more countries"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
