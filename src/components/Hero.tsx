import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { useProjects } from "@/hooks/useProjects";
import { useInnovators } from "@/hooks/useInnovators";

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

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { slides } = useHeroSlides();
  const { projects, loading: projectsLoading } = useProjects();
  const { innovators, loading: innovatorsLoading } = useInnovators();
  const statsLoading = projectsLoading || innovatorsLoading;

  const displayedSlides =
    slides.length > 0
      ? slides.map((slide) => ({
          image: slide.image_url,
          title: slide.title,
          alt: slide.title,
        }))
      : fallbackSlides;

  const displayedStats = useMemo(() => {
    // Same universe as /innovators "All innovators" badge: every active profile
    const totalMembers = innovators.length;
    const mentorCount = innovators.filter((person) => person.status === "mentor").length;
    const solutionsCount = projects.length;

    return [
      {
        id: "developed-solutions",
        value: String(solutionsCount > 0 ? solutionsCount : HERO_STAT_FALLBACKS.solutions),
        label: "Developed Solutions",
      },
      {
        id: "total-innovators",
        value: String(totalMembers > 0 ? totalMembers : HERO_STAT_FALLBACKS.innovators),
        label: "Total Innovators",
      },
      {
        id: "mentors",
        value: String(mentorCount > 0 ? mentorCount : HERO_STAT_FALLBACKS.mentors),
        label: "Mentors",
      },
    ];
  }, [projects.length, innovators]);

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

  return (
    <section className="relative h-screen min-h-[640px] flex flex-col overflow-hidden">
      {/* Background Image with Gray Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/presentation-img/team.jpg"
          alt="UR Binary Hub Innovators"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-100/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/80 via-gray-100/40 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white/80 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center max-w-7xl mx-auto w-full px-6 md:px-12 pt-24 pb-36 md:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-900">
              <motion.span
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                A space for
              </motion.span>
              <motion.span
                className="block text-[#00628b]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                innovators
              </motion.span>
            </h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              We bring students, mentors, and partners together in one supportive space to explore ideas, build practical solutions, and create meaningful impact in Rwanda and beyond.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {benefits.map((benefit) => (
                <span key={benefit} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#00628b]" />
                  {benefit}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Slide carousel - Right Side */}
          <motion.div
            className="order-1 lg:order-2 relative w-full lg:w-[calc(100%+3rem)] lg:-mr-12 xl:w-[calc(100%+5rem)] xl:-mr-20 2xl:w-[calc(100%+7rem)] 2xl:-mr-28"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative z-10 aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900"
              aria-roledescription="carousel"
              aria-label="Binary Hub highlights"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayedSlides[activeSlide]?.image ?? activeSlide}
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
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/75">
                      From the community
                    </p>
                    <p className="mt-1 text-xl sm:text-2xl font-bold truncate">
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
                    className="absolute bottom-16 sm:bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2"
                    aria-label="Choose highlight"
                  >
                    {displayedSlides.map((slide, index) => (
                      <button
                        key={`${slide.title}-${index}`}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Show ${slide.title}`}
                        aria-current={activeSlide === index}
                        className={`h-2 rounded-full transition-all ${
                          activeSlide === index
                            ? "w-7 bg-white"
                            : "w-2 bg-white/50 hover:bg-white"
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

      {/* Stats card — attached to bottom of viewport */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-6 md:px-12"
        aria-label="Binary Hub impact statistics"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="relative overflow-hidden border border-b-0 border-white/70 bg-white/75 shadow-[0_-12px_40px_-20px_rgba(0,98,139,0.35)] backdrop-blur-xl"
            style={{
              // Rounder on top only — flush to bottom vh
              borderRadius: "2.75rem 2.75rem 0 0",
            }}
          >
            <div className="pointer-events-none absolute -left-10 top-0 h-28 w-28 rounded-full bg-[#00628b]/10 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#00628b]/10 blur-2xl" />

            <div className="relative grid grid-cols-1 gap-y-1 px-4 pb-5 pt-6 sm:grid-cols-3 sm:px-6 md:gap-0 md:px-8 md:pb-6 md:pt-8">
              {(statsLoading
                ? Array.from({ length: 3 }).map((_, index) => ({
                    id: `skeleton-${index}`,
                    value: null as string | null,
                    label: null as string | null,
                  }))
                : displayedStats
              ).map((stat, index) => {
                const arcLift = [
                  "md:translate-y-3",
                  "md:-translate-y-3",
                  "md:translate-y-3",
                ][index] ?? "";

                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 + index * 0.08, duration: 0.45 }}
                    className={`relative flex flex-col items-center px-3 py-2 text-center sm:border-r sm:border-[#00628b]/10 sm:last:border-r-0 ${arcLift}`}
                  >
                    {stat.value === null ? (
                      <>
                        <div className="h-9 w-16 animate-pulse rounded-lg bg-[#00628b]/10" />
                        <div className="mt-3 h-3 w-24 animate-pulse rounded bg-slate-300/70" />
                      </>
                    ) : (
                      <>
                        <span className="font-display text-3xl font-extrabold tracking-tight text-[#00628b] md:text-4xl">
                          {stat.value}
                        </span>
                        <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-[11px]">
                          {stat.label}
                        </span>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
