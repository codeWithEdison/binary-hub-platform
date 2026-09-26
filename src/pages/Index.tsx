import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CallToAction from "@/components/CallToAction";
import AboutSection from "@/components/AboutSection";
import { LoadingOrb } from "@/components/LoadingOrb";
import { useStakeholders } from "@/hooks/useStakeholders";

const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const HallOfFameSection = lazy(() => import("@/components/HallOfFameSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ChatWidget = lazy(() => import("@/components/ChatWidget"));

const SectionFallback = () => (
  <div className="flex items-center justify-center py-16">
    <LoadingOrb state="breathing" size={64} label="Loading section" />
  </div>
);

const Index = () => {
  const { stakeholders, loading: stakeholdersLoading } = useStakeholders();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Hero />

      <AboutSection
        className="bg-gradient-to-br from-[#00628b]/5 to-blue-50 dark:from-slate-800 dark:to-slate-900"
        variant="index"
      />

      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection
          maxProjects={6}
          showAllProjects={false}
          showViewAllButton={true}
          subtitle="Homegrown digital solutions developed by UR Binary Hub innovators to address real challenges."
        />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <HallOfFameSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <BlogSection compact />
      </Suspense>

      <section className="relative overflow-hidden bg-white px-0 py-5 md:py-7" id="stakeholders">
        <div className="mx-auto max-w-[1800px]">
          {stakeholdersLoading ? (
            <div className="flex gap-4 overflow-hidden px-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="min-w-[150px] flex-shrink-0 animate-pulse p-3 md:min-w-[180px]">
                  <div className="mx-auto h-8 w-24 rounded bg-slate-200 md:h-10 md:w-32" />
                </div>
              ))}
            </div>
          ) : (
            <div className="partner-marquee py-2 md:py-3">
              <div className="partner-track">
                {Array.from({ length: 2 }).flatMap((_, duplication) =>
                  stakeholders.map((stakeholder, index) => (
                    <motion.div
                      key={`${stakeholder.id}-${duplication}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04, duration: 0.45 }}
                      className="partner-logo-item"
                    >
                      <img
                        src={
                          stakeholder.logo ||
                          `/img/stakeholder/${stakeholder.name.toLowerCase().replace(/\s+/g, "_")}.png`
                        }
                        alt={`${stakeholder.name} Logo`}
                        className="h-8 w-auto max-w-[170px] object-contain md:h-10 lg:h-12"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const fallback = e.currentTarget.parentElement?.lastElementChild as HTMLElement | null;
                          if (fallback) {
                            fallback.classList.remove("hidden");
                            e.currentTarget.style.display = "none";
                          }
                        }}
                      />
                      <div className="hidden h-full w-full items-center justify-center rounded-xl bg-slate-100 px-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700 md:text-[11px]">
                        {stakeholder.name}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <CallToAction
        title="Ready to join the innovation hub?"
        description="We welcome students, faculty, and partners to collaborate with UR Binary Hub and turn ideas into real impact."
        primaryLabel="Apply to become innovator"
        primaryHref="/applications/form?role=Innovator"
        secondaryLabel="Contact us"
        secondaryHref="/#contact"
      />

      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
};

export default Index;
