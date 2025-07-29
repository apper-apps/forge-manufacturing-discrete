import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!project) return null;

  const industryColors = {
    aerospace: 'bg-blue-100 text-blue-800',
    automotive: 'bg-red-100 text-red-800',
    medical: 'bg-green-100 text-green-800',
    industrial: 'bg-yellow-100 text-yellow-800',
    marine: 'bg-cyan-100 text-cyan-800',
    defense: 'bg-purple-100 text-purple-800'
  };

  const processLabels = {
    'cnc-machining': 'CNC Machining',
    '3d-printing': '3D Printing',
    'casting': 'Casting',
    'sheet-metal': 'Sheet Metal',
    'forging': 'Forging'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${industryColors[project.industry] || 'bg-gray-100 text-gray-800'}`}>
                    {project.industry.charAt(0).toUpperCase() + project.industry.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {processLabels[project.manufacturingProcess] || project.manufacturingProcess}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ApperIcon name="X" className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                {/* Title and Description */}
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  {project.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Project Images Gallery */}
                <div className="mb-8">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Main Image */}
                    <div className="lg:col-span-2">
                      <img
                        src={project.projectImages[selectedImageIndex]}
                        alt={`Project ${selectedImageIndex + 1}`}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    </div>
                    {/* Thumbnail Grid */}
                    <div className="space-y-2">
                      {project.projectImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`w-full h-24 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index 
                              ? 'border-primary-500 ring-2 ring-primary-200' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{project.timeline}</div>
                    <div className="text-sm text-gray-600">Timeline</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{project.partsProduced}</div>
                    <div className="text-sm text-gray-600">Parts Produced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{project.clientSatisfactionScore}/10</div>
                    <div className="text-sm text-gray-600">Client Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{project.duration}d</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                </div>

                {/* Challenges */}
                <div className="mb-8">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="AlertTriangle" className="w-5 h-5 text-accent-500 mr-2" />
                    Project Challenges
                  </h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <ApperIcon name="ArrowRight" className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Manufacturing Approach */}
                <div className="mb-8">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="Settings" className="w-5 h-5 text-primary-500 mr-2" />
                    Manufacturing Approach
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-primary-50 p-4 rounded-lg">
                    {project.approach}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-500 mr-2" />
                    Key Results
                  </h3>
                  <ul className="space-y-2">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <ApperIcon name="Check" className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Testimonial */}
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="Quote" className="w-5 h-5 text-primary-500 mr-2" />
                    Client Testimonial
                  </h3>
                  <div className="flex items-start space-x-4">
                    <img
                      src={project.testimonial.companyLogo}
                      alt={project.testimonial.company}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <blockquote className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                        "{project.testimonial.quote}"
                      </blockquote>
                      <div>
                        <div className="font-semibold text-gray-900">{project.testimonial.author}</div>
                        <div className="text-gray-600">{project.testimonial.position}</div>
                        <div className="text-primary-600 font-medium">{project.testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    const contactElement = document.getElementById('contact');
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: 'smooth' });
                      onClose();
                    }
                  }}>
                    Start Similar Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;