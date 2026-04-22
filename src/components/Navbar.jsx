import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Countries", href: "#countries" },
  { label: "MCA FAQ", href: "#mca-faq" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const resolveHref = (href) => (pathname === "/" ? href : `/${href}`);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 shadow-soft">
        <a
          href={resolveHref("#home")}
          className="flex items-center gap-3 sm:gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-brand-100 bg-white shadow-sm sm:h-14 sm:w-14">
            <img
              src="/logo.png"
              alt="BrainMed Logo"
              className="h-full w-full scale-[1.08] object-cover"
            />
          </div>
          <div>
            <p className="font-display text-lg font-bold leading-none text-ink sm:text-xl">
              BrainMed
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Study Abroad
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              className="text-sm font-semibold text-slate-700 transition hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href={resolveHref("#contact")}
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-gradient-to-b from-emerald-400 to-cyan-400"
          >
            Apply Now
          </a>
        </div>

        <button
          type="button"
          className="rounded-full bg-slate-100 p-3 text-slate-800 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl bg-white p-5 shadow-panel lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className="text-sm font-semibold text-slate-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={resolveHref("#contact")}
              className="rounded-full bg-brand-600 px-5 py-3 text-center text-sm font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
