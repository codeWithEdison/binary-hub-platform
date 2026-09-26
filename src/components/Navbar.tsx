import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, User, LogOut, Settings, ChevronDown, LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Innovators", path: "/innovators" },
  { name: "Innovations", path: "/innovations" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const isActivePath = (pathname: string, path: string) => {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleAdminClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate(profile?.role === "admin" ? "/admin" : "/auth");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const goToPortal = () => {
    if (profile?.role === "admin") {
      navigate("/admin");
      return;
    }
    navigate("/applications/form");
  };

  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  const getUserDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user?.user_metadata?.full_name || user?.email || "User";
  };

  const firstName =
    profile?.first_name ||
    user?.user_metadata?.full_name?.split?.(" ")?.[0] ||
    user?.email?.split("@")[0] ||
    "Account";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "border-b border-[#00628b]/10 bg-white/95 shadow-[0_8px_30px_-18px_rgba(0,98,139,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95"
          : "border-b border-transparent bg-white/70 backdrop-blur-md dark:bg-slate-950/70"
      )}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        {/* Brand */}
        <Link to="/" className="group relative z-50 flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#00628b]/[0.08] ring-1 ring-[#00628b]/10 transition group-hover:bg-[#00628b]/12">
            <img src="/img/logo.png" alt="UR Binary Hub" className="h-7 w-auto" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-[15px] font-bold leading-tight tracking-tight text-[#00628b] sm:text-base">
              UR Binary Hub
            </p>
            <p className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:block">
              The Power of United Minds
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active = isActivePath(location.pathname, link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-[#00628b] after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[#00628b]"
                    : "text-slate-600 hover:text-[#00628b] dark:text-slate-300 dark:hover:text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="inline-flex h-10 max-w-[220px] items-center gap-2 rounded-[7px] border border-[#00628b]/15 bg-white/80 pl-1.5 pr-2.5 text-left transition hover:border-[#00628b]/30 hover:bg-[#00628b]/5"
                  aria-label="Account menu"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.user_metadata?.avatar_url || profile?.avatar_url || undefined} alt={getUserDisplayName()} />
                    <AvatarFallback className="bg-[#00628b] text-[10px] text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                    {firstName}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 rounded-xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <p className="text-xs capitalize leading-none text-muted-foreground">
                      {profile?.role || "User"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={goToPortal}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Go to portal
                </DropdownMenuItem>
                {profile?.role === "admin" && (
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/admin")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={handleAdminClick}
              className="inline-flex h-10 items-center gap-2 rounded-[7px] border border-[#00628b]/15 bg-white/80 px-3 text-sm font-medium text-[#00628b] transition hover:bg-[#00628b]/8"
              aria-label="Sign in"
            >
              <User size={16} />
              Sign in
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-[7px] border border-[#00628b]/15 bg-white/80 text-[#00628b] transition hover:bg-[#00628b]/8"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[110] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
              aria-label="Close menu overlay"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col border-l border-[#00628b]/10 bg-white shadow-2xl dark:bg-slate-950"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="flex h-[74px] items-center justify-between border-b border-[#00628b]/10 px-5">
                <div className="flex items-center gap-2.5">
                  <img src="/img/logo.png" alt="" className="h-8 w-auto" />
                  <span className="font-display text-base font-bold text-[#00628b]">Menu</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[7px] text-slate-600 hover:bg-[#00628b]/8 hover:text-[#00628b]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {user && (
                <div className="border-b border-[#00628b]/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={user.user_metadata?.avatar_url || profile?.avatar_url || undefined} alt={getUserDisplayName()} />
                      <AvatarFallback className="bg-[#00628b] text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {getUserDisplayName()}
                      </p>
                      <p className="truncate text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5" aria-label="Mobile">
                {links.map((link, i) => {
                  const active = isActivePath(location.pathname, link.path);
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center rounded-[10px] px-4 py-3 text-[15px] font-medium transition",
                          active
                            ? "text-[#00628b] bg-[#00628b]/8"
                            : "text-slate-700 hover:bg-[#00628b]/8 hover:text-[#00628b] dark:text-slate-200"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {user && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      goToPortal();
                    }}
                    className="mt-1 flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-left text-[15px] font-medium text-slate-700 hover:bg-[#00628b]/8 hover:text-[#00628b]"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Go to portal
                  </button>
                )}

                {!user && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleAdminClick();
                    }}
                    className="mt-2 flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-left text-[15px] font-medium text-slate-700 hover:bg-[#00628b]/8 hover:text-[#00628b]"
                  >
                    <User className="h-5 w-5" />
                    Sign in
                  </button>
                )}

                {user && profile?.role === "admin" && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/admin");
                    }}
                    className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-left text-[15px] font-medium text-slate-700 hover:bg-[#00628b]/8 hover:text-[#00628b]"
                  >
                    <Settings className="h-5 w-5" />
                    Admin Dashboard
                  </button>
                )}

                {user && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-left text-[15px] font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    Log out
                  </button>
                )}
              </nav>

              <div className="border-t border-[#00628b]/10 px-5 py-4">
                <p className="text-center text-xs text-slate-500">
                  © {new Date().getFullYear()} UR Binary Hub
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
