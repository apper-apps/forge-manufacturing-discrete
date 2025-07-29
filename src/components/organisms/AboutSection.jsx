import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    clients: 0,
    satisfaction: 0
  });
  const statsRef = useRef(null);

  // Timeline data
  const timeline = [
    {
      year: "1998",
      title: "Humble Beginnings",
      description: "Founded as a small precision machining shop with just 3 employees and a vision for excellence.",
      icon: "Zap"
    },
    {
      year: "2005",
      title: "First Major Contract",
      description: "Secured our first aerospace contract, establishing our reputation for precision manufacturing.",
      icon: "Rocket"
    },
    {
      year: "2012",
      title: "ISO 9001 Certification",
      description: "Achieved ISO 9001 certification, formalizing our commitment to quality management systems.",
      icon: "Award"
    },
    {
      year: "2018",
      title: "Facility Expansion",
      description: "Doubled our manufacturing capacity with a state-of-the-art 50,000 sq ft facility.",
      icon: "Building"
    },
    {
      year: "2024",
      title: "Industry Leadership",
      description: "Today we serve 200+ clients across aerospace, medical, and automotive industries.",
      icon: "Trophy"
    }
  ];

  // Team members
  const team = [
    {
      name: "Michael Chen",
      role: "CEO & Founder",
      expertise: ["Strategic Leadership", "Manufacturing Operations", "Business Development"],
      image: "data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234a6fa5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ff6b35;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg1)'/%3E%3Ccircle cx='60' cy='45' r='20' fill='white' opacity='0.9'/%3E%3Cpath d='M25 90 Q25 75 40 75 L80 75 Q95 75 95 90 L95 110 L25 110 Z' fill='white' opacity='0.9'/%3E%3C/svg%3E"
    },
    {
      name: "Sarah Rodriguez",
      role: "VP of Engineering",
      expertise: ["Advanced Manufacturing", "Quality Systems", "Process Optimization"],
      image: "data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b35;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234a6fa5;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg2)'/%3E%3Ccircle cx='60' cy='45' r='20' fill='white' opacity='0.9'/%3E%3Cpath d='M25 90 Q25 75 40 75 L80 75 Q95 75 95 90 L95 110 L25 110 Z' fill='white' opacity='0.9'/%3E%3C/svg%3E"
    },
    {
      name: "David Kim",
      role: "Head of Operations",
      expertise: ["Lean Manufacturing", "Supply Chain", "Production Planning"],
      image: "data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236366f1;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg3)'/%3E%3Ccircle cx='60' cy='45' r='20' fill='white' opacity='0.9'/%3E%3Cpath d='M25 90 Q25 75 40 75 L80 75 Q95 75 95 90 L95 110 L25 110 Z' fill='white' opacity='0.9'/%3E%3C/svg%3E"
    },
    {
      name: "Jennifer Park",
      role: "Quality Director",
      expertise: ["Quality Assurance", "Six Sigma", "Regulatory Compliance"],
      image: "data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2310b981;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg4)'/%3E%3Ccircle cx='60' cy='45' r='20' fill='white' opacity='0.9'/%3E%3Cpath d='M25 90 Q25 75 40 75 L80 75 Q95 75 95 90 L95 110 L25 110 Z' fill='white' opacity='0.9'/%3E%3C/svg%3E"
    }
  ];

  // Facility tour sections
  const facilityTour = [
    {
      title: "Shop Floor",
      description: "State-of-the-art manufacturing floor with precision equipment and optimized workflows.",
      features: ["5-Axis CNC Machines", "Automated Material Handling", "Real-time Monitoring"],
      icon: "Factory",
      image: "data:image/svg+xml,%3Csvg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='floor' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f8fafc;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e2e8f0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23floor)'/%3E%3Crect x='50' y='80' width='80' height='60' fill='%234a6fa5' rx='8'/%3E%3Crect x='200' y='100' width='100' height='40' fill='%23ff6b35' rx='6'/%3E%3Crect x='320' y='70' width='60' height='80' fill='%236366f1' rx='8'/%3E%3Ccircle cx='150' cy='180' r='25' fill='%2310b981'/%3E%3Ctext x='200' y='230' text-anchor='middle' fill='%234a6fa5' font-size='14' font-weight='bold'%3EShop Floor%3C/text%3E%3C/svg%3E"
    },
    {
      title: "Equipment Showcase",
      description: "Advanced machinery including CNC mills, lathes, and specialized tooling systems.",
      features: ["Swiss-Type Lathes", "Wire EDM", "CMM Inspection"],
      icon: "Settings",
      image: "data:image/svg+xml,%3Csvg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='equip' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f1f5f9;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23cbd5e1;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23equip)'/%3E%3Crect x='80' y='60' width='240' height='130' fill='%234a6fa5' rx='12'/%3E%3Ccircle cx='150' cy='125' r='35' fill='%23ff6b35'/%3E%3Ccircle cx='250' cy='125' r='35' fill='%2310b981'/%3E%3Crect x='140' y='160' width='120' height='20' fill='%236366f1' rx='10'/%3E%3Ctext x='200' y='220' text-anchor='middle' fill='%234a6fa5' font-size='14' font-weight='bold'%3EAdvanced Equipment%3C/text%3E%3C/svg%3E"
    },
    {
      title: "Quality Control",
      description: "Comprehensive quality assurance with advanced metrology and testing capabilities.",
      features: ["Coordinate Measuring", "Surface Analysis", "Material Testing"],
      icon: "Shield",
      image: "data:image/svg+xml,%3Csvg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='quality' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fefce8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde047;stop-opacity:0.3' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23quality)'/%3E%3Cpath d='M200 60 L240 90 L200 120 L160 90 Z' fill='%2310b981'/%3E%3Crect x='120' y='140' width='160' height='60' fill='%234a6fa5' rx='8'/%3E%3Ccircle cx='200' cy='90' r='15' fill='%23ff6b35'/%3E%3Ctext x='200' y='230' text-anchor='middle' fill='%234a6fa5' font-size='14' font-weight='bold'%3EQuality Control%3C/text%3E%3C/svg%3E"
    }
  ];

  // Certifications and awards
  const certifications = [
    { name: "ISO 9001:2015", type: "certification", icon: "Award" },
    { name: "AS9100D", type: "certification", icon: "Plane" },
    { name: "ITAR Registered", type: "certification", icon: "Shield" },
    { name: "Excellence Award 2023", type: "award", icon: "Trophy" },
    { name: "Best Supplier 2022", type: "award", icon: "Star" },
    { name: "Innovation Prize", type: "award", icon: "Lightbulb" }
  ];

  // Industry partnerships
  const partnerships = [
    { name: "Boeing", logo: "Plane" },
    { name: "Medtronic", logo: "Heart" },
    { name: "Tesla", logo: "Zap" },
    { name: "Lockheed Martin", logo: "Rocket" }
  ];
];

  // Company values
  const values = [
    {
      title: "Precision Excellence",
      description: "We maintain the highest standards of accuracy and quality in every component we manufacture, ensuring zero-defect delivery.",
      icon: "Target"
    },
    {
      title: "Innovation Focus",
      description: "Continuously investing in cutting-edge technology and processes to stay ahead of industry demands and challenges.",
      icon: "Lightbulb"
    },
    {
      title: "Customer Partnership",
      description: "Building long-term relationships through transparent communication, reliable delivery, and exceptional service.",
      icon: "Handshake"
    }
  ];

  // Statistics for animated counters
  const stats = [
    { key: "years", target: 25, suffix: "+", label: "Years in Business", icon: "Calendar" },
    { key: "projects", target: 500, suffix: "+", label: "Projects Completed", icon: "CheckCircle" },
    { key: "clients", target: 200, suffix: "+", label: "Satisfied Clients", icon: "Users" },
    { key: "satisfaction", target: 99.9, suffix: "%", label: "Client Satisfaction", icon: "ThumbsUp" }

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animate counters
  const animateCounters = () => {
    stats.forEach(({ key, target }) => {
      let start = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [key]: key === "satisfaction" ? start.toFixed(1) : Math.floor(start)
        }));
      }, 40);
    });
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-surface to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
            transition={{
                duration: 0.6
            }}
            className="text-center mb-16">
            <div
                className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-6">
                <span className="text-sm font-medium text-primary-700">About Forge Pro</span>
            </div>
            <h2
                className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">Crafting <span
                    className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Excellence</span>
            </h2>
            <p
                className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">For over two decades, Forge Pro has been at the forefront of precision manufacturing, 
                            delivering innovative solutions that power industries worldwide.
                          </p>
        </motion.div>
        {/* Main Content */}
        {/* Company Timeline */}
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
            transition={{
                duration: 0.6
            }}
            className="mb-24">
            <div className="text-center mb-16">
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Our Journey Through Time
                                </h3>
                <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">From humble beginnings to industry leadership - the milestones that shaped our company
                                </p>
            </div>
            <div className="relative">
                {/* Timeline line */}
                <div
                    className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                <div className="space-y-12">
                    {timeline.map((milestone, index) => <motion.div
                        key={index}
                        className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                        initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? -50 : 50
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.2
                        }}>
                        <div
                            className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                                <div className="text-primary-600 font-display font-bold text-xl mb-2">
                                    {milestone.year}
                                </div>
                                <h4 className="text-gray-900 font-display font-bold text-lg mb-3">
                                    {milestone.title}
                                </h4>
                                <p className="text-gray-600 font-body leading-relaxed">
                                    {milestone.description}
                                </p>
                            </div>
                        </div>
                        {/* Timeline node */}
                        <div className="w-2/12 flex justify-center">
                            <div
                                className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                                <ApperIcon name={milestone.icon} className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="w-5/12"></div>
                    </motion.div>)}
                </div>
            </div>
        </motion.div>
        {/* Team Members Section */}
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
            transition={{
                duration: 0.6
            }}
            className="mb-24">
            <div className="text-center mb-16">
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Meet Our Leadership Team
                                </h3>
                <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">The experts behind our success, bringing decades of experience and innovation
                                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300"
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1
                    }}>
                    <div className="mb-6">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 group-hover:scale-105 transition-transform duration-300" />
                        <h4 className="text-xl font-display font-bold text-gray-900 mb-1">
                            {member.name}
                        </h4>
                        <p className="text-primary-600 font-medium font-body mb-4">
                            {member.role}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700 mb-3">Expertise Areas:</p>
                        {member.expertise.map((skill, skillIndex) => <span
                            key={skillIndex}
                            className="inline-block bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium m-1">
                            {skill}
                        </span>)}
                    </div>
                </motion.div>)}
            </div>
        </motion.div>
        {/* Virtual Facility Tour */}
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
            transition={{
                duration: 0.6
            }}
            className="mb-24">
            <div className="text-center mb-16">
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Virtual Facility Tour
                                </h3>
                <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">Explore our state-of-the-art manufacturing facility and advanced capabilities
                                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {facilityTour.map((section, index) => <motion.div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300"
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.2
                    }}>
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div
                            className="absolute top-4 left-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full w-12 h-12 flex items-center justify-center">
                            <ApperIcon name={section.icon} className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-display font-bold text-gray-900 mb-3">
                            {section.title}
                        </h4>
                        <p className="text-gray-600 font-body mb-4 leading-relaxed">
                            {section.description}
                        </p>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                            {section.features.map(
                                (feature, featureIndex) => <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                                    <ApperIcon name="Check" className="w-4 h-4 text-primary-500 mr-2" />
                                    {feature}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>)}
            </div>
        </motion.div>
        {/* Certifications and Awards */}
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
            transition={{
                duration: 0.6
            }}
            className="mb-24">
            <div className="text-center mb-16">
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Certifications & Recognition
                                </h3>
                <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">Our commitment to excellence recognized by industry standards and awards
                                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                {certifications.map((cert, index) => <motion.div
                    key={index}
                    className={`bg-white rounded-lg p-6 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 ${cert.type === "award" ? "border-accent-200 bg-gradient-to-br from-accent-50 to-white" : "border-primary-200 bg-gradient-to-br from-primary-50 to-white"}`}
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1
                    }}>
                    <div
                        className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 ${cert.type === "award" ? "bg-gradient-to-br from-accent-500 to-accent-600" : "bg-gradient-to-br from-primary-500 to-primary-600"}`}>
                        <ApperIcon name={cert.icon} className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="text-sm font-display font-bold text-gray-900">
                        {cert.name}
                    </h5>
                </motion.div>)}
            </div>
            {/* Industry Partnerships */}
            <div className="text-center mb-8">
                <h4 className="text-xl font-display font-bold text-gray-900 mb-4">Trusted by Industry Leaders
                                </h4>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
                {partnerships.map((partner, index) => <motion.div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1
                    }}>
                    <div className="flex items-center space-x-3">
                        <div
                            className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg p-2">
                            <ApperIcon name={partner.logo} className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display font-bold text-gray-900">
                            {partner.name}
                        </span>
                    </div>
                </motion.div>)}
            </div>
        </motion.div>
        {/* Animated Statistics */}
        <motion.div
            ref={statsRef}
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
            transition={{
                duration: 0.6
            }}
            className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-display font-bold text-white mb-4">Our Impact in Numbers
                                </h3>
                <p className="text-primary-100 font-body text-lg max-w-2xl mx-auto">Delivering measurable results and building lasting partnerships across industries
                                </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => <motion.div
                    key={index}
                    className="text-center"
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1
                    }}>
                    <div
                        className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <ApperIcon name={stat.icon} className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-display font-bold text-white mb-2">
                        {counters[stat.key]}{stat.suffix}
                    </div>
                    <div className="text-primary-100 font-body">
                        {stat.label}
                    </div>
                </motion.div>)}
            </div>
        </motion.div>
        {/* Values Section */}
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
            transition={{
                duration: 0.6,
                delay: 0.3
            }}>
            <div className="text-center mb-12">
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Our Core Values
                                </h3>
                <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">The principles that guide everything we do and define who we are as a company
                                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => <motion.div
                    key={index}
                    className="text-center group"
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1
                    }}>
                    <div
                        className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <ApperIcon name={value.icon} className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-display font-bold text-gray-900 mb-4">
                        {value.title}
                    </h4>
                    <p className="text-gray-600 font-body leading-relaxed">
                        {value.description}
                    </p>
                </motion.div>)}
            </div>
        </motion.div></div>
</section>
  );
};

export default AboutSection;