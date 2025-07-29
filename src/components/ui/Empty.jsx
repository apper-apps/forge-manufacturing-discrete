import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found",
  description = "There are no items to display at the moment.",
  action = null,
  icon = "Package",
  className = "" 
}) => {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-primary-50 rounded-full p-6 mb-6">
        <ApperIcon 
          name={icon} 
          className="h-16 w-16 text-primary-400" 
        />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 font-body mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {action && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;