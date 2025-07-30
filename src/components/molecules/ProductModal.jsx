import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ProductModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!product) return null;

  // Parse specifications and materials from comma-separated strings
  const specifications = typeof product.specifications === 'string' 
    ? product.specifications.split(',').filter(spec => spec.trim()) 
    : (Array.isArray(product.specifications) ? product.specifications : []);
  
  const materials = typeof product.materials === 'string' 
    ? product.materials.split(',').filter(material => material.trim()) 
    : (Array.isArray(product.materials) ? product.materials : []);

  // Generate typical applications based on category and product info
  const getTypicalApplications = () => {
    const category = product.category?.toLowerCase() || '';
    const baseApplications = {
      'custom parts': [
        'Aerospace components',
        'Automotive parts',
        'Medical device components',
        'Industrial machinery parts'
      ],
      'assemblies': [
        'Complete sub-assemblies',
        'Multi-component systems',
        'Integrated mechanisms',
        'Custom fixture assemblies'
      ],
      'prototypes': [
        'Proof of concept models',
        'Design validation',
        'Functional testing',
        'Pre-production samples'
      ],
      'tooling': [
        'Production tooling',
        'Jigs and fixtures',
        'Inspection gauges',
        'Assembly aids'
      ]
    };
    
    return baseApplications[category] || [
      'Custom manufacturing solutions',
      'Precision components',
      'Industrial applications',
      'Specialized equipment parts'
    ];
  };

  // Generate manufacturing process overview based on materials and category
  const getManufacturingProcess = () => {
    const materialList = materials.join(', ').toLowerCase();
    const category = product.category?.toLowerCase() || '';
    
    let processes = [];
    
    if (materialList.includes('aluminum') || materialList.includes('steel') || materialList.includes('metal')) {
      processes.push('CNC Machining', 'Precision Cutting', 'Surface Finishing');
    }
    
    if (category.includes('assembly')) {
      processes.push('Component Assembly', 'Quality Testing', 'Final Inspection');
    }
    
    if (category.includes('weld')) {
      processes.push('Welding', 'Heat Treatment', 'NDT Testing');
    }
    
    // Default processes if none detected
    if (processes.length === 0) {
      processes = ['Material Preparation', 'Precision Manufacturing', 'Quality Control', 'Final Assembly'];
    }
    
    return processes;
  };

  const handleRequestQuote = () => {
    // Navigate to quote page with product data pre-populated
    const productData = {
      productName: product.title || product.Name,
      category: product.category,
      materials: materials.join(', '),
      specifications: specifications.join(', ')
    };
    
    const searchParams = new URLSearchParams(productData);
    navigate(`/quote?${searchParams.toString()}`);
    onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all duration-200"
            >
              <ApperIcon name="X" size={20} className="text-gray-600" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Hero Section with Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title || product.Name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                        {product.title || product.Name}
                      </h2>
                      <span className="inline-flex items-center text-sm font-medium text-white bg-accent-500 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <Button
                      onClick={handleRequestQuote}
                      className="bg-accent-500 hover:bg-accent-600 text-white shadow-lg"
                    >
                      Request Quote
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Product Description */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                    Product Overview
                  </h3>
                  <p className="text-gray-600 font-body leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Specifications Table */}
                {specifications.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                      Technical Specifications
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {specifications.map((spec, index) => (
                          <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                            <ApperIcon name="Check" className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{spec.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Materials Section */}
                {materials.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                      Materials & Composition
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {materials.map((material, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center text-sm font-medium text-primary-700 bg-primary-50 px-4 py-2 rounded-lg border border-primary-200"
                        >
                          <ApperIcon name="Layers" className="w-4 h-4 mr-2" />
                          {material.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Typical Applications */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                    Typical Applications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getTypicalApplications().map((application, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-100">
                        <ApperIcon name="Target" className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{application}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manufacturing Process Overview */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                    Manufacturing Process
                  </h3>
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {getManufacturingProcess().map((process, index) => (
                        <div key={index} className="text-center">
                          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-lg">{index + 1}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{process}</h4>
                          <div className="h-1 bg-primary-200 rounded-full mx-auto" style={{ width: '60%' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleRequestQuote}
                    size="lg"
                    className="flex-1 bg-accent-500 hover:bg-accent-600 text-white"
                  >
                    <ApperIcon name="FileText" size={20} className="mr-2" />
                    Request Detailed Quote
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Continue Browsing
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;