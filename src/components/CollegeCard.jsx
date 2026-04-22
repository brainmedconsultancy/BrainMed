// import { motion } from "framer-motion";
// import { BadgeCheck, Building2, GraduationCap, MapPin } from "lucide-react";

// export default function CollegeCard({ college, index }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.45, delay: index * 0.06 }}
//       className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
//             {college.rank}
//           </p>
//           <h3 className="mt-3 text-2xl font-bold text-ink">{college.name}</h3>
//         </div>
//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
//           <GraduationCap size={22} />
//         </div>
//       </div>

//       <div className="mt-5 grid gap-3 text-sm text-slate-600">
//         <div className="flex items-center gap-3">
//           <Building2 size={16} className="text-brand-500" />
//           <span>Founded in {college.founded}</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <MapPin size={16} className="text-brand-500" />
//           <span>{college.location}</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <GraduationCap size={16} className="text-brand-500" />
//           <span>{college.medium}</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <BadgeCheck size={16} className="text-emerald-500" />
//           <span>{college.recognition}</span>
//         </div>
//       </div>

//       <p className="mt-5 text-sm leading-7 text-slate-600">
//         {college.description}
//       </p>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  GraduationCap,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function CollegeCard({ college, index }) {
  const hasMapData = !!college.mapData;

  // Static map thumbnail — zero API key needed
  const staticMapUrl = hasMapData
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${college.mapData.latitude},${college.mapData.longitude}&zoom=15&size=800x350&maptype=roadmap&markers=color:red%7C${college.mapData.latitude},${college.mapData.longitude}`
    : null;

  const handleMapClick = () => {
    if (hasMapData) {
      window.open(college.mapData.mapsUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="rounded-[2rem] border border-slate-200 bg-white shadow-soft overflow-hidden"
    >
      {/* ── Static Map Preview (no API key needed) ── */}
      {staticMapUrl ? (
        <div
          onClick={handleMapClick}
          className="relative h-44 w-full overflow-hidden bg-slate-100 cursor-pointer group"
          title="Open in Google Maps"
        >
          {console.log(college.mapData.photoUrl)}
          <img
            src={college.mapData.photoUrl}
            alt={`Map location of ${college.name}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium text-brand-700 shadow-md">
              <MapPin size={14} />
              View on Google Maps
              <ExternalLink size={12} />
            </div>
          </div>
          {/* Location badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-700 shadow-sm">
            <MapPin size={11} className="text-brand-500" />
            {college.location}
          </div>
        </div>
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-brand-50">
          <GraduationCap size={48} className="text-brand-200" />
        </div>
      )}

      {/* ── Card Body ── */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {college.rank}
            </p>
            <h3 className="mt-3 text-2xl font-bold text-ink">{college.name}</h3>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <GraduationCap size={22} />
          </div>
        </div>

        <div className="mt-5 grid gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <Building2 size={16} className="text-brand-500" />
            <span>Founded in {college.founded}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-brand-500" />
            <span>{college.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <GraduationCap size={16} className="text-brand-500" />
            <span>{college.medium}</span>
          </div>
          <div className="flex items-center gap-3">
            <BadgeCheck size={16} className="text-emerald-500" />
            <span>{college.recognition}</span>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-600">
          {college.description}
        </p>

        {/* ── Google Maps Button ── */}
        {hasMapData && (
          <button
            onClick={handleMapClick}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50 py-2.5 text-sm font-medium text-brand-600 transition-all hover:bg-brand-100 hover:border-brand-200 hover:text-brand-700 active:scale-[0.98]"
          >
            <MapPin size={15} />
            View on Google Maps
            <ExternalLink size={13} className="opacity-70" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
