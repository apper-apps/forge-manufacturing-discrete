import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ServiceCard = ({ service, index = 0 }) => {
  return (
    <motion.div
      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start space-x-4">
        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg p-3 flex-shrink-0">
          <ApperIcon 
            name="CheckCircle" 
            className="w-6 h-6 text-white"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
            {service.name}
          </h3>
          
          <p className="text-gray-600 font-body mb-4 leading-relaxed">
            {service.description}
          </p>
          
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-600">
                <ApperIcon 
                  name="ArrowRight" 
                  className="w-4 h-4 text-accent-500 mr-2 flex-shrink-0"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;