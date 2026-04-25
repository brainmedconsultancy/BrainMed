import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PhoneCall } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../lib/firebase";

const COUNTRIES = ["Russia", "USA", "Georgia", "Kyrgyzstan", "UK", "China", "Singapore", "Malaysia", "Turkey"];

const CallbackPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    parentPhone: '',
    countryInterested: COUNTRIES[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if already submitted (persistent) or shown in this session
    const hasBeenShown = sessionStorage.getItem('callback_popup_shown');
    const hasBeenSubmitted = localStorage.getItem('callback_submitted');

    if (hasBeenShown || hasBeenSubmitted) return;

    const startObserving = () => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) {
        // Retry after a short delay if section isn't found yet
        setTimeout(startObserving, 500);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
              sessionStorage.setItem('callback_popup_shown', 'true');
            }, 800);
            observer.disconnect();
          }
        },
        { threshold: 0.1 } // More sensitive: trigger at 10% visibility
      );

      observer.observe(aboutSection);
      return observer;
    };

    const observerInstance = startObserving();
    return () => observerInstance?.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) return;
    
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "students"), {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        parentPhone: formData.parentPhone.trim(),
        email: "", // Not asked in popup but kept for schema consistency
        countryInterested: formData.countryInterested,
        courseInterested: "MBBS",
        source: "online",
        status: "new",
        notes: "Requested via Scroll-triggered Callback Popup",
        notesHistory: [],
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);
      localStorage.setItem('callback_submitted', 'true');
      
      // Auto close after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    } catch (error) {
      console.error("Error submitting callback request:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          {/* Popup Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            style={{ 
              msOverflowStyle: 'none', 
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            className="relative w-full max-w-md max-h-[95vh] overflow-y-auto rounded-[2.5rem] bg-white p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/5 [&::-webkit-scrollbar]:hidden"
          >
            {isSubmitted ? (
              <div className="py-8 md:py-12 text-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="mx-auto mb-6 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-ink">Request Sent!</h2>
                <p className="mt-4 text-base md:text-lg text-slate-600 px-4">
                  Awesome! Our counseling team will reach out to you shortly.
                </p>
                <button 
                  onClick={handleClose}
                  className="mt-8 px-8 py-3 rounded-xl bg-slate-100 font-bold text-slate-700 transition hover:bg-slate-200 active:scale-95"
                >
                  Got it, thanks!
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-[1.25rem] bg-brand-50 text-brand-600">
                    <PhoneCall size={24} className="md:w-7 md:h-7" />
                  </div>
                  <button 
                    onClick={handleClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-ink"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-6 md:mt-8">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight text-ink">Request a Call Back</h2>
                  <p className="mt-2 md:mt-3 text-sm md:text-base text-slate-600">
                    Get a personalized <span className="font-bold text-brand-600">MBBS counseling</span> session over the phone.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 md:mt-10 space-y-4 md:space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="How should we address you?"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 md:py-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="10-digit mobile number"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 md:py-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Parent/Father Number</label>
                    <input 
                      type="tel" 
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                      placeholder="Alternative contact"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 md:py-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Target Country</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.countryInterested}
                        onChange={(e) => setFormData({...formData, countryInterested: e.target.value})}
                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 md:py-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                      >
                        {COUNTRIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative mt-4 w-full overflow-hidden rounded-2xl bg-brand-600 py-3.5 md:py-4 font-bold text-white shadow-xl transition-all hover:bg-brand-700 hover:shadow-brand-600/25 active:scale-[0.98] disabled:opacity-70"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? "Processing..." : "Request Call Back"}
                    </span>
                  </button>
                  
                  <p className="text-center text-[10px] md:text-[11px] text-slate-400 px-4">
                    By submitting, you agree to receive a call from our expert counselors.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CallbackPopup;
