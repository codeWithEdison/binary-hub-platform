
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, LayoutDashboard, Users, Calendar, FileText,
  Settings, LogOut, Menu, X, Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation links
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard
    },
    {
      name: "Innovators",
      path: "/admin/innovators",
      icon: Users
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: FileText
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: Calendar
    },
    {
      name: "Announcements",
      path: "/admin/announcements",
      icon: Bell
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings
    }
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
          className="bg-white/90 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-slate-900 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#00628b] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BH</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Panel</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200",
                      {
                        "bg-[#00628b]/10 text-[#00628b] border-l-4 border-[#00628b]": location.pathname === item.path,
                        "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#00628b]": location.pathname !== item.path
                      }
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 text-gray-700 dark:text-gray-300 hover:text-[#00628b] hover:border-[#00628b]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/");
                }}
              >
                <LogOut size={18} />
                Return to Site
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-background border-r border-border transition-all duration-300 z-30 hidden lg:block",
          {
            "w-64": sidebarOpen,
            "w-20": !sidebarOpen
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className={cn(
            "flex items-center justify-between h-16 px-4",
            {
              "justify-center": !sidebarOpen
            }
          )}>
            {sidebarOpen ? (
              <h2 className="text-xl font-semibold">Binary Hub Admin</h2>
            ) : (
              <span className="text-xl font-semibold">BH</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex"
            >
              {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          </div>

          {/* Sidebar navigation */}
          <nav className="flex-1 py-6 px-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg",
                      {
                        "bg-primary/10 text-primary": location.pathname === item.path,
                        "text-muted-foreground hover:text-foreground hover:bg-accent/50":
                          location.pathname !== item.path,
                        "justify-center": !sidebarOpen
                      }
                    )}
                  >
                    <item.icon size={18} />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              className={cn("w-full", {
                "justify-center": !sidebarOpen,
                "justify-start gap-3": sidebarOpen
              })}
              onClick={() => navigate("/")}
            >
              <LogOut size={18} />
              {sidebarOpen && <span>Return to Site</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "transition-all duration-300 pt-16 lg:pt-0",
          {
            "lg:ml-64": sidebarOpen,
            "lg:ml-20": !sidebarOpen
          }
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
