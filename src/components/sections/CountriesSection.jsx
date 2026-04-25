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
    <section id="countries" className="px-4 py-16 md:py-24">
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
