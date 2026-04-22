import { motion } from "framer-motion";
import { LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { countries } from "../data/siteData";
import { createSubmission } from "../lib/submissions";
import SectionHeading from "./SectionHeading";

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  preferredCourse: "",
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
      await createSubmission({
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        course: form.preferredCourse,
        country: form.preferredCountry,
        message: form.message,
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
    <section id="contact" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let students reach out in one simple step."
          description="This inquiry form is connected to Firebase Firestore, so submissions can flow directly into the admin dashboard without requiring student accounts."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-ink p-8 text-white shadow-panel"
          >
            <p className="font-display text-sm uppercase tracking-[0.35em] text-brand-200">
              Talk to us
            </p>
            <h3 className="mt-4 text-3xl font-bold">
              Ready to begin your student journey?
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-200">
              Keep this section focused and direct so students can act quickly.
              The admin dashboard will then help your team manage leads
              efficiently.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-slate-300">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-slate-300">hello@globalbridge.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-semibold">Office</p>
                  <p className="text-slate-300">Bengaluru, India</p>
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
            className="glass-panel rounded-[2rem] p-6 shadow-panel md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
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
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
              />
              <Field
                label="Preferred Course"
                name="preferredCourse"
                value={form.preferredCourse}
                onChange={updateField}
                placeholder="MBA, Data Science, Nursing..."
              />

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Preferred Country
                </span>
                <select
                  name="preferredCountry"
                  value={form.preferredCountry}
                  onChange={updateField}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500"
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Message
                </span>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={updateField}
                  placeholder="Tell us about your goals, intake, or questions..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500"
                />
              </label>
            </div>

            {status.message && (
              <div
                className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
                  status.type === "success"
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
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400 px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
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

function Field({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500"
      />
    </label>
  );
}
