import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Quote, Volume2 } from "lucide-react";
import { audioTestimonials, testimonials } from "../../data/siteData";
import SectionHeading from "../layout/SectionHeading";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
}

export default function TestimonialsSection() {
  const [activeAudio, setActiveAudio] = useState(null);
  const audioRefs = useRef({});
  const [timeState, setTimeState] = useState({});

  useEffect(() => {
    const audioElements = Object.values(audioRefs.current);

    audioElements.forEach((audio) => {
      if (!audio) {
        return;
      }

      const key = audio.dataset.audioKey;

      const handleLoadedMetadata = () => {
        setTimeState((prev) => ({
          ...prev,
          [key]: {
            currentTime: audio.currentTime || 0,
            duration: audio.duration || 0,
          },
        }));
      };

      const handleTimeUpdate = () => {
        setTimeState((prev) => ({
          ...prev,
          [key]: {
            currentTime: audio.currentTime || 0,
            duration: audio.duration || 0,
          },
        }));
      };

      const handleEnded = () => {
        setActiveAudio(null);
        audio.currentTime = 0;
        setTimeState((prev) => ({
          ...prev,
          [key]: {
            currentTime: 0,
            duration: audio.duration || 0,
          },
        }));
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);

      audio._cleanup = () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
      };
    });

    return () => {
      audioElements.forEach((audio) => {
        if (audio?._cleanup) {
          audio._cleanup();
        }
      });
    };
  }, []);

  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      if (!audio) {
        return;
      }

      if (key === activeAudio) {
        audio.play().catch(() => {
          setActiveAudio(null);
        });
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }, [activeAudio]);

  const testimonialItems = testimonials.map((item, index) => ({
    ...item,
    audio: index === 0 ? audioTestimonials[0] : index === 2 ? audioTestimonials[1] : null,
  }));

  return (
    <section id="testimonials" className="relative px-4 py-12 md:py-24 overflow-hidden max-w-full">
      {/* Background Decor */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-100/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-100/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Student stories that build trust quickly."
          description="These can stay static for a lightweight setup now and later be connected to a CMS or database if needed."
        />

        <div className="mt-10 flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0 items-stretch">
          {testimonialItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="w-[280px] shrink-0 snap-center rounded-[2rem] bg-ink p-6 text-white shadow-panel flex flex-col sm:w-[320px] lg:w-full"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent-300">
                <Quote size={22} />
              </div>
              <p className="mt-5 text-base sm:text-lg leading-7 text-slate-200">
                "{item.review}"
              </p>
              {item.audio ? (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <audio
                    ref={(node) => {
                      if (node) {
                        audioRefs.current[item.audio.audioSrc] = node;
                      }
                    }}
                    data-audio-key={item.audio.audioSrc}
                    preload="metadata"
                    src={item.audio.audioSrc}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setActiveAudio(
                        activeAudio === item.audio.audioSrc ? null : item.audio.audioSrc,
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-2xl text-left transition hover:bg-white/5"
                    aria-label={
                      activeAudio === item.audio.audioSrc
                        ? `Pause ${item.name} audio testimonial`
                        : `Play ${item.name} audio testimonial`
                    }
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-soft">
                      {activeAudio === item.audio.audioSrc ? (
                        <Pause size={18} />
                      ) : (
                        <Play size={18} className="ml-0.5" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Volume2 size={15} className="text-accent-300" />
                        Listen to audio review
                      </span>
                      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-accent-300 to-brand-300 transition-[width] duration-200"
                          style={{
                            width: `${
                              (timeState[item.audio.audioSrc]?.duration || 0) > 0
                                ? ((timeState[item.audio.audioSrc]?.currentTime || 0) /
                                    (timeState[item.audio.audioSrc]?.duration || 1)) *
                                  100
                                : 0
                            }%`,
                          }}
                        />
                      </span>
                    </span>
                    <span className="text-xs font-medium text-slate-300">
                      {formatTime(timeState[item.audio.audioSrc]?.currentTime || 0)}
                    </span>
                  </button>
                </div>
              ) : null}
              <div className="mt-auto border-t border-white/10 pt-5">
                <p className="text-lg sm:text-xl font-bold">{item.name}</p>
                <p className="mt-1 text-sm sm:text-base text-brand-200">{item.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
