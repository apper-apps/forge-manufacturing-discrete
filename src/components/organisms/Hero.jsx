import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import React from "react";

const Hero = () => {
  const scrollToProducts = () => {
    const productsElement = document.getElementById("products");
    if (productsElement) {
      const offset = 100;
      const elementPosition = productsElement.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      const offset = 100;
      const elementPosition = contactElement.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
              <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1e3a5f;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#4a6fa5;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#ff6b35;stop-opacity:0.8" />
                  </linearGradient>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bg)"/>
                <rect width="100%" height="100%" fill="url(#grid)"/>
                <g opacity="0.1">
                  <circle cx="200" cy="150" r="60" fill="white"/>
                  <circle cx="800" cy="250" r="40" fill="white"/>
                  <circle cx="1000" cy="500" r="80" fill="white"/>
                  <rect x="300" y="400" width="120" height="80" fill="white" transform="rotate(15 360 440)"/>
                  <rect x="600" y="150" width="80" height="100" fill="white" transform="rotate(-10 640 200)"/>
                </g>
              </svg>
            `)}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-primary-800/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <ApperIcon name="Award" className="w-4 h-4 text-accent-400 mr-2" />
            <span className="text-sm font-medium text-white">ISO 9001 Certified Manufacturing</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Precision Manufacturing
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-body leading-relaxed"
          >
            From prototypes to production, we deliver exceptional quality manufacturing 
            services with cutting-edge technology and unmatched precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 shadow-xl"
            >
              Explore Capabilities
              <ApperIcon name="ArrowRight" className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4"
            >
              Get Quote
              <ApperIcon name="MessageSquare" className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto"
          >
            {[
              { number: "25+", label: "Years Experience" },
              { number: "500+", label: "Projects Completed" },
              { number: "99.9%", label: "Quality Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-body mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={scrollToProducts}
        >
          <ApperIcon name="ChevronDown" className="w-6 h-6 text-white/70 hover:text-white transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;