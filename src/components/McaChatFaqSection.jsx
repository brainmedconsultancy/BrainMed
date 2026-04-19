// import { motion } from "framer-motion";
// import {
//   CheckCheck,
//   MessageCircleMore,
//   Phone,
//   ShieldCheck,
//   Sparkles,
//   Video,
// } from "lucide-react";
// import { mcaFaqChats } from "../data/siteData";
// import SectionHeading from "./SectionHeading";

// export default function McaChatFaqSection() {
//   return (
//     <section id="mca-faq" className="px-4 py-16 md:py-24">
//       <div className="mx-auto max-w-7xl">
//         <SectionHeading
//           eyebrow="MCA Guidance"
//           title="A chat-style section that answers the big MCA questions students usually ask."
//           description="Inspired by conversational FAQ layouts, this section explains MCA in a more friendly question-and-answer format while still matching the consultancy website design."
//         />

//         <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr]">

//           <motion.div
//             initial={{ opacity: 0, x: 24 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 0.6 }}
//             className="rounded-[2.5rem] bg-slate-900 p-3 shadow-panel"
//           >
//             <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[#0b141a]">
//               <div className="flex items-center justify-between bg-[#202c33] px-5 py-4 text-white">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-extrabold">
//                     GB
//                   </div>
//                   <div>
//                     <p className="font-semibold">Global Bridge Counseling</p>
//                     <p className="text-xs text-emerald-300">online now</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 text-slate-300">
//                   <Video size={18} />
//                   <Phone size={18} />
//                 </div>
//               </div>

//               <div className="bg-[#efeae2] bg-[radial-gradient(circle_at_1px_1px,rgba(7,94,84,0.06)_1px,transparent_0)] bg-[length:22px_22px] px-4 py-5 md:px-6">
//                 <div className="mx-auto mb-5 w-fit rounded-full bg-[rgba(17,27,33,0.08)] px-4 py-2 text-center text-xs font-semibold text-slate-600">
//                   Typical student counseling questions about MCA
//                 </div>

//                 <div className="space-y-6">
//                   {mcaFaqChats.map((item, index) => (
//                     <motion.div
//                       key={item.question}
//                       initial={{ opacity: 0, y: 24 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true, amount: 0.2 }}
//                       transition={{ duration: 0.5, delay: index * 0.08 }}
//                     >
//                       <div className="flex justify-end">
//                         <div className="max-w-[85%] rounded-[1.2rem] rounded-br-sm bg-[#d9fdd3] px-4 py-3 text-[#111b21] shadow-[0_2px_10px_rgba(15,23,42,0.08)] md:max-w-[72%]">
//                           <p className="text-[15px] font-medium leading-7">
//                             {item.question}
//                           </p>
//                           <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-slate-500">
//                             <span>{messageTime(index * 2)}</span>
//                             <CheckCheck size={14} className="text-sky-500" />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-3 flex justify-start">
//                         <div className="max-w-[92%] rounded-[1.2rem] rounded-tl-sm bg-white px-4 py-3 text-[#111b21] shadow-[0_2px_10px_rgba(15,23,42,0.08)] md:max-w-[78%]">
//                           <div className="flex items-center gap-2">
//                             <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
//                               Counselor
//                             </span>
//                             <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
//                               {item.highlight}
//                             </span>
//                           </div>
//                           <p className="mt-3 text-[15px] leading-7 text-slate-700">
//                             {item.answer}
//                           </p>
//                           <div className="mt-2 flex items-center justify-end text-[11px] text-slate-500">
//                             <span>{messageTime(index * 2 + 1)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 bg-[#f0f2f5] px-4 py-3">
//                 <div className="flex-1 rounded-full bg-white px-5 py-3 text-sm text-slate-400 shadow-sm">
//                   Type your question about MCA...
//                 </div>
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft">
//                   <MessageCircleMore size={18} />
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function messageTime(step) {
//   const baseHour = 10;
//   const baseMinute = 12;
//   const totalMinutes = baseHour * 60 + baseMinute + step * 3;
//   const hours = Math.floor(totalMinutes / 60)
//     .toString()
//     .padStart(2, "0");
//   const minutes = (totalMinutes % 60).toString().padStart(2, "0");

//   return `${hours}:${minutes}`;
// }

{
  /* <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.25rem] bg-gradient-to-br from-ink via-slate-900 to-brand-900 p-8 text-white shadow-panel"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-300">
              <MessageCircleMore size={24} />
            </div>
            <p className="mt-6 font-display text-sm uppercase tracking-[0.35em] text-brand-200">
              Student Doubts
            </p>
            <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Make the FAQ feel like a real student counseling chat.
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-200">
              This version is designed to feel closer to WhatsApp: clearer
              message bubbles, stronger visual rhythm, and a more natural
              student-to-counselor flow. It turns an FAQ into something students
              will actually stop and read.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Why this works</p>
                    <p className="text-sm text-slate-300">
                      It feels more like a real inquiry chat than a static
                      content block.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-300 text-ink">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Best use cases</p>
                    <p className="text-sm text-slate-300">
                      Great for MCA, MBA, visa doubts, scholarships, or course
                      comparison questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div> */
}

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
import { mcaFaqChats } from "../data/siteData";

export default function McaChatFaqSection() {
  return (
    <section id="mca-faq" className="px-4 py-16 md:py-24 bg-white text-ink">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-brand-600 mb-3">
            MCA Guidance
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Student Counseling Chat
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
          {/* Left Column: Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black p-10 text-white shadow-2xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <MessageCircleMore size={28} />
            </div>
            <h3 className="mt-8 text-3xl font-bold leading-tight">
              Real-time answers for your MCA journey.
            </h3>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              We’ve compiled the most frequent doubts students have about
              Karnataka PGCET, college selections, and placements into a
              conversational flow.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: "Direct Answers",
                  desc: "No fluff, just the facts you need.",
                },
                {
                  title: "Expert Insight",
                  desc: "Counseling based on years of MCA data.",
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
                globalbridge.in/mca-counseling
              </div>
              <div className="flex gap-3 text-slate-400">
                <Search size={16} />
                <MoreVertical size={16} />
              </div>
            </div>

            {/* Chat Body */}
            <div className="h-[600px] overflow-y-auto px-6 py-8 scrollbar-hide bg-[radial-gradient(circle_at_top_right,rgba(6,78,59,0.15),transparent)]">
              <div className="space-y-8">
                {mcaFaqChats.map((item, index) => (
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

// new
// import { motion } from "framer-motion";
// import {
//   CheckCheck,
//   Send,
//   Mic,
//   Paperclip,
//   Phone,
//   Video,
//   MoreVertical,
//   Search,
//   ShieldCheck,
//   Sparkles,
//   MessageCircleMore,
//   GraduationCap,
//   Globe,
// } from "lucide-react";
// import { mcaFaqChats } from "../data/siteData";

// /* ─────────────────────────── helpers ─────────────────────────── */
// function msgTime(step) {
//   const t = 10 * 60 + 14 + step * 4;
//   return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
// }

// /* ─────────────────────────── variants ────────────────────────── */
// const stagger = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
// };

// const pop = {
//   hidden: { opacity: 0, scale: 0.88, y: 18 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 260, damping: 20 },
//   },
// };

// const slideLeft = {
//   hidden: { opacity: 0, x: -32 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const slideRight = {
//   hidden: { opacity: 0, x: 32 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// /* ═══════════════════════════════════════════════════════════════
//    SINGLE COMPONENT
// ═══════════════════════════════════════════════════════════════ */
// export default function McaChatFaqSection() {
//   return (
//     /* ── PARENT / NAV WRAPPER — put your id / ref here ── */
//     <section
//       id="mca-faq"
//       className="relative overflow-hidden bg-[#030712] px-4 py-24 md:py-32"
//     >
//       {/* ── Ambient blobs ── */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -left-48 top-1/4 h-[600px] w-[600px] rounded-full bg-indigo-900/20 blur-[130px]" />
//         <div className="absolute -right-48 bottom-1/4 h-[600px] w-[600px] rounded-full bg-violet-900/10 blur-[160px]" />
//         <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
//       </div>

//       <div className="relative mx-auto max-w-7xl">
//         {/* ── Section eyebrow ── */}
//         <motion.div
//           initial={{ opacity: 0, y: -12 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="mb-14 flex justify-center"
//         >
//           <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400">
//             <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
//             MCA Student FAQ · Live Counseling
//           </span>
//         </motion.div>

//         {/* ── Two-column grid ── */}
//         <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
//           {/* ════════════════════════════════
//               LEFT — Sidebar card
//           ════════════════════════════════ */}
//           <motion.div
//             variants={slideLeft}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.25 }}
//             className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-[#0d1230] to-black p-8 ring-1 ring-white/10 shadow-2xl"
//           >
//             {/* Icon + label */}
//             <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 ring-1 ring-indigo-500/30">
//               <MessageCircleMore
//                 size={26}
//                 className="text-indigo-300"
//                 strokeWidth={1.7}
//               />
//             </div>

//             <div>
//               <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
//                 Student Guidance
//               </p>
//               <h3 className="text-[1.9rem] font-black leading-tight tracking-tight text-white">
//                 Real doubts.
//                 <br />
//                 Real answers.
//                 <br />
//                 <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text text-transparent">
//                   Zero jargon.
//                 </span>
//               </h3>
//             </div>

//             <p className="text-sm leading-7 text-slate-400">
//               We transformed the most-Googled MCA questions into a live
//               counselor chat. Scroll down and watch the conversation unfold —
//               one clear answer at a time.
//             </p>

//             {/* Feature chips */}
//             <div className="space-y-3">
//               {[
//                 {
//                   icon: (
//                     <Sparkles
//                       size={15}
//                       strokeWidth={1.8}
//                       className="text-indigo-300"
//                     />
//                   ),
//                   bg: "bg-indigo-500/10 ring-indigo-500/20",
//                   title: "Why this format works",
//                   desc: "Conversational UI gets 3× more engagement than static FAQ blocks.",
//                 },
//                 {
//                   icon: (
//                     <ShieldCheck
//                       size={15}
//                       strokeWidth={1.8}
//                       className="text-violet-300"
//                     />
//                   ),
//                   bg: "bg-violet-500/10 ring-violet-500/20",
//                   title: "What it covers",
//                   desc: "Eligibility, duration, salary, entrance exams, distance mode & more.",
//                 },
//                 {
//                   icon: (
//                     <GraduationCap
//                       size={15}
//                       strokeWidth={1.8}
//                       className="text-sky-300"
//                     />
//                   ),
//                   bg: "bg-sky-500/10 ring-sky-500/20",
//                   title: "Who answers",
//                   desc: "Certified counselors with 8+ years in Indian postgrad admissions.",
//                 },
//               ].map(({ icon, bg, title, desc }) => (
//                 <div
//                   key={title}
//                   className={`flex items-start gap-3 rounded-2xl p-4 ring-1 backdrop-blur-md ${bg} bg-white/5`}
//                 >
//                   <div
//                     className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ring-1 ${bg}`}
//                   >
//                     {icon}
//                   </div>
//                   <div>
//                     <p className="mb-0.5 text-xs font-bold text-slate-200">
//                       {title}
//                     </p>
//                     <p className="text-xs leading-relaxed text-slate-500">
//                       {desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-3 pt-2">
//               {[
//                 { num: "500+", label: "Guided" },
//                 { num: "98%", label: "Satisfied" },
//                 { num: "24/7", label: "Available" },
//               ].map(({ num, label }) => (
//                 <div
//                   key={label}
//                   className="rounded-xl bg-white/5 py-3 text-center ring-1 ring-white/10"
//                 >
//                   <p className="text-base font-black text-indigo-300">{num}</p>
//                   <p className="text-[10px] font-semibold text-slate-500">
//                     {label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* ════════════════════════════════
//               RIGHT — Browser mockup + chat
//           ════════════════════════════════ */}
//           <motion.div
//             variants={slideRight}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
//           >
//             {/* ── Browser chrome bar ── */}
//             <div className="flex items-center gap-3 bg-[#111827] px-5 py-3.5 border-b border-white/[0.07]">
//               {/* Traffic light dots */}
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f5780]" />
//                 <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e80]" />
//                 <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c84080]" />
//               </div>

//               {/* URL bar */}
//               <div className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1f2937] px-4 py-1.5 mx-4">
//                 <Globe
//                   size={11}
//                   className="text-emerald-400 flex-shrink-0"
//                   strokeWidth={2}
//                 />
//                 <span className="font-mono text-[11.5px] tracking-wide text-slate-400 select-none">
//                   counseling.globalbridge.com/faq
//                 </span>
//               </div>

//               {/* Right icons */}
//               <div className="flex items-center gap-3 flex-shrink-0 text-slate-600">
//                 <Search size={13} strokeWidth={2} />
//                 <MoreVertical size={13} strokeWidth={2} />
//               </div>
//             </div>

//             {/* ── WhatsApp-style chat ── */}
//             <div className="bg-[#0b141a]">
//               {/* Chat contact header */}
//               <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#182229] px-5 py-3">
//                 <div className="flex items-center gap-3">
//                   <div className="relative">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[11px] font-black text-white shadow-lg">
//                       GB
//                     </div>
//                     <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#182229] bg-emerald-400" />
//                   </div>
//                   <div>
//                     <p className="text-[13px] font-semibold text-slate-100">
//                       Global Bridge Counseling
//                     </p>
//                     <p className="text-[11px] text-emerald-400 font-medium">
//                       online · replies instantly
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 text-slate-500">
//                   <Video size={18} strokeWidth={1.7} />
//                   <Phone size={18} strokeWidth={1.7} />
//                   <Search size={18} strokeWidth={1.7} />
//                   <MoreVertical size={18} strokeWidth={1.7} />
//                 </div>
//               </div>

//               {/* ── Messages ── */}
//               <div className="max-h-[560px] overflow-y-auto scroll-smooth px-4 py-6 md:px-6">
//                 {/* Date pill */}
//                 <div className="mb-6 text-center">
//                   <span className="rounded-full bg-[#1f2937] px-4 py-1.5 text-[11px] font-semibold text-slate-500">
//                     Today — MCA Counseling Session
//                   </span>
//                 </div>

//                 {/* Staggered message pairs */}
//                 <motion.div
//                   variants={stagger}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true, amount: 0.05 }}
//                   className="flex flex-col gap-6"
//                 >
//                   {mcaFaqChats.map((item, index) => (
//                     <motion.div key={item.question} variants={pop}>
//                       {/* New message separator */}
//                       {index === 1 && (
//                         <div className="mb-6 flex items-center gap-3">
//                           <div className="h-px flex-1 bg-white/[0.07]" />
//                           <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
//                             New Messages
//                           </span>
//                           <div className="h-px flex-1 bg-white/[0.07]" />
//                         </div>
//                       )}

//                       {/* Student — right aligned */}
//                       <div className="flex justify-end">
//                         <div
//                           className="max-w-[74%] px-4 py-3 shadow-lg"
//                           style={{
//                             background: "#065f46",
//                             borderRadius: "1.25rem 1.25rem 0.25rem 1.25rem",
//                           }}
//                         >
//                           <p className="text-[14.5px] font-[450] leading-[1.65] text-slate-100">
//                             {item.question}
//                           </p>
//                           <div className="mt-2 flex items-center justify-end gap-1.5">
//                             <span className="text-[10px] text-emerald-300/60">
//                               {msgTime(index * 2)}
//                             </span>
//                             <CheckCheck
//                               size={13}
//                               className="text-sky-400"
//                               strokeWidth={2.5}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Counselor — left aligned */}
//                       <div className="mt-2 flex items-end gap-2.5">
//                         {/* Avatar */}
//                         <div className="mb-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[8px] font-black text-white shadow">
//                           GB
//                         </div>
//                         <div
//                           className="max-w-[78%] px-4 py-3 shadow-lg"
//                           style={{
//                             background: "#1e293b",
//                             borderRadius: "1.25rem 1.25rem 1.25rem 0.25rem",
//                           }}
//                         >
//                           <div className="mb-2 flex items-center gap-2">
//                             <span className="text-[9px] font-black uppercase tracking-[0.18em] text-indigo-400">
//                               Counselor
//                             </span>
//                             <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-indigo-300">
//                               {item.highlight}
//                             </span>
//                           </div>
//                           <p className="text-[14.5px] leading-[1.65] text-slate-300">
//                             {item.answer}
//                           </p>
//                           <div className="mt-2 text-right text-[10px] text-slate-600">
//                             {msgTime(index * 2 + 1)}
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </div>

//               {/* ── Input bar ── */}
//               <div className="flex items-center gap-2 border-t border-white/[0.06] bg-[#182229] px-4 py-3">
//                 <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/5 hover:text-slate-300">
//                   <Paperclip size={18} strokeWidth={1.7} />
//                 </button>
//                 <div className="flex flex-1 items-center rounded-full bg-[#2a3942] px-5 py-2.5">
//                   <span className="select-none text-[13px] text-slate-500">
//                     Type your doubt...
//                   </span>
//                 </div>
//                 <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/5 hover:text-slate-300">
//                   <Mic size={18} strokeWidth={1.7} />
//                 </button>
//                 <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg transition hover:opacity-90 active:scale-95">
//                   <Send size={15} strokeWidth={2} />
//                 </button>
//               </div>
//             </div>
//             {/* END chat */}
//           </motion.div>
//           {/* END browser mockup */}
//         </div>
//       </div>
//     </section>
//     /* ── END PARENT / NAV WRAPPER ── */
//   );
// }
