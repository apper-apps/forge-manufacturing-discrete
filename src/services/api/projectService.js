import projectsData from '@/services/mockData/projects.json';

let projects = [...projectsData];

export const getAll = () => {
  return [...projects];
};

export const getById = (id) => {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error('Invalid project ID');
  }
  
  const project = projects.find(p => p.Id === numericId);
  if (!project) {
    throw new Error(`Project with ID ${numericId} not found`);
  }
  
  return { ...project };
};

export const getByIndustry = (industry) => {
  if (!industry || industry === 'all') {
    return [...projects];
  }
  return projects.filter(p => p.industry === industry);
};

export const getByManufacturingProcess = (process) => {
  if (!process || process === 'all') {
    return [...projects];
  }
  return projects.filter(p => p.manufacturingProcess === process);
};

export const getFiltered = (filters = {}) => {
  let filteredProjects = [...projects];
  
  if (filters.industry && filters.industry !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.industry === filters.industry);
  }
  
  if (filters.manufacturingProcess && filters.manufacturingProcess !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.manufacturingProcess === filters.manufacturingProcess);
  }
  
  return filteredProjects;
};

export const getIndustries = () => {
  const industries = [...new Set(projects.map(p => p.industry))];
  return industries.sort();
};

export const getManufacturingProcesses = () => {
  const processes = [...new Set(projects.map(p => p.manufacturingProcess))];
  return processes.sort();
};

export const create = (projectData) => {
  const newId = Math.max(...projects.map(p => p.Id), 0) + 1;
  const newProject = {
    ...projectData,
    Id: newId
  };
  projects.push(newProject);
  return { ...newProject };
};

export const update = (id, projectData) => {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error('Invalid project ID');
  }
  
  const index = projects.findIndex(p => p.Id === numericId);
  if (index === -1) {
    throw new Error(`Project with ID ${numericId} not found`);
  }
  
  projects[index] = { ...projects[index], ...projectData, Id: numericId };
  return { ...projects[index] };
};

export const deleteProject = (id) => {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error('Invalid project ID');
  }
  
  const index = projects.findIndex(p => p.Id === numericId);
  if (index === -1) {
    throw new Error(`Project with ID ${numericId} not found`);
  }
  
  const deletedProject = projects.splice(index, 1)[0];
  return { ...deletedProject };
};