import { motion } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    { name: "Precision Machining", href: "#products" },
    { name: "Metal Fabrication", href: "#products" },
    { name: "Prototype Development", href: "#products" },
    { name: "Quality Control", href: "#products" }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: "Linkedin", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offset = 100;
        const elementPosition = targetElement.offsetTop - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary-900 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Logo size="md" className="mb-6" />
              <p className="text-gray-300 font-body leading-relaxed mb-6">
                Precision manufacturing solutions with over 25 years of excellence. 
                From prototypes to production, we deliver quality that exceeds expectations.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <ApperIcon name={social.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-display font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-gray-300 hover:text-white font-body transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-display font-bold mb-6">Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <button
                      onClick={() => handleLinkClick(service.href)}
                      className="text-gray-300 hover:text-white font-body transition-colors duration-200 text-left"
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-display font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="MapPin" className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 font-body">
                    <p>1234 Manufacturing Way</p>
                    <p>Industrial District, NY 12345</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Phone" className="w-5 h-5 text-accent-400 flex-shrink-0" />
                  <span className="text-gray-300 font-body">+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Mail" className="w-5 h-5 text-accent-400 flex-shrink-0" />
                  <span className="text-gray-300 font-body">info@forgepro.com</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 font-body text-sm">
              © {currentYear} Forge Pro Manufacturing. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;