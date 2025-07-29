import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  label,
  required = false,
  accept,
  multiple,
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
<input
        type={type}
        ref={ref}
        accept={accept}
        multiple={multiple}
        className={cn(
          "w-full px-4 py-3 border rounded-lg transition-all duration-200 font-body",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "placeholder:text-gray-400",
          type === "file" && "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100",
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

Input.displayName = "Input";

export default Input;