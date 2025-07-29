import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const NavLink = ({ 
  href, 
  children, 
  isActive = false, 
  onClick, 
  className = "" 
}) => {
  const handleClick = (e) => {
    e.preventDefault();
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
    
    if (onClick) onClick();
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={cn(
        "relative px-4 py-2 font-medium transition-all duration-200 rounded-lg",
        "hover:bg-primary-50 hover:text-primary-700",
        isActive 
          ? "text-accent-600 bg-accent-50" 
          : "text-gray-700 hover:text-primary-700",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full"
          layoutId="activeTab"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.a>
  );
};

export default NavLink;