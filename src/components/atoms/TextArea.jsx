import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const TextArea = forwardRef(({ 
  className, 
  error = false,
  label,
  required = false,
  rows = 4,
  ...props 
}, ref) => {
  const id = props.id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 border rounded-lg transition-all duration-200 font-body resize-vertical",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "placeholder:text-gray-400",
          error 
            ? "border-red-300 bg-red-50 focus:ring-red-500" 
            : "border-gray-300 bg-white hover:border-gray-400",
          className
        )}
        {...props}
      />
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;