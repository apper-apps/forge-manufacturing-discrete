import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ProjectCard from '@/components/molecules/ProjectCard';
import ProjectModal from '@/components/molecules/ProjectModal';
import ProjectFilter from '@/components/molecules/ProjectFilter';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import * as projectService from '@/services/api/projectService';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedProcess, setSelectedProcess] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [projectsData, industriesData, processesData] = await Promise.all([
          projectService.getAll(),
          projectService.getIndustries(),
          projectService.getManufacturingProcesses()
        ]);
        
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        setIndustries(industriesData);
        setProcesses(processesData);
        
        toast.success(`Loaded ${projectsData.length} manufacturing projects`);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please try again later.');
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter projects when filter criteria change
  useEffect(() => {
    try {
      const filtered = projectService.getFiltered({
        industry: selectedIndustry,
        manufacturingProcess: selectedProcess
      });
      setFilteredProjects(filtered);
      
      if (selectedIndustry !== 'all' || selectedProcess !== 'all') {
        toast.info(`Found ${filtered.length} projects matching your criteria`);
      }
    } catch (err) {
      console.error('Error filtering projects:', err);
      toast.error('Error applying filters');
    }
  }, [selectedIndustry, selectedProcess]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    toast.info(`Viewing ${project.title} case study`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleIndustryChange = (industry) => {
    setSelectedIndustry(industry);
  };

  const handleProcessChange = (process) => {
    setSelectedProcess(process);
  };

  const handleClearFilters = () => {
    setSelectedIndustry('all');
    setSelectedProcess('all');
    toast.success('Filters cleared');
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} />
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
              Manufacturing{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped industry leaders overcome complex manufacturing challenges 
              and achieve exceptional results across diverse sectors and processes.
            </p>
          </motion.div>

          {/* Project Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProjectFilter
              industries={industries}
              processes={processes}
              selectedIndustry={selectedIndustry}
              selectedProcess={selectedProcess}
              onIndustryChange={handleIndustryChange}
              onProcessChange={handleProcessChange}
              onClearFilters={handleClearFilters}
            />
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Empty 
                message="No projects found matching your criteria" 
                actionText="Clear Filters"
                onAction={handleClearFilters}
              />
            </motion.div>
          ) : (
            <div className="masonry-grid">
              {/* CSS Grid with different heights for masonry effect */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.Id}
                    className={`${
                      index % 3 === 0 ? 'md:row-span-1' : 
                      index % 3 === 1 ? 'md:row-span-1' : 
                      'md:row-span-1'
                    }`}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      onClick={handleProjectClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Summary */}
          {filteredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {filteredProjects.length}
                    </div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {filteredProjects.reduce((sum, project) => sum + project.partsProduced, 0).toLocaleString()}
                    </div>
                    <div className="text-gray-600">Parts Manufactured</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {(filteredProjects.reduce((sum, project) => sum + project.clientSatisfactionScore, 0) / filteredProjects.length).toFixed(1)}/10
                    </div>
                    <div className="text-gray-600">Avg. Client Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {industries.length}
                    </div>
                    <div className="text-gray-600">Industries Served</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsSection;