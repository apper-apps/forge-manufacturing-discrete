import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Logo = ({ className = "", size = "md" }) => {
  const sizes = {
    sm: { icon: 24, text: "text-xl" },
    md: { icon: 32, text: "text-2xl" },
    lg: { icon: 40, text: "text-3xl" }
  };

  return (
    <motion.div 
      className={`flex items-center space-x-3 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-2 rounded-lg shadow-md">
        <ApperIcon 
          name="Zap" 
          className={`text-white`}
          size={sizes[size].icon}
        />
      </div>
      <div className={`font-display font-bold ${sizes[size].text} bg-gradient-to-r from-primary-900 to-primary-700 bg-clip-text text-transparent`}>
        Forge Pro
      </div>
    </motion.div>
  );
};

export default Logo;