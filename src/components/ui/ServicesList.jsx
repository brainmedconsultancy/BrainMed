export default function ServicesList({ services }) {
  return (
    <div className="flex flex-wrap gap-3">
      {services.map((service) => (
        <span
          key={service}
          className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-500"
        >
          {service}
        </span>
      ))}
    </div>
  );
}
