import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Droplets,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Droplets className="h-8 w-8 text-blue-400" />
              </motion.div>
              <span className="text-2xl font-bold">AquaNest</span>
            </motion.div>
            <p className="text-gray-300 mb-4">
              Delivering pure, refreshing water to your doorstep with unmatched
              quality and service.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Products", path: "/products" },
                { name: "Testimonials", path: "/testimonials" },
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-300">
              {[
                "Spring Water",
                "Purified Water",
                "Sparkling Water",
                "Alkaline Water",
              ].map((product, index) => (
                <motion.li
                  key={product}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {product}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {[
                { Icon: Phone, text: "1-800-AQUA", href: "tel:1-800-2782" },
                {
                  Icon: Mail,
                  text: "info@aquanest.com",
                  href: "mailto:info@aquanest.com",
                },
                {
                  Icon: MapPin,
                  text: "I8 Markaz Islamabad Pakistan",
                  href: "#",
                },
              ].map(({ Icon, text, href }, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="h-5 w-5 text-blue-400" />
                  <a
                    href={href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {text}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>&copy; 2025 AquaNest. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
