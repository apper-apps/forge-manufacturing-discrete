import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const AboutSection = () => {
  const values = [
    {
      icon: "Target",
      title: "Precision",
      description: "Every component meets exact specifications with tolerances that exceed industry standards."
    },
    {
      icon: "Users",
      title: "Partnership",
      description: "We work closely with clients to understand their unique needs and deliver tailored solutions."
    },
    {
      icon: "Award",
      title: "Excellence",
      description: "Committed to continuous improvement and maintaining the highest quality standards."
    }
  ];

  const stats = [
    { number: "25+", label: "Years of Experience", icon: "Calendar" },
    { number: "500+", label: "Projects Completed", icon: "CheckCircle" },
    { number: "50+", label: "Team Members", icon: "Users" },
    { number: "99.9%", label: "Quality Rate", icon: "Award" }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-6">
            <span className="text-sm font-medium text-primary-700">About Forge Pro</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Crafting <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Excellence</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            For over two decades, Forge Pro has been at the forefront of precision manufacturing, 
            delivering innovative solutions that power industries worldwide.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Our Story
              </h3>
              <div className="space-y-4 text-gray-600 font-body leading-relaxed">
                <p>
                  Founded in 1998, Forge Pro began as a small precision machining shop with a vision 
                  to revolutionize manufacturing through innovation and unwavering commitment to quality.
                </p>
                <p>
                  Today, we've grown into a comprehensive manufacturing partner, serving industries 
                  from aerospace to medical devices, while maintaining the personalized service and 
                  attention to detail that built our reputation.
                </p>
                <p>
                  Our ISO 9001 certified facility combines traditional craftsmanship with cutting-edge 
                  technology, ensuring every project meets the highest standards of precision and reliability.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg p-2">
                      <ApperIcon name={stat.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-1">
              <div 
                className="bg-gray-200 rounded-xl h-96 bg-cover bg-center"
                style={{
                  backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#f5f7fa;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#bg)"/>
                      <g fill="#1e3a5f" opacity="0.3">
                        <rect x="50" y="50" width="80" height="60" rx="5"/>
                        <rect x="150" y="80" width="100" height="40" rx="5"/>
                        <rect x="270" y="60" width="60" height="80" rx="5"/>
                        <circle cx="100" cy="200" r="30"/>
                        <circle cx="200" cy="220" r="25"/>
                        <circle cx="300" cy="200" r="35"/>
                      </g>
                      <text x="200" y="270" text-anchor="middle" fill="#4a6fa5" font-family="sans-serif" font-size="16" font-weight="bold">Manufacturing Excellence</text>
                    </svg>
                  `)}`
                }}
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-4">
              {stats.slice(2).map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-lg border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-center">
                    <div className="text-xl font-display font-bold text-gray-900">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Our Core Values
            </h3>
            <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as a company
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={value.icon} className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-display font-bold text-gray-900 mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-600 font-body leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;