import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Droplets, Phone } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("data");
    setIsLoggedIn(!!username);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("data");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleViewHistory = () => {
    navigate("/history");
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent backdrop-blur-md py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: isScrolled ? 0 : 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Droplets
                  className={`h-8 w-8 ${
                    isScrolled ? "text-blue-600" : "text-white"
                  }`}
                />
              </motion.div>
              <span
                className={`text-2xl font-bold ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                AquaNest
              </span>
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  to={link.path}
                  className={`relative transition-colors duration-300 ${
                    location.pathname === link.path
                      ? isScrolled
                        ? "text-blue-600"
                        : "text-blue-200"
                      : isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white hover:text-blue-200"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-current rounded-full"
                      layoutId="navbar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Contact Info */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <Phone
              className={`h-5 w-5 ${
                isScrolled ? "text-blue-600" : "text-white"
              }`}
            />
            <span
              className={`font-semibold ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              1-800-AQUA
            </span>
          </motion.div>

          {/* Profile Button - Desktop */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={handleProfileClick}
              className={
                isScrolled
                  ? "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  : "bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-white/80 transition"
              }
            >
              Profile
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
                <button
                  onClick={handleViewHistory}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  View History
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Icon */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Nav Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-3 rounded-md text-base font-medium ${
                      location.pathname === link.path
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Profile */}
              <div className="mt-4 px-4">
                <button
                  onClick={handleProfileClick}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Profile
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 w-full bg-white border rounded-md shadow-md">
                    <button
                      onClick={handleViewHistory}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      View History
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
