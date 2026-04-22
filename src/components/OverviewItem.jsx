export default function OverviewItem({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-base font-semibold leading-7 text-ink">{value}</p>
    </div>
  );
}
