import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProjectFilter = ({ 
  industries, 
  processes, 
  selectedIndustry, 
  selectedProcess, 
  onIndustryChange, 
  onProcessChange,
  onClearFilters
}) => {
  const industryLabels = {
    aerospace: 'Aerospace',
    automotive: 'Automotive', 
    medical: 'Medical',
    industrial: 'Industrial',
    marine: 'Marine',
    defense: 'Defense'
  };

  const processLabels = {
    'cnc-machining': 'CNC Machining',
    '3d-printing': '3D Printing',
    'casting': 'Casting',
    'sheet-metal': 'Sheet Metal',
    'forging': 'Forging'
  };

  const hasActiveFilters = selectedIndustry !== 'all' || selectedProcess !== 'all';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Industry Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Industry
            </label>
            <div className="relative">
              <select
                value={selectedIndustry}
                onChange={(e) => onIndustryChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industryLabels[industry] || industry}
                  </option>
                ))}
              </select>
              <ApperIcon 
                name="ChevronDown" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
              />
            </div>
          </div>

          {/* Process Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Process
            </label>
            <div className="relative">
              <select
                value={selectedProcess}
                onChange={(e) => onProcessChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Processes</option>
                {processes.map((process) => (
                  <option key={process} value={process}>
                    {processLabels[process] || process}
                  </option>
                ))}
              </select>
              <ApperIcon 
                name="ChevronDown" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
              />
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onClearFilters}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="X" className="w-4 h-4 mr-2" />
            Clear Filters
          </motion.button>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-600">Active filters:</span>
          {selectedIndustry !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {industryLabels[selectedIndustry] || selectedIndustry}
              <button
                onClick={() => onIndustryChange('all')}
                className="ml-2 hover:text-primary-600"
              >
                <ApperIcon name="X" className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedProcess !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
              {processLabels[selectedProcess] || selectedProcess}
              <button
                onClick={() => onProcessChange('all')}
                className="ml-2 hover:text-accent-600"
              >
                <ApperIcon name="X" className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;