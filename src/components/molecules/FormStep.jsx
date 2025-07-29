import { motion } from "framer-motion";

const FormStep = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-primary-800 mb-2">
          {title}
        </h2>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
};

export default FormStep;