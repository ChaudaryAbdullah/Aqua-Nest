import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Users,
  Award,
  Heart,
} from "lucide-react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Health Enthusiast",
      location: "California",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "AquaNest has completely transformed our family's hydration habits. The water tastes incredibly pure and fresh, and knowing it goes through such a rigorous purification process gives us complete peace of mind.",
      highlight: "Transformed our family's hydration habits",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Fitness Coach",
      location: "New York",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "As a fitness professional, I recommend AquaNest to all my clients. The alkaline water helps with recovery after intense workouts, and the delivery service is incredibly reliable. Never had a single issue!",
      highlight: "Perfect for post-workout recovery",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Busy Mom",
      location: "Texas",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "With three kids and a hectic schedule, AquaNest's delivery service is a lifesaver. The water quality is exceptional, and I love that I can set up recurring deliveries. Highly recommend to any parent!",
      highlight: "Lifesaver for busy families",
    },
    {
      id: 4,
      name: "David Park",
      role: "Small Business Owner",
      location: "Colorado",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "We switched our office to AquaNest and the difference is remarkable. Our team loves the taste, and the professional service makes ordering for our business so easy. Customer service is top-notch!",
      highlight: "Perfect for office environments",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Wellness Blogger",
      location: "Florida",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "I've tried many water brands for my wellness blog reviews, but AquaNest stands out. The purity, taste, and environmental commitment make it my top choice. My readers love my recommendations!",
      highlight: "Top choice for wellness enthusiasts",
    },
    {
      id: 6,
      name: "Robert Kim",
      role: "Restaurant Owner",
      location: "Washington",
      image:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "Using AquaNest in our restaurant has elevated our beverage program. Customers consistently compliment the water quality, and the reliable delivery ensures we never run out during busy service.",
      highlight: "Elevates restaurant beverage programs",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-10 bg-blue-500"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-500 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              What Our Customers Say
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Don't just take our word for it - hear from thousands of satisfied
              customers who have made AquaNest their trusted water delivery
              partner
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <motion.div
              className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-96 md:h-80 flex items-center">
                <motion.button
                  onClick={prevSlide}
                  className="absolute left-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </motion.button>

                <motion.button
                  onClick={nextSlide}
                  className="absolute right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </motion.button>

                <div className="w-full px-16">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      className="text-center text-white"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Quote className="h-12 w-12 text-blue-200 mx-auto mb-6" />
                      </motion.div>
                      <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-4xl mx-auto">
                        "{testimonials[currentSlide].text}"
                      </p>

                      <div className="flex flex-col items-center">
                        <motion.img
                          src={testimonials[currentSlide].image}
                          alt={testimonials[currentSlide].name}
                          className="w-16 h-16 rounded-full border-4 border-white shadow-lg mb-4"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Star className="h-5 w-5 text-yellow-300 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold">
                          {testimonials[currentSlide].name}
                        </h3>
                        <p className="text-blue-200">
                          {testimonials[currentSlide].role} •{" "}
                          {testimonials[currentSlide].location}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
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
              More Happy Customers
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers across the nation
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="flex items-center mb-4">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-blue-600">
                    {testimonial.highlight}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-blue-200">
              Our numbers speak for themselves
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Users, number: "50,000+", label: "Happy Customers" },
              { icon: Star, number: "4.9/5", label: "Average Rating" },
              { icon: Heart, number: "99%", label: "Would Recommend" },
              { icon: Award, number: "1M+", label: "Bottles Delivered" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
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
                  className="text-5xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-blue-200">{stat.label}</div>
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
              Ready to Join Our Happy Customers?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the difference that pure, premium water can make in
              your daily life
            </p>
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Order Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Testimonials;
