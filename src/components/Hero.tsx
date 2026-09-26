import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { supabase } from "@/integrations/supabase/client";
import { cachedQuery } from "@/lib/queryCache";

const benefits = ["Student-led", "Mentor supported", "Impact focused"] as const;

const HERO_STAT_FALLBACKS = {
  solutions: 5,
  innovators: 22,
  mentors: 5,
} as const;

const fallbackSlides = [
  {
    image: "/img/presentation-img/presentation.jpg",
    title: "Ideas in motion",
    alt: "Students collaborating at a Binary Hub innovation event",
  },
  {
    image: "/img/presentation-img/team.jpg",
    title: "Built together",
    alt: "Binary Hub team members working together",
  },
  {
    image: "/img/presentation-img/IMG-20231019-WA0036.jpg",
    title: "People who create",
    alt: "Innovators presenting their work",
  },
  {
    image: "/img/presentation-img/guest-pic.jpg",
    title: "Shared knowledge",
    alt: "Guest speaker at a Binary Hub event",
  },
  {
    image: "/img/presentation-img/IMG-20231019-WA0017.jpg",
    title: "From prototype to impact",
    alt: "Binary Hub innovation showcase",
  },
];

type HeroCounts = {
  solutions: number;
  innovators: number;
  mentors: number;
};

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);
  const [counts, setCounts] = useState<HeroCounts>({
    solutions: 0,
    innovators: 0,
    mentors: 0,
  });
  const { slides } = useHeroSlides();

  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    cachedQuery("hero:counts", async () => {
      const [projectsRes, innovatorsRes, mentorsRes] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase
          .from("innovators")
          .select("id", { count: "exact", head: true })
          .eq("account_status", "active"),
        supabase
          .from("innovators")
          .select("id", { count: "exact", head: true })
          .eq("account_status", "active")
          .eq("status", "mentor"),
      ]);

      return {
        solutions: projectsRes.count ?? 0,
        innovators: innovatorsRes.count ?? 0,
        mentors: mentorsRes.count ?? 0,
      } satisfies HeroCounts;
    })
      .then((data) => {
        if (!cancelled) setCounts(data);
      })
      .finally(() => {
        if (!cancelled) setStatsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const displayedSlides =
    slides.length > 0
      ? slides.map((slide) => ({
          image: slide.image_url,
          title: slide.title,
          alt: slide.title,
        }))
      : fallbackSlides;

  const displayedStats = useMemo(
    () => [
      {
        id: "developed-solutions",
        value: String(counts.solutions > 0 ? counts.solutions : HERO_STAT_FALLBACKS.solutions),
        label: "Solutions",
        fullLabel: "Developed Solutions",
      },
      {
        id: "total-innovators",
        value: String(counts.innovators > 0 ? counts.innovators : HERO_STAT_FALLBACKS.innovators),
        label: "Innovators",
        fullLabel: "Total Innovators",
      },
      {
        id: "mentors",
        value: String(counts.mentors > 0 ? counts.mentors : HERO_STAT_FALLBACKS.mentors),
        label: "Mentors",
        fullLabel: "Mentors",
      },
    ],
    [counts]
  );
  useEffect(() => {
    if (displayedSlides.length === 0) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % displayedSlides.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [displayedSlides.length]);

  useEffect(() => {
    setActiveSlide(0);
  }, [displayedSlides.length]);

  const goPrev = () =>
    setActiveSlide((current) => (current - 1 + displayedSlides.length) % displayedSlides.length);
  const goNext = () =>
    setActiveSlide((current) => (current + 1) % displayedSlides.length);

  const statsItems = statsLoading
    ? Array.from({ length: 3 }).map((_, index) => ({
        id: `skeleton-${index}`,
        value: null as string | null,
        label: null as string | null,
        fullLabel: null as string | null,
      }))
    : displayedStats;

  const StatsGrid = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={
        compact
          ? "relative grid grid-cols-3 gap-0 px-2 py-3.5"
          : "relative grid grid-cols-3 gap-0 px-2 pb-3.5 pt-4 sm:px-6 sm:pb-5 sm:pt-6 md:px-8 md:pb-6 md:pt-8"
      }
    >
      {statsItems.map((stat, index) => {
        const arcLift = ["md:translate-y-3", "md:-translate-y-3", "md:translate-y-3"][index] ?? "";

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + index * 0.08, duration: 0.4 }}
            className={`relative flex flex-col items-center border-r border-[#00628b]/10 px-1.5 text-center last:border-r-0 sm:px-3 sm:py-2 ${compact ? "py-0.5" : "py-1"} ${arcLift}`}
          >
            {stat.value === null ? (
              <>
                <div className="h-7 w-10 animate-pulse rounded-md bg-[#00628b]/10 sm:h-9 sm:w-16" />
                <div className="mt-2 h-2.5 w-14 animate-pulse rounded bg-slate-300/70" />
              </>
            ) : (
              <>
                <span
                  className={`font-display font-extrabold tracking-tight text-[#00628b] ${
                    compact ? "text-[1.65rem]" : "text-2xl sm:text-3xl md:text-4xl"
                  }`}
                >
                  {stat.value}
                </span>
                <span
                  className={`mt-1 block font-semibold uppercase leading-tight tracking-[0.12em] text-slate-500 ${
                    compact ? "text-[9px]" : "text-[8px] sm:mt-1.5 sm:text-[10px] md:text-[11px]"
                  }`}
                >
                  <span className="md:hidden">{stat.label}</span>
                  <span className="hidden md:inline">{stat.fullLabel}</span>
                </span>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <section className="relative flex flex-col overflow-hidden md:h-screen md:min-h-[640px]">
      {/* Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/presentation-img/team.jpg"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#f4f7f9]/92 md:bg-gray-100/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f4f7f9]/80 to-white md:bg-gradient-to-r md:from-gray-100/80 md:via-gray-100/40 md:to-transparent" />
      </div>

      {/* ── Mobile composition ── */}
      <div className="relative z-10 flex flex-1 flex-col md:hidden">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-5 pt-[4.85rem]">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#00628b]">
              University of Rwanda
            </p>
            <h1 className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-tight text-slate-900">
              A space for
              <span className="mt-0.5 block text-[#00628b]">innovators</span>
            </h1>
            <p className="mx-auto mt-3 max-w-[17.5rem] text-[0.9rem] leading-relaxed text-slate-600">
              Students, mentors, and partners building practical solutions with impact.
            </p>
          </motion.div>

          <motion.div
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {benefits.map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm ring-1 ring-[#00628b]/10"
              >
                <Check className="h-3 w-3 text-[#00628b]" />
                {benefit}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="relative mt-5 flex-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            <div
              className="relative aspect-[5/3.4] w-full overflow-hidden rounded-[1.15rem] bg-slate-900 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)]"
              aria-roledescription="carousel"
              aria-label="Binary Hub highlights"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayedSlides[activeSlide]?.image ?? activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <img
                    src={displayedSlides[activeSlide]?.image}
                    alt={displayedSlides[activeSlide]?.alt}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 text-center text-white">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70">
                      From the community
                    </p>
                    <p className="mt-1 truncate text-[1.05rem] font-bold capitalize">
                      {displayedSlides[activeSlide]?.title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {displayedSlides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous highlight"
                    className="absolute left-2.5 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[#00628b] shadow-md"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next highlight"
                    className="absolute right-2.5 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[#00628b] shadow-md"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <div
                    className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 gap-1.5"
                    aria-label="Choose highlight"
                  >
                    {displayedSlides.map((slide, index) => (
                      <button
                        key={`${slide.title}-${index}`}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Show ${slide.title}`}
                        aria-current={activeSlide === index}
                        className={`h-1 rounded-full transition-all ${
                          activeSlide === index ? "w-4 bg-white" : "w-1.5 bg-white/45"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            className="mt-4 overflow-hidden rounded-[1rem] border border-[#00628b]/10 bg-white shadow-[0_10px_30px_-18px_rgba(0,98,139,0.35)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            aria-label="Binary Hub impact statistics"
          >
            <StatsGrid compact />
          </motion.div>
        </div>
      </div>

      {/* ── Desktop / tablet composition ── */}
      <div className="relative z-10 mx-auto hidden w-full max-w-7xl flex-1 flex-col justify-center px-8 pb-40 pt-24 md:flex md:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              <span className="block">A space for</span>
              <span className="block text-[#00628b]">innovators</span>
            </h1>
            <p className="mb-8 max-w-xl text-xl leading-relaxed text-gray-700 md:text-2xl">
              We bring students, mentors, and partners together in one supportive space to explore
              ideas, build practical solutions, and create meaningful impact in Rwanda and beyond.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-700">
              {benefits.map((benefit) => (
                <span key={benefit} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#00628b]" />
                  {benefit}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative w-full lg:w-[calc(100%+3rem)] lg:-mr-12 xl:w-[calc(100%+5rem)] xl:-mr-20 2xl:w-[calc(100%+7rem)] 2xl:-mr-28"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative z-10 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl"
              aria-roledescription="carousel"
              aria-label="Binary Hub highlights"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`desk-${displayedSlides[activeSlide]?.image ?? activeSlide}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={displayedSlides[activeSlide]?.image}
                    alt={displayedSlides[activeSlide]?.alt}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/75">
                      From the community
                    </p>
                    <p className="mt-1 truncate text-xl font-bold capitalize md:text-2xl">
                      {displayedSlides[activeSlide]?.title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {displayedSlides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous highlight"
                    className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#00628b] shadow-lg transition hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next highlight"
                    className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#00628b] shadow-lg transition hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div
                    className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-20"
                    aria-label="Choose highlight"
                  >
                    {displayedSlides.map((slide, index) => (
                      <button
                        key={`desk-dot-${slide.title}-${index}`}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Show ${slide.title}`}
                        aria-current={activeSlide === index}
                        className={`h-2 rounded-full transition-all ${
                          activeSlide === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop stats dock */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-20 hidden px-6 md:block md:px-12"
        aria-label="Binary Hub impact statistics"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="relative overflow-hidden border border-b-0 border-white/70 bg-white/85 shadow-[0_-12px_40px_-20px_rgba(0,98,139,0.35)] backdrop-blur-xl"
            style={{ borderRadius: "1.75rem 1.75rem 0 0" }}
          >
            <div className="pointer-events-none absolute -left-10 top-0 h-28 w-28 rounded-full bg-[#00628b]/10 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#00628b]/10 blur-2xl" />
            <StatsGrid />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
