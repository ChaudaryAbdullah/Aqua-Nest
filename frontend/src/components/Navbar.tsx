import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Droplets, Phone } from "lucide-react";
import axios from "axios";
import { BACK_END_LINK } from "../config";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update login status on route change
  useEffect(() => {
    const userId = localStorage.getItem("data");
    setIsLoggedIn(!!userId);
  }, [location]);

  // Re-check admin status when login state or route changes
  useEffect(() => {
    const userId = localStorage.getItem("data");

    if (!userId) {
      setIsAdmin(false); // reset if no user
      return;
    }

    axios
      .get(`${BACK_END_LINK}/api/users/${userId}`)
      .then((res) => setIsAdmin(!!res.data.isAdmin))
      .catch(() => setIsAdmin(false));
  }, [isLoggedIn, location]);

  // Scroll effect
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
    navigate("/order#history");
    setIsDropdownOpen(false);
  };

  const handleViewOrder = () => {
    navigate("/order");
    setIsDropdownOpen(false);
  };

  const handleViewAdmin = () => {
    navigate("/admin");
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    !isAdmin && { name: "Products", path: "/products" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ].filter(Boolean); // removes falsy (like false or null)

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

          {/* Profile Button */}
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
                {isAdmin ? (
                  <button
                    onClick={handleViewAdmin}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleViewOrder}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      View Order
                    </button>
                    <button
                      onClick={handleViewHistory}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      View History
                    </button>
                  </>
                )}
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
        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40"
            >
              <div className="flex flex-col items-start px-6 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-800 hover:text-blue-600 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <hr className="w-full border-gray-200" />

                {!isLoggedIn ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/login");
                    }}
                    className="w-full text-left text-gray-800 hover:text-blue-600"
                  >
                    Login
                  </button>
                ) : (
                  <>
                    {isAdmin ? (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handleViewAdmin();
                        }}
                        className="w-full text-left text-gray-800 hover:text-blue-600"
                      >
                        Admin Dashboard
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleViewOrder();
                          }}
                          className="w-full text-left text-gray-800 hover:text-blue-600"
                        >
                          View Order
                        </button>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleViewHistory();
                          }}
                          className="w-full text-left text-gray-800 hover:text-blue-600"
                        >
                          View History
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleSignOut();
                      }}
                      className="w-full text-left text-red-500 hover:underline"
                    >
                      Sign Out
                    </button>
                  </>
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
