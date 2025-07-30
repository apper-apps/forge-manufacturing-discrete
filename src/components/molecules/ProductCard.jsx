import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ProductCard = ({ product, index = 0, onProductClick }) => {
  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <motion.div
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        y: -5
      }}
      layout
      onClick={handleClick}
    >
      <div className="flex flex-col h-full">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center text-xs font-medium text-white bg-gradient-to-r from-accent-500 to-accent-600 px-3 py-1 rounded-full shadow-lg">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          {/* Product Title */}
          <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
            {product.title}
          </h3>
          
          {/* Product Description */}
          <p className="text-gray-600 font-body leading-relaxed mb-4">
            {product.description}
          </p>
          
          {/* Key Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Specifications:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.specifications.map((spec, idx) => (
                  <li key={idx} className="flex items-center">
                    <ApperIcon name="Check" className="w-3 h-3 text-accent-500 mr-2 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Materials Used */}
          {product.materials && product.materials.length > 0 && (
            <div className="mt-auto pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Materials:</h4>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded-md"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;