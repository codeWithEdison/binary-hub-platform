import { ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useStakeholders } from "@/hooks/useStakeholders";

const Partners = () => {
  const { stakeholders, loading } = useStakeholders();

  const grouped = stakeholders.reduce<Record<string, typeof stakeholders>>((acc, item) => {
    const key = item.category || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(210_25%_96%)] pt-24 md:pt-28">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-lg border border-[#00628b]/10 bg-[#00628b] px-5 py-7 text-white shadow-sm sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/80">
            Ecosystem
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Partners & stakeholders
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Institutions and organizations supporting UR Binary Hub innovation.
          </p>
        </header>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-40 rounded-lg" />
            ))}
          </div>
        ) : stakeholders.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#00628b]/20 bg-white p-10 text-center text-slate-600">
            Partners will appear here once added in admin.
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((category) => (
              <section key={category}>
                <h2 className="mb-4 font-display text-lg font-semibold text-slate-950">
                  {category}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[category].map((partner) => (
                    <article
                      key={partner.id}
                      className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm"
                    >
                      <div className="flex h-16 items-center justify-center rounded-[7px] bg-[hsl(210_25%_96%)] p-3">
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-[#00628b]">
                            {partner.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 font-display text-base font-semibold text-slate-950">
                        {partner.name}
                      </h3>
                      {partner.contribution ? (
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {partner.contribution}
                        </p>
                      ) : null}
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00628b] hover:text-[#004f70]"
                        >
                          Visit website
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
