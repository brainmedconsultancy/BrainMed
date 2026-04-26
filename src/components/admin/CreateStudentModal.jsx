import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { COUNTRIES, validateForm } from "./constants";

export default function CreateStudentModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    parentPhone: "",
    email: "",
    countryInterested: COUNTRIES[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setCreateError("");
    const errorMsg = validateForm(formData);
    if (errorMsg) {
      setCreateError(errorMsg);
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "students"), {
        name: formData.name,
        phone: formData.phone,
        parentPhone: formData.parentPhone,
        email: formData.email,
        countryInterested: formData.countryInterested,
        source: "offline",
        status: "new",
        createdAt: serverTimestamp(),
        notes: ""
      });
      setFormData({ name: "", phone: "", parentPhone: "", email: "", countryInterested: COUNTRIES[0] });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating student:", error);
      setCreateError("Failed to create student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200 md:rounded-[2.5rem]"
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-5 md:px-8 md:py-6">
              <h2 className="text-xl font-bold text-ink md:text-2xl">New Student</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
              <form onSubmit={handleCreateStudent} className="space-y-6">
                {createError && (
                  <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                    {createError}
                  </div>
                )}

                <div className="space-y-5">
                  <InputField label="Student Name" name="name" value={formData.name} onChange={handleInputChange} required />
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputField label="Student Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                    <InputField label="Parent Phone" name="parentPhone" type="tel" value={formData.parentPhone} onChange={handleInputChange} />
                  </div>
                  <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  <SelectField label="Target Country" name="countryInterested" value={formData.countryInterested} onChange={handleInputChange} options={COUNTRIES} />
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-slate-50 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="order-2 rounded-full px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="order-1 rounded-full bg-brand-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700 sm:order-2 sm:py-3"
                  >
                    {isSubmitting ? "Creating..." : "Save Student"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Helper Components
function InputField({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
      />
    </div>
  );
}

function SelectField({ label, options, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">{label}</label>
      <select
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

