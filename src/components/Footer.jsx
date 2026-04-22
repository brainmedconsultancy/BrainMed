import { Mail, MapPin, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Countries", href: "#countries" },
  { label: "FAQ", href: "#mca-faq" },
  { label: "Contact", href: "#contact" },
];

const supportItems = [
  "University shortlisting",
  "MBBS admission guidance",
  "Visa documentation support",
];

const contactItems = [
  { label: "+91 98765 43210", icon: Phone },
  { label: "hello@globalbridge.com", icon: Mail },
  { label: "Bengaluru, India", icon: MapPin },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  const resolveHref = (href) => (pathname === "/" ? href : `/${href}`);

  return (
    <footer className="mb-8 px-4 pb-8 pt-14">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950 text-slate-200 shadow-[0_24px_70px_-30px_rgba(2,6,23,0.9)]">
        <div className="px-6 py-8 md:px-8 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
                  <img
                    src="/logo.png"
                    alt="BrainMed logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-white">
                    BrainMed
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-400">
                    MBBS Abroad
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Helping students pursue MBBS in foreign countries with clear,
                practical guidance.
              </p>

              <a
                href={resolveHref("#contact")}
                className="mt-5 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition-colors duration-300 hover:bg-emerald-400/15 hover:text-emerald-200"
              >
                Start your application
              </a>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.34em] text-emerald-400">
                  Quick Links
                </p>
                <div className="mt-4 grid gap-3">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={resolveHref(link.href)}
                      className="text-sm text-slate-300 transition-colors duration-300 hover:text-emerald-400"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-display text-xs uppercase tracking-[0.34em] text-emerald-400">
                  We Help With
                </p>
                <div className="mt-4 grid gap-3">
                  {supportItems.map((item) => (
                    <p key={item} className="text-sm leading-6 text-slate-300">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-display text-xs uppercase tracking-[0.34em] text-emerald-400">
                  Contact
                </p>
                <div className="mt-4 grid gap-3">
                  {contactItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <Icon size={16} className="mt-1 text-emerald-400" />
                        <span className="text-sm leading-6 text-slate-300">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
          <p>&copy; {currentYear} BrainMed. All rights reserved.</p>
          <p>Trusted support for MBBS abroad.</p>
        </div>
      </div>
    </footer>
  );
}
