export default function ServicesList({ services }) {
  return (
    <div className="flex flex-wrap gap-3">
      {services.map((service) => (
        <span
          key={service}
          className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700"
        >
          {service}
        </span>
      ))}
    </div>
  );
}
