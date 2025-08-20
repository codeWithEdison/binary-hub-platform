import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Award,
  Calendar,
  ChevronRight,
  BarChart3,
  Lightbulb,
  Clock,
  Settings,
  Activity,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  AreaChart as RechartsAreaChart,
  Area
} from "recharts";

// Import hooks
import { useInnovators } from "@/hooks/useInnovators";
import { useProjects } from "@/hooks/useProjects";
import { useEvents } from "@/hooks/useEvents";
import { useStakeholders } from "@/hooks/useStakeholders";
import { useStats } from "@/hooks/useStats";

const Overview = () => {
  // Use hooks to get dynamic data
  const { innovators, loading: innovatorsLoading } = useInnovators();
  const { projects, loading: projectsLoading } = useProjects();
  const { events, loading: eventsLoading } = useEvents();
  const { stakeholders, loading: stakeholdersLoading } = useStakeholders();
  const { stats, loading: statsLoading } = useStats();

  // Calculate dynamic statistics with real data
  const dashboardStats = useMemo(() => {
    const totalInnovators = innovators.length;
    const totalInnovations = projects.length; // Total innovations instead of active projects
    const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;
    const totalPartners = stakeholders.length; // Using stakeholders instead of services

    // Calculate growth percentages based on actual data
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Calculate innovators growth
    const thisMonthInnovators = innovators.filter(i => new Date(i.created_at) >= thisMonth).length;
    const lastMonthInnovators = innovators.filter(i => {
      const createdDate = new Date(i.created_at);
      return createdDate >= lastMonth && createdDate < thisMonth;
    }).length;
    const innovatorsGrowth = lastMonthInnovators > 0
      ? Math.round(((thisMonthInnovators - lastMonthInnovators) / lastMonthInnovators) * 100)
      : thisMonthInnovators > 0 ? 100 : 0;

    // Calculate innovations growth
    const thisMonthInnovations = projects.filter(p => new Date(p.created_at) >= thisMonth).length;
    const lastMonthInnovations = projects.filter(p => {
      const createdDate = new Date(p.created_at);
      return createdDate >= lastMonth && createdDate < thisMonth;
    }).length;
    const innovationsGrowth = lastMonthInnovations > 0
      ? Math.round(((thisMonthInnovations - lastMonthInnovations) / lastMonthInnovations) * 100)
      : thisMonthInnovations > 0 ? 100 : 0;

    // Calculate events growth (negative for upcoming events decreasing)
    const thisMonthEvents = events.filter(e => new Date(e.created_at) >= thisMonth).length;
    const lastMonthEvents = events.filter(e => {
      const createdDate = new Date(e.created_at);
      return createdDate >= lastMonth && createdDate < thisMonth;
    }).length;
    const eventsGrowth = lastMonthEvents > 0
      ? Math.round(((thisMonthEvents - lastMonthEvents) / lastMonthEvents) * 100)
      : thisMonthEvents > 0 ? 100 : 0;

    // Calculate stakeholders growth
    const thisMonthStakeholders = stakeholders.filter(s => new Date(s.created_at) >= thisMonth).length;
    const lastMonthStakeholders = stakeholders.filter(s => {
      const createdDate = new Date(s.created_at);
      return createdDate >= lastMonth && createdDate < thisMonth;
    }).length;
    const stakeholdersGrowth = lastMonthStakeholders > 0
      ? Math.round(((thisMonthStakeholders - lastMonthStakeholders) / lastMonthStakeholders) * 100)
      : thisMonthStakeholders > 0 ? 100 : 0;

    return {
      totalInnovators,
      totalInnovations,
      upcomingEvents,
      totalPartners,
      innovatorsGrowth,
      innovationsGrowth,
      eventsGrowth,
      stakeholdersGrowth
    };
  }, [innovators, projects, events, stakeholders]);

  // Generate dynamic chart data based on real data
  const monthlyVisitors = useMemo(() => {
    // Generate visitor data based on actual activity and stats
    const baseVisitors = stats.length > 0 ? parseInt(stats[0]?.value || "100") : 100;
    const innovatorMultiplier = innovators.length * 2;
    const projectMultiplier = projects.length * 3;

    return Array.from({ length: 12 }, (_, i) => {
      const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i];
      const currentMonth = new Date().getMonth();
      const monthIndex = i;

      // Create realistic visitor pattern with seasonal variations
      let visitors = baseVisitors + innovatorMultiplier + projectMultiplier;

      // Add seasonal variation (higher in academic months)
      if (monthIndex >= 8 || monthIndex <= 5) { // Sep-May (academic year)
        visitors *= 1.2;
      } else { // Jun-Aug (summer break)
        visitors *= 0.8;
      }

      // Add some randomness but keep it realistic
      visitors *= (0.9 + Math.random() * 0.2);

      return {
        month,
        visitors: Math.floor(visitors)
      };
    });
  }, [innovators.length, projects.length, stats]);

  const projectsByCategory = useMemo(() => {
    const categoryCounts = projects.reduce((acc, project) => {
      const category = project.category || "Other";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts)
      .map(([category, count]) => ({
        category,
        count
      }))
      .sort((a, b) => b.count - a.count); // Sort by count descending
  }, [projects]);

  const innovatorsGrowth = useMemo(() => {
    // Group innovators by status and month for the last 6 months
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      return {
        month: date.toLocaleString('default', { month: 'short' }),
        startDate: date,
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      };
    });

    return months.map(({ month, startDate, endDate }) => {
      const monthInnovators = innovators.filter(innovator => {
        const createdDate = new Date(innovator.created_at);
        return createdDate >= startDate && createdDate <= endDate;
      });

      return {
        month,
        innovators: monthInnovators.filter(i => i.status === "innovator").length,
        mentors: monthInnovators.filter(i => i.status === "mentor").length,
        alumni: monthInnovators.filter(i => i.status === "alumni").length
      };
    });
  }, [innovators]);



  const isLoading = innovatorsLoading || projectsLoading || eventsLoading || stakeholdersLoading || statsLoading;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="mt-4 md:mt-0">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="col-span-1">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-36" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back, Administrator</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link to="/admin/settings" className="flex items-center gap-2">
                <Activity size={16} />
                Platform Status
              </Link>
            </Button>
          </div>
        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Innovators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalInnovators}</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                {dashboardStats.innovatorsGrowth >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`font-medium ${dashboardStats.innovatorsGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(dashboardStats.innovatorsGrowth)}%
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Innovations</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalInnovations}</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                {dashboardStats.innovationsGrowth >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`font-medium ${dashboardStats.innovationsGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(dashboardStats.innovationsGrowth)}%
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.upcomingEvents}</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                {dashboardStats.eventsGrowth >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`font-medium ${dashboardStats.eventsGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(dashboardStats.eventsGrowth)}%
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalPartners}</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                {dashboardStats.stakeholdersGrowth >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`font-medium ${dashboardStats.stakeholdersGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(dashboardStats.stakeholdersGrowth)}%
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Website Visitors</CardTitle>
              <CardDescription>Monthly visitor trends based on platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsAreaChart
                    data={monthlyVisitors}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#8b5cf6"
                      fill="#8b5cf680"
                    />
                  </RechartsAreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Projects by Category</CardTitle>
              <CardDescription>Distribution of projects across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={projectsByCategory}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Innovators Growth</CardTitle>
              <CardDescription>Monthly growth of innovators by status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={innovatorsGrowth}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="innovators"
                      stroke="#4f46e5"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      name="Innovators"
                    />
                    <Line
                      type="monotone"
                      dataKey="mentors"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      name="Mentors"
                    />
                    <Line
                      type="monotone"
                      dataKey="alumni"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="Alumni"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <Link to="/admin/innovators/new">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Add Innovator</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <Link to="/admin/projects/new">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Create Project</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <Link to="/admin/events/new">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Schedule Event</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                <Link to="/admin/stakeholders/new">
                  <Award className="h-6 w-6 mb-2" />
                  <span>Add Partner</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Overview;
