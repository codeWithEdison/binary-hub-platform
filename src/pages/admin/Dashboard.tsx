import React, { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Settings,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Content",
    items: [
      { name: "Members", path: "/admin/members", icon: Users },
      { name: "Projects", path: "/admin/projects", icon: FileText },
      { name: "Events", path: "/admin/events", icon: Calendar },
      { name: "Announcements", path: "/admin/announcements", icon: Bell },
      { name: "Blog", path: "/admin/blog", icon: Newspaper },
      { name: "Hero Slides", path: "/admin/hero-slides", icon: Images },
      { name: "Stakeholders", path: "/admin/stakeholders", icon: Users },
    ],
  },
  {
    label: "Applications",
    items: [
      { name: "Applicants", path: "/admin/applicants", icon: ClipboardList },
      { name: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
      { name: "Application setup", path: "/admin/application-setup", icon: SlidersHorizontal },
    ],
  },
  {
    label: "System",
    items: [{ name: "Settings", path: "/admin/settings", icon: Settings }],
  },
] as const;

const isActivePath = (pathname: string, path: string, end?: boolean) => {
  if (end || path === "/admin") return pathname === "/admin" || pathname === "/admin/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

const pageTitleFromPath = (pathname: string) => {
  if (pathname === "/admin" || pathname === "/admin/") return "Dashboard";
  const match = navGroups
    .flatMap((group) => group.items)
    .find((item) => isActivePath(pathname, item.path, "end" in item ? item.end : false));
  return match?.name || "Admin";
};

const NavLinks = ({
  pathname,
  collapsed = false,
  onNavigate,
}: {
  pathname: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}) => (
  <nav className="bh-admin-nav" aria-label="Admin">
    {navGroups.map((group) => (
      <div key={group.label}>
        <p className="bh-admin-nav-label">{group.label}</p>
        {group.items.map((item) => {
          const active = isActivePath(pathname, item.path, "end" in item ? item.end : false);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={cn("bh-admin-nav-link", active && "is-active")}
              title={collapsed ? item.name : undefined}
            >
              <item.icon />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    ))}
  </nav>
);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const pageTitle = useMemo(() => pageTitleFromPath(location.pathname), [location.pathname]);

  return (
    <div className="bh-admin-shell">
      <aside className={cn("bh-admin-sidebar", !sidebarOpen && "is-collapsed")}>
        <div className="bh-admin-sidebar-brand">
          <img src="/img/logo.png" alt="" />
          <div className="bh-admin-sidebar-brand-copy">
            <strong>UR Binary Hub</strong>
            <span>Admin</span>
          </div>
          <button
            type="button"
            className="bh-admin-sidebar-toggle"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <NavLinks pathname={location.pathname} collapsed={!sidebarOpen} />

        <div className="bh-admin-sidebar-foot">
          <Button
            variant="outline"
            className={cn(
              "h-10 w-full rounded-[7px] border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
              sidebarOpen ? "justify-start gap-2" : "justify-center px-0"
            )}
            onClick={() => navigate("/")}
          >
            <LogOut size={16} />
            {sidebarOpen ? "Return to site" : null}
          </Button>
        </div>
      </aside>

      {mobileMenuOpen ? (
        <div className="bh-admin-mobile-drawer lg:hidden">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close menu overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="bh-admin-mobile-panel relative z-10">
            <div className="bh-admin-sidebar-brand">
              <img src="/img/logo.png" alt="" />
              <div className="bh-admin-sidebar-brand-copy">
                <strong>UR Binary Hub</strong>
                <span>Admin</span>
              </div>
              <button
                type="button"
                className="ml-auto grid h-9 w-9 place-items-center rounded-[7px] text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <NavLinks pathname={location.pathname} onNavigate={() => setMobileMenuOpen(false)} />
            <div className="bh-admin-sidebar-foot">
              <Button
                variant="outline"
                className="h-10 w-full justify-start gap-2 rounded-[7px] border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/");
                }}
              >
                <LogOut size={16} />
                Return to site
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <div className={cn("bh-admin-main", !sidebarOpen && "is-collapsed")}>
        <header className="bh-admin-topbar">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-[7px] border-[#00628b]/15 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </Button>
            <div className="min-w-0">
              <h1 className="bh-admin-topbar-title truncate">{pageTitle}</h1>
              <p className="bh-admin-topbar-meta hidden sm:block">
                Manage Binary Hub content and applications
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden h-10 rounded-[7px] border-[#00628b]/15 text-[#00628b] hover:bg-[#00628b]/5 sm:inline-flex"
          >
            <Link to="/">View site</Link>
          </Button>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
