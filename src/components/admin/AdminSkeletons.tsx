import { AdminPage } from "@/components/admin/AdminPage";

const Pulse = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-slate-200/90 ${className ?? ""}`} />
);

const SoftPulse = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-[#00628b]/10 ${className ?? ""}`} />
);

/** Website-style skeleton for the admin dashboard overview. */
export function AdminOverviewSkeleton() {
  return (
    <AdminPage>
      <div className="mb-6 space-y-2">
        <Pulse className="h-3 w-14" />
        <Pulse className="h-8 w-56" />
        <Pulse className="h-4 w-80 max-w-full" />
      </div>

      <div className="bh-admin-stat-grid">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bh-admin-stat-card">
            <div className="bh-admin-stat-card-top">
              <Pulse className="h-3 w-24" />
              <SoftPulse className="h-8 w-8 rounded-[7px]" />
            </div>
            <SoftPulse className="mt-3 h-9 w-16" />
            <Pulse className="mt-3 h-3 w-28" />
          </div>
        ))}
      </div>

      <div className="bh-admin-chart-grid">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bh-admin-chart-card">
            <Pulse className="h-5 w-40" />
            <Pulse className="mt-2 h-3 w-56 max-w-full" />
            <div className="mt-6 space-y-3">
              <Pulse className="h-3 w-full" />
              <Pulse className="h-3 w-[92%]" />
              <Pulse className="h-3 w-[78%]" />
              <SoftPulse className="h-40 w-full rounded-[0.75rem]" />
            </div>
          </div>
        ))}
        <div className="bh-admin-chart-card is-wide">
          <Pulse className="h-5 w-44" />
          <Pulse className="mt-2 h-3 w-64 max-w-full" />
          <SoftPulse className="mt-6 h-[220px] w-full rounded-[0.75rem]" />
        </div>
      </div>

      <div className="bh-admin-chart-card">
        <Pulse className="h-5 w-32" />
        <Pulse className="mt-2 h-3 w-48" />
        <div className="bh-admin-quick-grid mt-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-[0.75rem] border border-[#00628b]/10 bg-white p-4"
            >
              <SoftPulse className="h-8 w-8 shrink-0 rounded-[7px]" />
              <Pulse className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </AdminPage>
  );
}

/** Compact skeleton for lazy admin child routes. */
export function AdminPageSkeleton() {
  return (
    <AdminPage>
      <div className="mb-6 space-y-2">
        <Pulse className="h-3 w-14" />
        <Pulse className="h-8 w-48" />
        <Pulse className="h-4 w-72 max-w-full" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-[0.75rem] border border-[#00628b]/10 bg-white p-4"
          >
            <SoftPulse className="h-12 w-12 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Pulse className="h-3.5 w-40 max-w-full" />
              <Pulse className="h-3 w-56 max-w-full" />
            </div>
            <Pulse className="hidden h-8 w-20 sm:block" />
          </div>
        ))}
      </div>
    </AdminPage>
  );
}
