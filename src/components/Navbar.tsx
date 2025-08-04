
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Bell, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Innovators", path: "/innovators" },
    { name: "Innovations", path: "/innovations" },
    { name: "Contact", path: "/contact" },
    // { name: "Events", path: "/events" },
    // { name: "Announcements", path: "/announcements" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0
    })
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  const handleAdminClick = () => {
    console.log("Admin click debug:", {
      hasUser: !!user,
      userRole: profile?.role,
      profile: profile
    });

    if (!user) {
      console.log("No user, navigating to /auth");
      navigate("/auth");
    } else {
      // Check if user is admin using profile role (same as ProtectedRoute)
      if (profile?.role === "admin") {
        console.log("User is admin, navigating to /admin");
        navigate("/admin");
      } else {
        console.log("User is not admin, navigating to /auth");
        navigate("/auth");
      }
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 transition-all duration-300",
        {
          "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg": scrolled,
          "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm": !scrolled
        }
      )}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="relative z-50">
          <div className="flex items-center space-x-2">
            <img
              src="/img/logo.png"
              alt="UR Binary Hub Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-display font-semibold">
              <span className="text-[#00628b]">UR Binary Hub</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {links.map((link, i) => (
            <motion.div
              key={link.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
            >
              <Link
                to={link.path}
                className={cn(
                  "text-foreground/80 hover:text-foreground transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#00628b] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
                  {
                    "text-foreground font-medium after:scale-x-100": location.pathname === link.path
                  }
                )}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}

          {/* Admin link */}
          <motion.div
            custom={links.length}
            initial="hidden"
            animate="visible"
            variants={linkVariants}
          >
            <button
              onClick={handleAdminClick}
              className="ml-2 p-2 rounded-full bg-[#00628b]/10 text-[#00628b] hover:bg-[#00628b]/20 transition-colors"
            >
              <User size={18} />
            </button>
          </motion.div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-[60] p-2 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col md:hidden z-[55]"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {/* Mobile Menu Content */}
              <motion.div
                className="flex-1 flex flex-col bg-white dark:bg-slate-900 shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/img/logo.png"
                      alt="UR Binary Hub Logo"
                      className="h-8 w-auto"
                    />
                    <h2 className="text-lg font-semibold text-[#00628b]">Menu</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close Menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-2">
                    {links.map((link, i) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: 0.1 + i * 0.1, duration: 0.3 }
                        }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center px-4 py-4 text-lg font-medium rounded-xl transition-all duration-200",
                            {
                              "bg-[#00628b]/10 text-[#00628b] border-l-4 border-[#00628b]": location.pathname === link.path,
                              "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#00628b]": location.pathname !== link.path
                            }
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© 2024 UR Binary Hub</p>
                    <p className="mt-1">Innovation & Technology</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
