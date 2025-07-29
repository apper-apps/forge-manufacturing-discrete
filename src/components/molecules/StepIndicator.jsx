import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isUpcoming = currentStep < step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative z-10"
            >
              {/* Step Circle */}
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isCompleted && "bg-gradient-to-r from-primary-500 to-accent-500 border-transparent text-white",
                  isCurrent && "bg-white border-primary-500 text-primary-600 shadow-lg ring-4 ring-primary-100",
                  isUpcoming && "bg-white border-gray-300 text-gray-400"
                )}
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <ApperIcon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </motion.div>

              {/* Step Info */}
              <div className="mt-3 text-center max-w-32">
                <motion.h3
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    (isCompleted || isCurrent) ? "text-primary-700" : "text-gray-500"
                  )}
                  animate={{ scale: isCurrent ? 1.05 : 1 }}
                >
                  {step.title}
                </motion.h3>
                <p className={cn(
                  "text-xs mt-1 transition-colors duration-300",
                  (isCompleted || isCurrent) ? "text-gray-600" : "text-gray-400"
                )}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;