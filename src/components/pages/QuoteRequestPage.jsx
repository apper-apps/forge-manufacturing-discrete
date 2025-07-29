import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import StepIndicator from "@/components/molecules/StepIndicator";
import FormStep from "@/components/molecules/FormStep";
import FileUpload from "@/components/molecules/FileUpload";
import ApperIcon from "@/components/ApperIcon";
import { quoteService } from "@/services/api/quoteService";

const QuoteRequestPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Project Details
    projectType: "",
    quantity: "",
    timeline: "",
    description: "",
    
    // Step 2: Technical Specifications
    materials: "",
    tolerances: "",
    finishRequirements: "",
    dimensions: "",
    specialRequirements: "",
    
    // Step 3: File Upload
    files: [],
    
    // Step 4: Contact Information
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    additionalNotes: ""
  });
  
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: "Project Details", description: "Tell us about your project" },
    { number: 2, title: "Technical Specs", description: "Specify technical requirements" },
    { number: 3, title: "File Upload", description: "Upload drawings and references" },
    { number: 4, title: "Contact Info", description: "Your contact information" }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.projectType) newErrors.projectType = "Project type is required";
        if (!formData.quantity) newErrors.quantity = "Quantity is required";
        if (!formData.timeline) newErrors.timeline = "Timeline is required";
        if (!formData.description) newErrors.description = "Description is required";
        break;
        
      case 2:
        if (!formData.materials) newErrors.materials = "Materials specification is required";
        if (!formData.tolerances) newErrors.tolerances = "Tolerances are required";
        break;
        
      case 4:
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email format is invalid";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    try {
      await quoteService.create(formData);
      toast.success("Quote request submitted successfully! We'll contact you within 24 hours.");
      navigate('/');
    } catch (error) {
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep title="Project Details" description="Tell us about your manufacturing project">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type <span className="text-accent-500">*</span>
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  <option value="machining">CNC Machining</option>
                  <option value="fabrication">Metal Fabrication</option>
                  <option value="welding">Welding Services</option>
                  <option value="assembly">Assembly</option>
                  <option value="prototype">Prototype Development</option>
                  <option value="other">Other</option>
                </select>
                {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
              </div>
              
              <Input
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="Enter quantity needed"
                required
                error={!!errors.quantity}
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline <span className="text-accent-500">*</span>
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="rush">Rush (1-2 weeks)</option>
                  <option value="standard">Standard (3-4 weeks)</option>
                  <option value="extended">Extended (5-8 weeks)</option>
                  <option value="flexible">Flexible</option>
                </select>
                {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
              </div>
              
              <div className="md:col-span-2">
                <TextArea
                  label="Project Description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your project requirements in detail..."
                  rows={4}
                  required
                  error={!!errors.description}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          </FormStep>
        );
        
      case 2:
        return (
          <FormStep title="Technical Specifications" description="Provide detailed technical requirements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Materials"
                name="materials"
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                placeholder="e.g., Aluminum 6061, Steel 1018"
                required
                error={!!errors.materials}
              />
              {errors.materials && <p className="text-red-500 text-sm mt-1">{errors.materials}</p>}
              
              <Input
                label="Tolerances"
                name="tolerances"
                value={formData.tolerances}
                onChange={(e) => handleInputChange('tolerances', e.target.value)}
                placeholder="e.g., ±0.005 inches"
                required
                error={!!errors.tolerances}
              />
              {errors.tolerances && <p className="text-red-500 text-sm mt-1">{errors.tolerances}</p>}
              
              <Input
                label="Finish Requirements"
                name="finishRequirements"
                value={formData.finishRequirements}
                onChange={(e) => handleInputChange('finishRequirements', e.target.value)}
                placeholder="e.g., Anodized, Powder coated"
              />
              
              <Input
                label="Dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={(e) => handleInputChange('dimensions', e.target.value)}
                placeholder="Overall part dimensions"
              />
              
              <div className="md:col-span-2">
                <TextArea
                  label="Special Requirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Any special manufacturing requirements, certifications, or quality standards..."
                  rows={3}
                />
              </div>
            </div>
          </FormStep>
        );
        
      case 3:
        return (
          <FormStep title="File Upload" description="Upload drawings, CAD files, and reference images">
            <div className="space-y-6">
              <FileUpload
                files={formData.files}
                onFilesChange={(files) => handleInputChange('files', files)}
                acceptedTypes=".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.jpg,.jpeg,.png,.zip"
                maxSize={50}
                maxFiles={10}
              />
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ApperIcon name="Info" className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" size={16} />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Supported file types:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>CAD Files: .dwg, .dxf, .step, .stp, .iges, .igs</li>
                      <li>Documents: .pdf</li>
                      <li>Images: .jpg, .jpeg, .png</li>
                      <li>Archives: .zip (max 50MB per file)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FormStep>
        );
        
      case 4:
        return (
          <FormStep title="Contact Information" description="How can we reach you?">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                required
                error={!!errors.name}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@company.com"
                required
                error={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                required
                error={!!errors.phone}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              
              <Input
                label="Company"
                name="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your company name"
              />
              
              <div className="md:col-span-2">
                <TextArea
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Your business address"
                  rows={2}
                />
              </div>
              
              <div className="md:col-span-2">
                <TextArea
                  label="Additional Notes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  placeholder="Any additional information or special requests..."
                  rows={3}
                />
              </div>
            </div>
          </FormStep>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-primary-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary-800 mb-4"
          >
            Request a Quote
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Get a detailed quote for your manufacturing project. Fill out our comprehensive form and we'll respond within 24 hours.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <StepIndicator currentStep={currentStep} steps={steps} />
          </motion.div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-12"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="px-8 md:px-12 py-6 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ApperIcon name="ChevronLeft" size={16} className="mr-1" />
                  Previous
                </Button>

                <div className="flex items-center space-x-4">
                  {currentStep < 4 ? (
                    <Button onClick={handleNext} className="flex items-center">
                      Next
                      <ApperIcon name="ChevronRight" size={16} className="ml-1" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit} 
                      loading={isSubmitting}
                      className="flex items-center"
                    >
                      <ApperIcon name="Send" size={16} className="mr-2" />
                      Submit Quote Request
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestPage;