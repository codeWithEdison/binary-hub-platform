import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { useStats } from "@/hooks/useStats";

const heroSlides = [
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
    description: "A focused home for student innovators, mentors, and partners building Rwanda's digital future together.",
    alt: "Binary Hub innovation showcase",
  },
];

const HeroComparison = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { slides } = useHeroSlides();
  const displayedSlides = slides.length > 0
    ? slides.map((slide) => ({
        image: slide.image_url,
        title: slide.title,
        description: slide.description,
        alt: slide.title,
      }))
    : heroSlides.map((slide) => ({
        ...slide,
        description: "A focused home for student innovators, mentors, and partners building Rwanda's digital future together.",
      }));
  const { stats, loading: statsLoading } = useStats();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % displayedSlides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [displayedSlides.length]);

  return (
    <section
      aria-labelledby="hero-comparison-title"
      className="relative isolate overflow-hidden bg-white pb-16 pt-28 dark:bg-slate-950 sm:pt-24 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2
              id="hero-comparison-title"
              className="max-w-xl text-3xl font-bold leading-[1.08] text-slate-950 dark:text-white sm:text-4xl lg:text-[2.8rem]"
            >
              A space for innovators

            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg md:leading-8">
              We bring students, mentors, and partners together in one supportive space to explore ideas, build practical solutions, and create meaningful impact in Rwanda and beyond.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-[#00628b] px-8 py-4 font-semibold text-white transition hover:bg-[#004f70] hover:shadow-lg hover:shadow-[#00628b]/25"
              >
                GET STARTED
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/innovations"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#00628b] px-8 py-4 font-semibold text-[#00628b] transition hover:bg-[#00628b] hover:text-white"
              >
                <Play className="h-4 w-4" />
                Watch Video
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              {['Student-led', 'Mentor supported', 'Impact focused'].map((benefit) => (
                <span key={benefit} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#8dc63f]" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="relative h-[25rem] overflow-hidden sm:h-[31rem]" aria-roledescription="carousel" aria-label="Binary Hub highlights">
              {displayedSlides.map((slide, index) => {
                const offset = (index - activeSlide + displayedSlides.length + 2) % displayedSlides.length - 2;
                const distance = Math.abs(offset);

                return (
                  <div
                    key={slide.image}
                    className="absolute left-1/2 top-1/2 aspect-[4/3] w-[76%] overflow-hidden rounded-md bg-slate-900 shadow-2xl transition-all duration-700 ease-out"
                    style={{
                      opacity: distance > 2 ? 0 : 1 - distance * 0.12,
                      transform: `translate(-50%, -50%) translateX(${offset * 38}%) scale(${1 - distance * 0.08}) rotate(${offset * 2}deg)`,
                      zIndex: 10 - distance,
                      pointerEvents: offset === 0 ? "auto" : "none",
                    }}
                    aria-hidden={offset !== 0}
                  >
                    <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                    {offset === 0 && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                          <div className="min-w-0 drop-shadow-md">
                            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/75">From the community</p>
                            <p className="mt-1 truncate text-xl font-bold sm:text-2xl">{slide.title}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current - 1 + displayedSlides.length) % displayedSlides.length)}
                aria-label="Previous highlight"
                className="absolute left-1 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#00628b] shadow-lg transition hover:bg-[#8dc63f] hover:text-slate-950 sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current + 1) % displayedSlides.length)}
                aria-label="Next highlight"
                className="absolute right-1 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#00628b] shadow-lg transition hover:bg-[#8dc63f] hover:text-slate-950 sm:right-4"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2" aria-label="Choose highlight">
                {displayedSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show ${slide.title}`}
                    aria-current={activeSlide === index}
                    className={`h-2 rounded-full transition-all ${activeSlide === index ? "w-7 bg-[#00628b]" : "w-2 bg-[#00628b]/50 hover:bg-[#00628b]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-y border-[#00628b]/15 py-7">
          {statsLoading ? (
            <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2 px-4 md:border-r md:border-[#00628b]/10 last:md:border-r-0">
                  <div className="h-8 w-20 animate-pulse rounded bg-[#00628b]/10" />
                  <div className="h-3 w-28 animate-pulse rounded bg-slate-300/60" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
              {stats.slice(0, 4).map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center px-4 text-center md:border-r md:border-[#00628b]/10 last:md:border-r-0"
                >
                  <span className="text-3xl font-bold tracking-tight text-[#00628b] md:text-4xl">{stat.value}</span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroComparison;