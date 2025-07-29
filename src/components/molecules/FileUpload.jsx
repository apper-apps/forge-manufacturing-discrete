import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FileUpload = ({ 
  files = [], 
  onFilesChange, 
  acceptedTypes = "*", 
  maxSize = 10, 
  maxFiles = 5,
  className 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    // Check file size (convert MB to bytes)
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File "${file.name}" is too large. Maximum size is ${maxSize}MB.`);
      return false;
    }

    // Check file type if specified
    if (acceptedTypes !== "*") {
      const acceptedExtensions = acceptedTypes.split(',').map(type => type.trim().toLowerCase());
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!acceptedExtensions.includes(fileExtension)) {
        toast.error(`File type "${fileExtension}" is not supported.`);
        return false;
      }
    }

    return true;
  };

  const handleFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).filter(validateFile);
    
    if (files.length + validFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    // Check for duplicates
    const uniqueFiles = validFiles.filter(newFile => 
      !files.some(existingFile => 
        existingFile.name === newFile.name && existingFile.size === newFile.size
      )
    );

    if (uniqueFiles.length !== validFiles.length) {
      toast.warning("Some files were already uploaded and skipped.");
    }

    if (uniqueFiles.length > 0) {
      const updatedFiles = [...files, ...uniqueFiles];
      onFilesChange(updatedFiles);
      toast.success(`${uniqueFiles.length} file(s) uploaded successfully.`);
    }
  }, [files, onFilesChange, maxFiles]);

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFilesChange(updatedFiles);
    toast.info("File removed.");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
    e.target.value = ''; // Reset input
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    const iconMap = {
      pdf: "FileText",
      dwg: "FileImage",
      dxf: "FileImage", 
      step: "Box",
      stp: "Box",
      iges: "Box",
      igs: "Box",
      jpg: "Image",
      jpeg: "Image",
      png: "Image",
      zip: "Archive"
    };

    return iconMap[extension] || "File";
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Area */}
      <motion.div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
          isDragOver 
            ? "border-primary-500 bg-primary-50" 
            : "border-gray-300 hover:border-gray-400 bg-gray-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300",
              isDragOver ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500"
            )}
            animate={{ scale: isDragOver ? 1.1 : 1 }}
          >
            <ApperIcon name="Upload" size={24} />
          </motion.div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Maximum {maxFiles} files, {maxSize}MB each
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="FolderOpen" size={16} className="mr-2" />
              Choose Files
            </Button>
          </div>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-3"
          >
            <h4 className="text-sm font-medium text-gray-700">
              Uploaded Files ({files.length}/{maxFiles})
            </h4>
            
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name={getFileIcon(file.name)} size={16} className="text-primary-600" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;