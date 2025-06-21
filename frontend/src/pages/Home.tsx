import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Droplets,
  Truck,
  Shield,
  Clock,
  Star,
  Users,
  Zap,
} from "lucide-react";

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
            }}
          />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-blue-300 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity }}
        >
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              variants={textVariants}
            >
              <motion.span
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="block"
              >
                Pure Water
              </motion.span>
              <motion.span
                className="block text-blue-200"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Delivered Fresh
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={textVariants}
            >
              Experience the difference with AquaNest's premium water delivery
              service. Pure, safe, and refreshing water delivered right to your
              doorstep.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={textVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/products"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg flex items-center space-x-2 mb-4 sm:mb-0"
                >
                  <span>Order Now</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/about"
                  className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center mx-auto mt-0 sm:mt-0 mt-[4px]">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AquaNest?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver more than just water - we deliver peace of mind with
              every drop
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                description:
                  "Our water goes through a rigorous 7-stage purification process ensuring the highest quality and safety standards.",
                color: "bg-blue-500",
                delay: 0,
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description:
                  "Same-day delivery available with real-time tracking so you always know when your water will arrive.",
                color: "bg-green-500",
                delay: 0.2,
              },
              {
                icon: Clock,
                title: "24/7 Service",
                description:
                  "Round-the-clock customer support and flexible delivery schedules to fit your busy lifestyle.",
                color: "bg-purple-500",
                delay: 0.4,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              { icon: Users, number: "50,000+", label: "Happy Customers" },
              { icon: Droplets, number: "1M+", label: "Bottles Delivered" },
              { icon: Star, number: "4.9/5", label: "Customer Rating" },
              { icon: Zap, number: "24/7", label: "Delivery Service" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                </motion.div>
                <motion.div
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust AquaNest for their
              daily hydration needs.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/products"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 space-x-2"
              >
                <span>Start Your Order</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
