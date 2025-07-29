import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry = null,
  className = "" 
}) => {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-red-50 rounded-full p-4 mb-6">
        <ApperIcon 
          name="AlertTriangle" 
          className="h-12 w-12 text-red-500" 
        />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 font-body mb-8 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4 inline mr-2" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;