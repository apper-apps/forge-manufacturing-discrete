export const serviceService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "description" } },
          { field: { Name: "processDescription" } },
          { field: { Name: "processSteps" } },
          { field: { Name: "equipment" } },
          { field: { Name: "materials" } },
          { field: { Name: "toleranceRange" } },
          { field: { Name: "turnaroundTime" } },
          { field: { Name: "capacity" } },
          { field: { Name: "qualityStandards" } }
        ],
        orderBy: [{ fieldName: "Name", sorttype: "ASC" }],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords("service", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching services:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching services:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "description" } },
          { field: { Name: "processDescription" } },
          { field: { Name: "processSteps" } },
          { field: { Name: "equipment" } },
          { field: { Name: "materials" } },
          { field: { Name: "toleranceRange" } },
          { field: { Name: "turnaroundTime" } },
          { field: { Name: "capacity" } },
          { field: { Name: "qualityStandards" } }
        ]
      };

      const response = await apperClient.getRecordById("service", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching service with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching service with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(serviceData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const updateableData = {
        Name: serviceData.Name || serviceData.name,
        Tags: serviceData.Tags || serviceData.tags || "",
        Owner: serviceData.Owner ? parseInt(serviceData.Owner) : null,
        description: serviceData.description || "",
        processDescription: serviceData.processDescription || "",
        processSteps: Array.isArray(serviceData.processSteps) ? serviceData.processSteps.join(",") : serviceData.processSteps || "",
        equipment: Array.isArray(serviceData.equipment) ? serviceData.equipment.join(",") : serviceData.equipment || "",
        materials: Array.isArray(serviceData.materials) ? serviceData.materials.join(",") : serviceData.materials || "",
        toleranceRange: serviceData.toleranceRange || "",
        turnaroundTime: serviceData.turnaroundTime || "",
        capacity: serviceData.capacity || "",
        qualityStandards: Array.isArray(serviceData.qualityStandards) ? serviceData.qualityStandards.join(",") : serviceData.qualityStandards || ""
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord("service", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create services ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create service record");
        }
        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating service:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating service:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, serviceData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields plus Id
      const updateableData = {
        Id: parseInt(id)
      };

      if (serviceData.Name !== undefined) updateableData.Name = serviceData.Name;
      if (serviceData.Tags !== undefined) updateableData.Tags = serviceData.Tags;
      if (serviceData.Owner !== undefined) updateableData.Owner = serviceData.Owner ? parseInt(serviceData.Owner) : null;
      if (serviceData.description !== undefined) updateableData.description = serviceData.description;
      if (serviceData.processDescription !== undefined) updateableData.processDescription = serviceData.processDescription;
      if (serviceData.processSteps !== undefined) updateableData.processSteps = Array.isArray(serviceData.processSteps) ? serviceData.processSteps.join(",") : serviceData.processSteps;
      if (serviceData.equipment !== undefined) updateableData.equipment = Array.isArray(serviceData.equipment) ? serviceData.equipment.join(",") : serviceData.equipment;
      if (serviceData.materials !== undefined) updateableData.materials = Array.isArray(serviceData.materials) ? serviceData.materials.join(",") : serviceData.materials;
      if (serviceData.toleranceRange !== undefined) updateableData.toleranceRange = serviceData.toleranceRange;
      if (serviceData.turnaroundTime !== undefined) updateableData.turnaroundTime = serviceData.turnaroundTime;
      if (serviceData.capacity !== undefined) updateableData.capacity = serviceData.capacity;
      if (serviceData.qualityStandards !== undefined) updateableData.qualityStandards = Array.isArray(serviceData.qualityStandards) ? serviceData.qualityStandards.join(",") : serviceData.qualityStandards;

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord("service", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update services ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update service record");
        }
        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error updating service with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error updating service with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("service", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete services ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete service record");
        }
        return true;
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error deleting service with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error deleting service with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  }
};