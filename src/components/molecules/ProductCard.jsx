import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ProductCard = ({ product, index = 0 }) => {
  return (
    <motion.div
      className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        y: -5
      }}
    >
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-4 w-16 h-16 mb-6 group-hover:from-accent-500 group-hover:to-accent-600 transition-all duration-300">
          <ApperIcon 
            name={product.icon} 
            className="w-8 h-8 text-white"
          />
        </div>
        
        <h3 className="text-xl font-display font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
          {product.title}
        </h3>
        
        <p className="text-gray-600 font-body leading-relaxed flex-grow">
          {product.description}
        </p>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <span className="inline-flex items-center text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;