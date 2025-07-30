
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Innovators", path: "/innovators" },
    { name: "Innovations", path: "/innovations" },
    // { name: "Events", path: "/events" },
    // { name: "Announcements", path: "/announcements" },
    // { name: "Contact", path: "/contact" },
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

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 transition-all duration-300",
        {
          "bg-white/70 dark:bg-background/70 backdrop-blur-xl shadow-sm": scrolled,
          "bg-transparent": !scrolled
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
          {/* <motion.div
            custom={links.length}
            initial="hidden"
            animate="visible"
            variants={linkVariants}
          >
            <Link
              to="/admin"
              className="ml-2 p-2 rounded-full bg-[#00628b]/10 text-[#00628b] hover:bg-[#00628b]/20 transition-colors"
            >
              <User size={18} />
            </Link>
          </motion.div> */}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-background flex flex-col md:hidden pt-20 px-6 pb-10"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <nav className="flex flex-col space-y-6 pt-10 items-center text-center">
                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.1 + i * 0.1, duration: 0.5 }
                    }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        "text-2xl font-medium py-2",
                        {
                          "text-[#00628b]": location.pathname === link.path
                        }
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                {/* Admin link for mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.1 + links.length * 0.1, duration: 0.5 }
                  }}
                >
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#00628b]/10 text-[#00628b]"
                  >
                    <User size={18} />
                    <span>Admin Dashboard</span>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
