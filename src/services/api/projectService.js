let cachedProjects = [];

const initializeApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const getAll = async () => {
  try {
    const apperClient = initializeApperClient();

    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "title" } },
        { field: { Name: "industry" } },
        { field: { Name: "manufacturingProcess" } },
        { field: { Name: "description" } },
        { field: { Name: "beforeImage" } },
        { field: { Name: "afterImage" } },
        { field: { Name: "projectImages" } },
        { field: { Name: "challenges" } },
        { field: { Name: "approach" } },
        { field: { Name: "timeline" } },
        { field: { Name: "duration" } },
        { field: { Name: "partsProduced" } },
        { field: { Name: "clientSatisfactionScore" } },
        { field: { Name: "results" } },
        { field: { Name: "testimonial" } }
      ],
      orderBy: [{ fieldName: "Name", sorttype: "ASC" }],
      pagingInfo: { limit: 100, offset: 0 }
    };

    const response = await apperClient.fetchRecords("project", params);

    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }

    cachedProjects = response.data || [];
    return [...cachedProjects];
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching projects:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error("Error fetching projects:", error.message);
      throw new Error(error.message);
    }
  }
};

export const getById = async (id) => {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid project ID');
    }

    const apperClient = initializeApperClient();

    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "title" } },
        { field: { Name: "industry" } },
        { field: { Name: "manufacturingProcess" } },
        { field: { Name: "description" } },
        { field: { Name: "beforeImage" } },
        { field: { Name: "afterImage" } },
        { field: { Name: "projectImages" } },
        { field: { Name: "challenges" } },
        { field: { Name: "approach" } },
        { field: { Name: "timeline" } },
        { field: { Name: "duration" } },
        { field: { Name: "partsProduced" } },
        { field: { Name: "clientSatisfactionScore" } },
        { field: { Name: "results" } },
        { field: { Name: "testimonial" } }
      ]
    };

    const response = await apperClient.getRecordById("project", numericId, params);

    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching project with ID ${id}:`, error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error fetching project with ID ${id}:`, error.message);
      throw new Error(error.message);
    }
  }
};

export const getByIndustry = (industry) => {
  if (!industry || industry === 'all') {
    return [...cachedProjects];
  }
  return cachedProjects.filter(p => p.industry === industry);
};

export const getByManufacturingProcess = (process) => {
  if (!process || process === 'all') {
    return [...cachedProjects];
  }
  return cachedProjects.filter(p => p.manufacturingProcess === process);
};

export const getFiltered = (filters = {}) => {
  let filteredProjects = [...cachedProjects];
  
  if (filters.industry && filters.industry !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.industry === filters.industry);
  }
  
  if (filters.manufacturingProcess && filters.manufacturingProcess !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.manufacturingProcess === filters.manufacturingProcess);
  }
  
  return filteredProjects;
};

export const getIndustries = () => {
  const industries = [...new Set(cachedProjects.map(p => p.industry).filter(Boolean))];
  return industries.sort();
};

export const getManufacturingProcesses = () => {
  const processes = [...new Set(cachedProjects.map(p => p.manufacturingProcess).filter(Boolean))];
  return processes.sort();
};

export const create = async (projectData) => {
  try {
    const apperClient = initializeApperClient();

    // Only include Updateable fields
    const updateableData = {
      Name: projectData.Name || projectData.title || "",
      Tags: projectData.Tags || projectData.tags || "",
      Owner: projectData.Owner ? parseInt(projectData.Owner) : null,
      title: projectData.title || "",
      industry: projectData.industry || "",
      manufacturingProcess: projectData.manufacturingProcess || "",
      description: projectData.description || "",
      beforeImage: projectData.beforeImage || "",
      afterImage: projectData.afterImage || "",
      projectImages: Array.isArray(projectData.projectImages) ? projectData.projectImages.join(",") : projectData.projectImages || "",
      challenges: Array.isArray(projectData.challenges) ? projectData.challenges.join(",") : projectData.challenges || "",
      approach: projectData.approach || "",
      timeline: projectData.timeline || "",
      duration: projectData.duration ? parseInt(projectData.duration) : null,
      partsProduced: projectData.partsProduced ? parseInt(projectData.partsProduced) : null,
      clientSatisfactionScore: projectData.clientSatisfactionScore ? parseInt(projectData.clientSatisfactionScore) : null,
      results: Array.isArray(projectData.results) ? projectData.results.join(",") : projectData.results || "",
      testimonial: projectData.testimonial || ""
    };

    const params = {
      records: [updateableData]
    };

    const response = await apperClient.createRecord("project", params);

    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }

    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success);
      if (failedRecords.length > 0) {
        console.error(`Failed to create projects ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        throw new Error("Failed to create project record");
      }
      const newProject = response.results[0].data;
      cachedProjects.push(newProject);
      return newProject;
    }

    throw new Error("Unexpected response format");
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error creating project:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error("Error creating project:", error.message);
      throw new Error(error.message);
    }
  }
};

export const update = async (id, projectData) => {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid project ID');
    }

    const apperClient = initializeApperClient();

    // Only include Updateable fields plus Id
    const updateableData = {
      Id: numericId
    };

    if (projectData.Name !== undefined) updateableData.Name = projectData.Name;
    if (projectData.Tags !== undefined) updateableData.Tags = projectData.Tags;
    if (projectData.Owner !== undefined) updateableData.Owner = projectData.Owner ? parseInt(projectData.Owner) : null;
    if (projectData.title !== undefined) updateableData.title = projectData.title;
    if (projectData.industry !== undefined) updateableData.industry = projectData.industry;
    if (projectData.manufacturingProcess !== undefined) updateableData.manufacturingProcess = projectData.manufacturingProcess;
    if (projectData.description !== undefined) updateableData.description = projectData.description;
    if (projectData.beforeImage !== undefined) updateableData.beforeImage = projectData.beforeImage;
    if (projectData.afterImage !== undefined) updateableData.afterImage = projectData.afterImage;
    if (projectData.projectImages !== undefined) updateableData.projectImages = Array.isArray(projectData.projectImages) ? projectData.projectImages.join(",") : projectData.projectImages;
    if (projectData.challenges !== undefined) updateableData.challenges = Array.isArray(projectData.challenges) ? projectData.challenges.join(",") : projectData.challenges;
    if (projectData.approach !== undefined) updateableData.approach = projectData.approach;
    if (projectData.timeline !== undefined) updateableData.timeline = projectData.timeline;
    if (projectData.duration !== undefined) updateableData.duration = projectData.duration ? parseInt(projectData.duration) : null;
    if (projectData.partsProduced !== undefined) updateableData.partsProduced = projectData.partsProduced ? parseInt(projectData.partsProduced) : null;
    if (projectData.clientSatisfactionScore !== undefined) updateableData.clientSatisfactionScore = projectData.clientSatisfactionScore ? parseInt(projectData.clientSatisfactionScore) : null;
    if (projectData.results !== undefined) updateableData.results = Array.isArray(projectData.results) ? projectData.results.join(",") : projectData.results;
    if (projectData.testimonial !== undefined) updateableData.testimonial = projectData.testimonial;

    const params = {
      records: [updateableData]
    };

    const response = await apperClient.updateRecord("project", params);

    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }

    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success);
      if (failedRecords.length > 0) {
        console.error(`Failed to update projects ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        throw new Error("Failed to update project record");
      }
      const updatedProject = response.results[0].data;
      
      // Update cached projects
      const index = cachedProjects.findIndex(p => p.Id === numericId);
      if (index !== -1) {
        cachedProjects[index] = updatedProject;
      }
      
      return updatedProject;
    }

    throw new Error("Unexpected response format");
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error updating project with ID ${id}:`, error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error updating project with ID ${id}:`, error.message);
      throw new Error(error.message);
    }
  }
};

export const deleteProject = async (id) => {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid project ID');
    }

    const apperClient = initializeApperClient();

    const params = {
      RecordIds: [numericId]
    };

    const response = await apperClient.deleteRecord("project", params);

    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }

    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success);
      if (failedRecords.length > 0) {
        console.error(`Failed to delete projects ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        throw new Error("Failed to delete project record");
      }
      
      // Remove from cached projects
      const index = cachedProjects.findIndex(p => p.Id === numericId);
      if (index !== -1) {
        const deletedProject = cachedProjects.splice(index, 1)[0];
        return deletedProject;
      }
      
      return true;
    }

    return true;
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error deleting project with ID ${id}:`, error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error deleting project with ID ${id}:`, error.message);
      throw new Error(error.message);
    }
  }
};