import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, ArrowUp, ArrowDown, BarChart3, Lightbulb, Calendar, 
  ChevronRight, AreaChart, Clock, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  AreaChart,
  Area
} from "recharts";

const monthlyVisitors = [
  { month: "Jan", visitors: 1200 },
  { month: "Feb", visitors: 1900 },
  { month: "Mar", visitors: 1500 },
  { month: "Apr", visitors: 2200 },
  { month: "May", visitors: 2800 },
  { month: "Jun", visitors: 2300 },
  { month: "Jul", visitors: 3000 },
  { month: "Aug", visitors: 3500 },
  { month: "Sep", visitors: 3100 },
  { month: "Oct", visitors: 3800 },
  { month: "Nov", visitors: 4200 },
  { month: "Dec", visitors: 3900 }
];

const projectsByCategory = [
  { category: "Agriculture", count: 12 },
  { category: "Healthcare", count: 8 },
  { category: "Education", count: 10 },
  { category: "Fintech", count: 7 },
  { category: "Energy", count: 5 },
  { category: "Other", count: 3 }
];

const innovatorsGrowth = [
  { month: "Jan", students: 10, faculty: 2, alumni: 5 },
  { month: "Feb", students: 15, faculty: 3, alumni: 7 },
  { month: "Mar", students: 20, faculty: 3, alumni: 10 },
  { month: "Apr", students: 25, faculty: 4, alumni: 12 },
  { month: "May", students: 30, faculty: 5, alumni: 15 },
  { month: "Jun", students: 35, faculty: 6, alumni: 18 }
];

const Overview = () => {
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Innovators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8%</span>
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
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">3%</span>
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
              <div className="text-2xl font-bold">18</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">2</span>
                <span className="ml-1">new this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Website Visitors Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Website Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
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
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Projects by Category Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Projects by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
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
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Innovators Growth Chart */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Innovators Growth</CardTitle>
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
                      dataKey="students" 
                      stroke="#4f46e5" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="faculty" 
                      stroke="#0ea5e9" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="alumni" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
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
                <Link to="/admin/settings">
                  <Settings className="h-6 w-6 mb-2" />
                  <span>Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
