import { motion } from "framer-motion";
import { LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import SectionHeading from "../layout/SectionHeading";

const initialForm = {
  fullName: "",
  phone: "",
  parentPhone: "",
  email: "",
  preferredCountry: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await addDoc(collection(db, "students"), {
        name: form.fullName,
        phone: form.phone,
        parentPhone: form.parentPhone,
        email: form.email,
        courseInterested: "MBBS",
        countryInterested: form.preferredCountry,
        source: "online",
        status: "new",
        notes: form.message.trim(),
        notesHistory: [],
        createdAt: serverTimestamp(),
      });

      setForm(initialForm);
      setStatus({
        type: "success",
        message:
          "Your inquiry has been submitted successfully. Our team will contact you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong while submitting your inquiry.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <section id="contact" className="relative px-4 py-12 md:py-24 overflow-x-hidden max-w-full">
      {/* Background Decor */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-100/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-100/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Start Your Medical Journey With BrainMed"
          description="Have questions about studying MBBS abroad? Our expert counselors are ready to help you plan your career and guide you through the admission process."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-ink p-6 md:p-10 text-white shadow-panel"
          >
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-emerald-500 sm:text-xs">
              Talk to us
            </p>
            <h3 className="mt-4 text-2xl sm:text-3xl md:text-3xl font-bold">
              Ready to begin your student journey?
            </h3>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-200 md:leading-7">
              We provide comprehensive end-to-end guidance for MBBS admissions abroad. From university selection to visa processing and post-arrival support, our experienced team is here for you. Reach out to us for a free counseling session today.
            </p>

            <div className="mt-8 space-y-4 md:space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 md:h-12 md:w-12 md:rounded-2xl">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-400 md:text-sm">Phone</p>
                  <p className="text-sm font-medium text-white md:text-base">+91 91641 12779</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 md:h-12 md:w-12 md:rounded-2xl">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-400 md:text-sm">Email</p>
                  <p className="text-sm font-medium text-white md:text-base">brainmedconsultancy@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 md:h-12 md:w-12 md:rounded-2xl">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-400 md:text-sm">Office</p>
                  <p className="text-sm font-medium text-white md:text-base">Hassan, Karnataka, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass-panel rounded-[2rem] p-5 shadow-panel md:p-10"
          >
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <Field
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                placeholder="Your full name"
              />
              <Field
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={updateField}
                placeholder="Phone number"
              />
              <Field
                label="Parent/Father Number"
                name="parentPhone"
                value={form.parentPhone}
                onChange={updateField}
                placeholder="Alternative number"
                required={false}
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
              />
              <label className="md:col-span-2">
                <span className="mb-2 block text-[13px] font-bold text-slate-700 md:text-sm">
                  Preferred Country
                </span>
                <select
                  name="preferredCountry"
                  value={form.preferredCountry}
                  onChange={updateField}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500 md:py-4"
                >
                  <option value="">Select a country</option>
                  <option value="Russia">Russia</option>
                  <option value="USA">USA</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="UK">UK</option>
                  <option value="China">China</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Turkey">Turkey</option>
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-[13px] font-bold text-slate-700 md:text-sm">
                  Message
                </span>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={updateField}
                  placeholder="Tell us about your goals, intake, or questions..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500 md:py-4"
                />
              </label>
            </div>

            {status.message && (
              <div
                className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${status.type === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
                  }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400 px-8 h-12 md:h-14 text-sm font-bold text-white transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : null}
              Submit Inquiry
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, required = true }) {
  return (
    <label>
      <span className="mb-2 block text-[13px] font-bold text-slate-700 md:text-sm">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500 md:py-4.5"
      />
    </label>
  );
}
