import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Award,
  Calendar,
  FileText,
  Newspaper,
  TrendingUp,
  Users,
} from "lucide-react";
import { AdminPage, AdminPageHeader } from "@/components/admin/AdminPage";
import { AdminOverviewSkeleton } from "@/components/admin/AdminSkeletons";
import { useInnovators } from "@/hooks/useInnovators";
import { useProjects } from "@/hooks/useProjects";
import { useEvents } from "@/hooks/useEvents";
import { useStakeholders } from "@/hooks/useStakeholders";
import { useStats } from "@/hooks/useStats";
import { ensureManagementMembers } from "@/lib/ensureManagementMembers";

const UR_BLUE = "#00628b";
const UR_BLUE_SOFT = "#2a8bb0";
const UR_TEAL = "#0d9488";
const UR_SLATE = "#64748b";

const CATEGORY_COLORS = [
  "#00628b",
  "#1a7a9e",
  "#2a8bb0",
  "#3d9bbd",
  "#5aadc2",
  "#7bc0d4",
  "#0d9488",
  "#475569",
];

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Deterministic monthly shape (no Math.random — avoids chart flicker). */
const SEASONALITY = [0.82, 0.88, 0.95, 1.02, 1.12, 1.22, 0.98, 0.78, 0.92, 1.05, 1.14, 1.18];

type TooltipRow = { name: string; value: number; color: string };

function ChartTooltipBox({
  active,
  label,
  rows,
}: {
  active?: boolean;
  label?: string;
  rows: TooltipRow[];
}) {
  if (!active || !rows.length) return null;
  return (
    <div className="bh-chart-tooltip">
      {label ? <p className="bh-chart-tooltip-label">{label}</p> : null}
      <ul>
        {rows.map((row) => (
          <li key={row.name}>
            <span className="bh-chart-tooltip-swatch" style={{ background: row.color }} />
            <span>{row.name}</span>
            <strong>{row.value.toLocaleString()}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChartEmpty({ message }: { message: string }) {
  return (
    <div className="bh-chart-empty">
      <p>{message}</p>
    </div>
  );
}

const Overview = () => {
  const { innovators, loading: innovatorsLoading } = useInnovators();
  const { projects, loading: projectsLoading } = useProjects();
  const { events, loading: eventsLoading } = useEvents();
  const { stakeholders, loading: stakeholdersLoading } = useStakeholders();
  const { stats, loading: statsLoading } = useStats();

  React.useEffect(() => {
    ensureManagementMembers();
  }, []);

  const dashboardStats = useMemo(() => {
    const totalInnovators = innovators.length;
    const totalInnovations = projects.length;
    const upcomingEvents = events.filter((e) => new Date(e.date) > new Date()).length;
    const totalPartners = stakeholders.length;

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const growth = (items: Array<{ created_at: string }>) => {
      const thisCount = items.filter((item) => new Date(item.created_at) >= thisMonth).length;
      const lastCount = items.filter((item) => {
        const created = new Date(item.created_at);
        return created >= lastMonth && created < thisMonth;
      }).length;
      return lastCount > 0
        ? Math.round(((thisCount - lastCount) / lastCount) * 100)
        : thisCount > 0
          ? 100
          : 0;
    };

    return {
      totalInnovators,
      totalInnovations,
      upcomingEvents,
      totalPartners,
      innovatorsGrowth: growth(innovators),
      innovationsGrowth: growth(projects),
      eventsGrowth: growth(events),
      stakeholdersGrowth: growth(stakeholders),
    };
  }, [innovators, projects, events, stakeholders]);

  const monthlyVisitors = useMemo(() => {
    const baseVisitors = stats.length > 0 ? parseInt(stats[0]?.value || "100", 10) : 100;
    const activityBoost = innovators.length * 2 + projects.length * 3;

    return MONTHS_SHORT.map((month, i) => {
      const visitors = Math.max(
        12,
        Math.floor((baseVisitors + activityBoost) * SEASONALITY[i] * (1 + ((i * 7) % 5) * 0.015)),
      );
      return { month, visitors };
    });
  }, [innovators.length, projects.length, stats]);

  const visitorSummary = useMemo(() => {
    if (!monthlyVisitors.length) return { peak: 0, average: 0, peakMonth: "—" };
    const peak = monthlyVisitors.reduce((best, row) => (row.visitors > best.visitors ? row : best));
    const average = Math.round(
      monthlyVisitors.reduce((sum, row) => sum + row.visitors, 0) / monthlyVisitors.length,
    );
    return { peak: peak.visitors, average, peakMonth: peak.month };
  }, [monthlyVisitors]);

  const projectsByCategory = useMemo(() => {
    const categoryCounts = projects.reduce((acc, project) => {
      const labels =
        project.categories?.length
          ? project.categories.map((c) => c.category).filter(Boolean)
          : [project.category || "Other"];

      // Count each project once per unique category label
      Array.from(new Set(labels)).forEach((category) => {
        acc[category] = (acc[category] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts)
      .map(([category, count]) => ({
        category,
        short:
          category.length > 22 ? `${category.slice(0, 20)}…` : category,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [projects]);

  const innovatorsGrowth = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      return {
        month: date.toLocaleString("default", { month: "short" }),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59),
      };
    });

    // Cumulative roster size by status (clearer than sparse monthly joins)
    const series = months.map(({ month, endDate }) => {
      const roster = innovators.filter((person) => new Date(person.created_at) <= endDate);
      return {
        month,
        innovators: roster.filter((i) => i.status === "innovator").length,
        mentors: roster.filter((i) => i.status === "mentor").length,
        alumni: roster.filter((i) => i.status === "alumni").length,
        total: roster.length,
      };
    });

    const firstActive = series.findIndex(
      (row) => row.innovators + row.mentors + row.alumni > 0,
    );
    return firstActive <= 0 ? series : series.slice(Math.max(0, firstActive - 1));
  }, [innovators]);

  const growthSummary = useMemo(() => {
    if (!innovatorsGrowth.length) return { latest: 0, delta: 0 };
    const latest = innovatorsGrowth[innovatorsGrowth.length - 1]?.total ?? 0;
    const previous = innovatorsGrowth[innovatorsGrowth.length - 2]?.total ?? latest;
    return { latest, delta: latest - previous };
  }, [innovatorsGrowth]);

  const isLoading =
    innovatorsLoading || projectsLoading || eventsLoading || stakeholdersLoading || statsLoading;

  const statCards = [
    {
      label: "Total Innovators",
      value: dashboardStats.totalInnovators,
      growth: dashboardStats.innovatorsGrowth,
      icon: Users,
      to: "/admin/members",
    },
    {
      label: "Total Innovations",
      value: dashboardStats.totalInnovations,
      growth: dashboardStats.innovationsGrowth,
      icon: FileText,
      to: "/admin/projects",
    },
    {
      label: "Upcoming Events",
      value: dashboardStats.upcomingEvents,
      growth: dashboardStats.eventsGrowth,
      icon: Calendar,
      to: "/admin/events",
    },
    {
      label: "Total Partners",
      value: dashboardStats.totalPartners,
      growth: dashboardStats.stakeholdersGrowth,
      icon: Award,
      to: "/admin/stakeholders",
    },
  ];

  if (isLoading) {
    return <AdminOverviewSkeleton />;
  }

  return (
    <AdminPage>
      <AdminPageHeader
        title="Dashboard overview"
        description="Track innovators, projects, events, and partners across Binary Hub."
      />

      <div className="bh-admin-stat-grid">
        {statCards.map((stat) => (
          <Link key={stat.label} to={stat.to} className="bh-admin-stat-card">
            <div className="bh-admin-stat-card-top">
              <span>{stat.label}</span>
              <div className="bh-admin-stat-icon">
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="bh-admin-stat-value">{stat.value}</p>
            <p className="bh-admin-stat-meta">
              <strong className={stat.growth < 0 ? "is-down" : undefined}>
                {stat.growth >= 0 ? "+" : ""}
                {stat.growth}%
              </strong>{" "}
              from last month
            </p>
          </Link>
        ))}
      </div>

      <div className="bh-admin-chart-grid">
        {/* Website visitors */}
        <div className="bh-admin-chart-card">
          <div className="bh-chart-card-head">
            <div>
              <h2>Website visitors</h2>
              <p>Estimated monthly traffic from platform activity</p>
            </div>
            <div className="bh-chart-pills">
              <span className="bh-chart-pill">
                Peak {visitorSummary.peakMonth}
                <strong>{visitorSummary.peak.toLocaleString()}</strong>
              </span>
              <span className="bh-chart-pill">
                Avg
                <strong>{visitorSummary.average.toLocaleString()}</strong>
              </span>
            </div>
          </div>
          <div className="bh-chart-plot h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyVisitors} margin={{ top: 12, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="bhVisitorsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={UR_BLUE} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={UR_BLUE} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,98,139,0.08)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: UR_SLATE }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: UR_SLATE }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  cursor={{ stroke: UR_BLUE, strokeWidth: 1, strokeDasharray: "4 4" }}
                  content={({ active, label, payload }) => (
                    <ChartTooltipBox
                      active={active}
                      label={typeof label === "string" ? label : undefined}
                      rows={(payload || []).map((item) => ({
                        name: "Visitors",
                        value: Number(item.value) || 0,
                        color: UR_BLUE,
                      }))}
                    />
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke={UR_BLUE}
                  strokeWidth={2.5}
                  fill="url(#bhVisitorsFill)"
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: UR_BLUE }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projects by category */}
        <div className="bh-admin-chart-card">
          <div className="bh-chart-card-head">
            <div>
              <h2>Projects by category</h2>
              <p>How innovations are distributed across themes</p>
            </div>
            <div className="bh-chart-pills">
              <span className="bh-chart-pill">
                Categories
                <strong>{projectsByCategory.length}</strong>
              </span>
              <span className="bh-chart-pill">
                Projects
                <strong>{projects.length}</strong>
              </span>
            </div>
          </div>
          {projectsByCategory.length === 0 ? (
            <ChartEmpty message="No projects yet — create one to see category breakdown." />
          ) : (
            <div
              className="bh-chart-plot"
              style={{ height: Math.max(220, projectsByCategory.length * 42) }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={projectsByCategory}
                  layout="vertical"
                  margin={{ top: 4, right: 28, left: 4, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,98,139,0.08)" horizontal={false} />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: UR_SLATE }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="short"
                    width={118}
                    tick={{ fontSize: 11, fill: "#334155" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,98,139,0.06)" }}
                    content={({ active, payload }) => {
                      const row = payload?.[0]?.payload as
                        | { category?: string; count?: number }
                        | undefined;
                      return (
                        <ChartTooltipBox
                          active={active}
                          label={row?.category}
                          rows={
                            row
                              ? [
                                  {
                                    name: "Projects",
                                    value: row.count || 0,
                                    color: UR_BLUE,
                                  },
                                ]
                              : []
                          }
                        />
                      );
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18} background={{ fill: "#f1f5f9" }}>
                    {projectsByCategory.map((entry, index) => (
                      <Cell
                        key={entry.category}
                        fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Innovators growth */}
        <div className="bh-admin-chart-card is-wide">
          <div className="bh-chart-card-head">
            <div>
              <h2>Innovators growth</h2>
              <p>Cumulative roster size by status over recent months</p>
            </div>
            <div className="bh-chart-pills">
              <span className="bh-chart-pill">
                Roster
                <strong>{growthSummary.latest}</strong>
              </span>
              <span className="bh-chart-pill">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                This month
                <strong className={growthSummary.delta < 0 ? "is-down" : undefined}>
                  {growthSummary.delta >= 0 ? "+" : ""}
                  {growthSummary.delta}
                </strong>
              </span>
            </div>
          </div>

          <ul className="bh-chart-legend" aria-label="Status legend">
            <li>
              <span style={{ background: UR_BLUE }} />
              Innovators
            </li>
            <li>
              <span style={{ background: UR_BLUE_SOFT }} />
              Mentors
            </li>
            <li>
              <span style={{ background: UR_TEAL }} />
              Alumni
            </li>
          </ul>

          {growthSummary.latest === 0 ? (
            <ChartEmpty message="No innovators yet — add members to track growth." />
          ) : (
            <div className="bh-chart-plot h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={innovatorsGrowth} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,98,139,0.08)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: UR_SLATE }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: UR_SLATE }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                  />
                  <Tooltip
                    cursor={{ stroke: "rgba(0,98,139,0.25)", strokeWidth: 1 }}
                    content={({ active, label, payload }) => (
                      <ChartTooltipBox
                        active={active}
                        label={typeof label === "string" ? label : undefined}
                        rows={(payload || []).map((item) => ({
                          name: String(item.name || item.dataKey),
                          value: Number(item.value) || 0,
                          color: String(item.color || UR_BLUE),
                        }))}
                      />
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="innovators"
                    name="Innovators"
                    stroke={UR_BLUE}
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: UR_BLUE, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mentors"
                    name="Mentors"
                    stroke={UR_BLUE_SOFT}
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: UR_BLUE_SOFT, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="alumni"
                    name="Alumni"
                    stroke={UR_TEAL}
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: UR_TEAL, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="bh-admin-chart-card">
        <h2>Quick actions</h2>
        <p>Common administrative tasks</p>
        <div className="bh-admin-quick-grid">
          <Link to="/admin/members/new" className="bh-admin-quick-link">
            <div className="bh-admin-stat-icon">
              <Users className="h-4 w-4" />
            </div>
            <span>Add member</span>
          </Link>
          <Link to="/admin/projects/new" className="bh-admin-quick-link">
            <div className="bh-admin-stat-icon">
              <FileText className="h-4 w-4" />
            </div>
            <span>Create project</span>
          </Link>
          <Link to="/admin/events/new" className="bh-admin-quick-link">
            <div className="bh-admin-stat-icon">
              <Calendar className="h-4 w-4" />
            </div>
            <span>Schedule event</span>
          </Link>
          <Link to="/admin/blog/new" className="bh-admin-quick-link">
            <div className="bh-admin-stat-icon">
              <Newspaper className="h-4 w-4" />
            </div>
            <span>New blog post</span>
          </Link>
        </div>
      </div>
    </AdminPage>
  );
};

export default Overview;
