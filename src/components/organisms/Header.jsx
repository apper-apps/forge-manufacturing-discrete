import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import NavLink from "@/components/molecules/NavLink";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import useScrollSpy from "@/hooks/useScrollSpy";

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
const sectionIds = ["home", "products", "services", "projects", "about", "contact"];
const activeSection = useScrollSpy(sectionIds);

const navigationItems = [
{ href: "#home", label: "Home" },
{ href: "#products", label: "Products" },
{ href: "#services", label: "Services" },
{ href: "#projects", label: "Projects" },
{ href: "#about", label: "About" },
{ href: "#contact", label: "Contact" }
];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const navigateToQuote = () => {
    navigate('/quote-request');
    setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation */}
<nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  isActive={activeSection === item.href.replace("#", "")}
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                href="/quote-request"
                isActive={location.pathname === "/quote-request"}
              >
                Quote Request
              </NavLink>
            </nav>

            {/* Desktop CTA */}
<div className="hidden lg:block">
              <Button onClick={navigateToQuote} size="md">
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                className="w-6 h-6 text-gray-700"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Logo size="sm" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="X" className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

<nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      isActive={activeSection === item.href.replace("#", "")}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-3 rounded-lg"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <NavLink
                    href="/quote-request"
                    isActive={location.pathname === "/quote-request"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left px-4 py-3 rounded-lg"
                  >
                    Quote Request
                  </NavLink>
                </nav>

                <div className="mt-8">
<Button onClick={navigateToQuote} size="lg" className="w-full">
                    Get Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;