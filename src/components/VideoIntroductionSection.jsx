import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const defaultProps = {
  sectionId: "video-introduction",
  topText: "A new Journey in your life",
  introName: "Shashank",
  introDescription:
    "We guide students to pursue MBBS in foreign countries with complete support for admission, documentation, and visa processing.",

  rightCardText:
    "Trusted consultancy helping students secure MBBS seats in recognized international medical universities.",
  signatureText: "BrainMed",
  videoSrc: "",
  instagramReelUrl: "https://www.instagram.com/reel/DLzrLKURCKN/",
  posterSrc: "",
};

function getInstagramEmbedUrl(url) {
  if (!url) {
    return "";
  }

  try {
    const parsedUrl = new URL(url);
    const normalizedPath = parsedUrl.pathname.replace(/\/+$/, "");

    if (normalizedPath.includes("/reel/")) {
      return `https://www.instagram.com${normalizedPath}/embed?/theme=dark`;
    }

    return url;
  } catch {
    return url;
  }
}

function FloatingCard({
  className,
  children,
  delay = 0,
  x = 0,
  duration = 5.5,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y: 24 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -6, 0, 6, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function VideoIntroductionSection(props) {
  const {
    sectionId,
    topText,
    introName,
    introDescription,
    rightCardText,
    signatureText,
    videoSrc,
    instagramReelUrl,
    posterSrc,
  } = { ...defaultProps, ...props };

  const instagramEmbedUrl = getInstagramEmbedUrl(instagramReelUrl);

  return (
    <section
      id={sectionId}
      className="relative overflow-hidden px-4 py-20 text-slate-950 md:py-28"
    >
      <SectionHeading
        eyebrow="WATCH NOW"
        title="Medical Admissions, Simplified"
        description="Real-time answers for your MBBS journey."
      />
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-brand-200/25 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-accent-200/20 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent" />

      <div className="mx-auto max-w-6xl ">
        <div className="relative flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 18, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold tracking-[0.18em] text-slate-700 shadow-sm"
          >
            {topText}
          </motion.p>

          <div className="relative flex w-full justify-center px-0 md:px-24">
            <FloatingCard
              delay={0.3}
              x={-40}
              duration={5.8}
              className="pointer-events-none absolute left-0 top-1/2 z-10 hidden w-72 -translate-y-1/2 md:block lg:left-10"
            >
              <div className="rounded-3xl border border-gray-100 bg-white/90 p-5 text-slate-900 shadow-lg backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Hello, I&apos;m {introName}
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {introDescription}
                </p>
              </div>
            </FloatingCard>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75 }}
              className="relative z-20 w-full max-w-[22rem] sm:max-w-[24rem]"
            >
              <div className="absolute inset-0 scale-[1.04] rounded-[2rem] bg-slate-900/15 blur-2xl " />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 p-3 shadow-[0_28px_80px_-20px_rgba(15,23,42,0.55)] sm:rounded-[2.25rem]">
                <div className="aspect-[9/16] overflow-hidden rounded-[1.5rem] border border-slate-800/80 bg-slate-900">
                  {instagramEmbedUrl ? (
                    <iframe
                      className="h-full w-full"
                      src={instagramEmbedUrl}
                      title="Instagram introduction reel"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : videoSrc ? (
                    <video
                      className="h-full w-full object-cover"
                      src={videoSrc}
                      poster={posterSrc || undefined}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-800 via-slate-900 to-black p-8 text-center">
                      <div>
                        <p className="font-display text-2xl font-bold text-slate-100">
                          Video Preview
                        </p>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                          Pass a `videoSrc` or `instagramReelUrl` prop to render
                          your portrait introduction here.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <FloatingCard
              delay={0.42}
              x={40}
              duration={6.2}
              className="pointer-events-none absolute right-0 top-[58%] z-10 hidden w-72 -translate-y-1/2 md:block lg:right-8"
            >
              <div className="rounded-3xl border border-gray-100 bg-white/90 p-5 text-slate-900 shadow-lg backdrop-blur-md">
                <p className="text-base leading-7 text-slate-700">
                  {rightCardText}
                </p>
              </div>
            </FloatingCard>
          </div>

          <div className="mt-8 grid w-full max-w-3xl gap-4 md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-gray-100 bg-white/90 p-5 text-slate-900 shadow-lg backdrop-blur-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Hello, I&apos;m {introName}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {introDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl border border-gray-100 bg-white/90 p-5 text-slate-900 shadow-lg backdrop-blur-md"
            >
              <p className="text-base leading-7 text-slate-700">
                {rightCardText}
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 text-center text-4xl text-slate-950 sm:text-5xl md:text-6xl"
            style={{ fontFamily: '"Brush Script MT", "Segoe Script", cursive' }}
          >
            {signatureText}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
