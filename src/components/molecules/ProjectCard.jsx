import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProjectCard = ({ project, index, onClick }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(project)}
    >
      {/* Before/After Images */}
      <div className="relative h-48 overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/2 relative">
            <img 
              src={project.beforeImage} 
              alt="Before"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
              Before
            </div>
          </div>
          <div className="w-1/2 relative">
            <img 
              src={project.afterImage} 
              alt="After"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
              After
            </div>
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <ApperIcon name="Eye" className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Industry Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${industryColors[project.industry] || 'bg-gray-100 text-gray-800'}`}>
            {project.industry.charAt(0).toUpperCase() + project.industry.slice(1)}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {processLabels[project.manufacturingProcess] || project.manufacturingProcess}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-primary-600">{project.duration}d</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary-600">{project.partsProduced}</div>
            <div className="text-xs text-gray-500">Parts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary-600">{project.clientSatisfactionScore}/10</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>

        {/* View Details Arrow */}
        <div className="flex items-center justify-end mt-4 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="mr-1">View Details</span>
          <ApperIcon name="ArrowRight" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;