// end

import { motion } from "framer-motion";
import {
  CheckCheck,
  MessageCircleMore,
  Phone,
  Video,
  MoreVertical,
  Search,
  Send,
} from "lucide-react";
import { mbbsFaqChats } from "../../data/siteData";
import SectionHeading from "../layout/SectionHeading";

export default function McaChatFaqSection() {
  return (
    <section id="mca-faq" className="px-4 py-16 md:py-24 bg-white text-ink">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        {/* <div className="mb-12 text-center">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-brand-600 mb-3">
            MBBS Guidance / FAQS
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Student Counseling Chat
          </h2>
        </div> */}
        <SectionHeading
          eyebrow="MBBS Guidance / FAQS"
          title="Student Counseling Chat"
          // description="Real-time answers for your MBBS journey."
        />

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
          {/* Left Column: Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black p-6 sm:p-10 text-white shadow-2xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <MessageCircleMore size={28} />
            </div>
            <h3 className="mt-8 text-3xl font-bold leading-tight">
              Real-time answers for your MBBS journey.
            </h3>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              "We’ve answered the most frequent questions students ask about
              MBBS abroad, admissions, costs, and eligibility in a clear,
              easy-to-understand format."
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: "Direct Answers",
                  desc: "No fluff, just the facts you need.",
                },
                {
                  title: "Expert Insight",
                  desc: "Counseling based on years of MBBS data.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="h-2 w-2 mt-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: The Browser Mockup Chat */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] border border-slate-800 bg-[#0b141a] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Browser Top Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-[#1e293b]/50 px-6 py-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="hidden sm:block rounded-md bg-black/40 px-12 py-1 text-[11px] text-slate-500 font-mono tracking-wider border border-white/5">
                BrainMed.in/mbbs-counseling
              </div>
              <div className="flex gap-3 text-slate-400">
                <Search size={16} />
                <MoreVertical size={16} />
              </div>
            </div>

            {/* Chat Body */}
            <div className="h-[450px] sm:h-[600px] overflow-y-auto px-6 py-8 scrollbar-hide bg-[radial-gradient(circle_at_top_right,rgba(6,78,59,0.15),transparent)]">
              <div className="space-y-8">
                {mbbsFaqChats.map((item, index) => (
                  <div key={index} className="space-y-4">
                    {/* User Question (Right) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: 0.1,
                      }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[#064e3b] px-5 py-4 text-white shadow-lg">
                        <p className="text-[15px] leading-relaxed font-medium">
                          {item.question}
                        </p>
                        <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-emerald-300/70 uppercase font-bold tracking-tighter">
                          <span>{messageTime(index * 2)}</span>
                          <CheckCheck size={14} className="text-sky-400" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Counselor Answer (Left) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, x: -20 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: 0.3,
                      }}
                      className="flex justify-start gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-black text-white ring-2 ring-white/10">
                        GB
                      </div>
                      <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-[#202c33] px-5 py-4 text-white shadow-lg border border-white/5">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                            Counselor
                          </span>
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                            {item.highlight}
                          </span>
                        </div>
                        <p className="text-[15px] leading-relaxed text-slate-200">
                          {item.answer}
                        </p>
                        <div className="mt-2 text-right text-[10px] text-slate-500 font-bold uppercase">
                          {messageTime(index * 2 + 1)}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}

                {/* New Message Indicator */}
                <div className="flex items-center gap-4 py-4">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    New Message
                  </span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
              </div>
            </div>

            {/* Chat Footer Input */}
            <div className="border-t border-white/5 bg-[#1e293b]/30 p-4">
              <div className="flex items-center gap-3 rounded-full bg-black/40 border border-white/10 px-5 py-3">
                <div className="flex-1 text-sm text-slate-500">
                  Ask about Karnataka PGCET or MCA Colleges...
                </div>
                <div className="flex gap-4 text-slate-400">
                  <Video size={18} />
                  <Phone size={18} />
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    <Send size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function messageTime(step) {
  const baseHour = 10;
  const baseMinute = 45;
  const totalMinutes = baseHour * 60 + baseMinute + step * 2;
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
