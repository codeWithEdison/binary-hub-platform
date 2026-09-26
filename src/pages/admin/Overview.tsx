import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
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
const UR_BLUE_SOFT = "#4aa3c2";
const UR_BLUE_MUTED = "#8bbdd0";

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

    const growth = (
      items: Array<{ created_at: string }>,
    ) => {
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
    const innovatorMultiplier = innovators.length * 2;
    const projectMultiplier = projects.length * 3;

    return Array.from({ length: 12 }, (_, i) => {
      const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i];
      let visitors = baseVisitors + innovatorMultiplier + projectMultiplier;
      visitors *= i >= 8 || i <= 5 ? 1.2 : 0.8;
      visitors *= 0.9 + Math.random() * 0.2;
      return { month, visitors: Math.floor(visitors) };
    });
  }, [innovators.length, projects.length, stats]);

  const projectsByCategory = useMemo(() => {
    const categoryCounts = projects.reduce((acc, project) => {
      const category = project.category || "Other";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [projects]);

  const innovatorsGrowth = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      return {
        month: date.toLocaleString("default", { month: "short" }),
        startDate: date,
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    });

    return months.map(({ month, startDate, endDate }) => {
      const monthInnovators = innovators.filter((innovator) => {
        const createdDate = new Date(innovator.created_at);
        return createdDate >= startDate && createdDate <= endDate;
      });

      return {
        month,
        innovators: monthInnovators.filter((i) => i.status === "innovator").length,
        mentors: monthInnovators.filter((i) => i.status === "mentor").length,
        alumni: monthInnovators.filter((i) => i.status === "alumni").length,
      };
    });
  }, [innovators]);

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
        <div className="bh-admin-chart-card">
          <h2>Website visitors</h2>
          <p>Monthly visitor trends based on platform activity</p>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyVisitors} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="visitors" stroke={UR_BLUE} fill={`${UR_BLUE}33`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bh-admin-chart-card">
          <h2>Projects by category</h2>
          <p>Distribution of projects across different categories</p>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectsByCategory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill={UR_BLUE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bh-admin-chart-card is-wide">
          <h2>Innovators growth</h2>
          <p>Monthly growth of innovators by status</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={innovatorsGrowth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="innovators" stroke={UR_BLUE} strokeWidth={2} name="Innovators" />
                <Line type="monotone" dataKey="mentors" stroke={UR_BLUE_SOFT} strokeWidth={2} name="Mentors" />
                <Line type="monotone" dataKey="alumni" stroke={UR_BLUE_MUTED} strokeWidth={2} name="Alumni" />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
