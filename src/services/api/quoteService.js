export const quoteService = {
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
          { field: { Name: "projectType" } },
          { field: { Name: "quantity" } },
          { field: { Name: "timeline" } },
          { field: { Name: "description" } },
          { field: { Name: "materials" } },
          { field: { Name: "tolerances" } },
          { field: { Name: "finishRequirements" } },
          { field: { Name: "dimensions" } },
          { field: { Name: "specialRequirements" } },
          { field: { Name: "files" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "company" } },
          { field: { Name: "address" } },
          { field: { Name: "additionalNotes" } },
          { field: { Name: "status" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        orderBy: [{ fieldName: "createdAt", sorttype: "DESC" }],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords("quote", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching quotes:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching quotes:", error.message);
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
          { field: { Name: "projectType" } },
          { field: { Name: "quantity" } },
          { field: { Name: "timeline" } },
          { field: { Name: "description" } },
          { field: { Name: "materials" } },
          { field: { Name: "tolerances" } },
          { field: { Name: "finishRequirements" } },
          { field: { Name: "dimensions" } },
          { field: { Name: "specialRequirements" } },
          { field: { Name: "files" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "company" } },
          { field: { Name: "address" } },
          { field: { Name: "additionalNotes" } },
          { field: { Name: "status" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ]
      };

      const response = await apperClient.getRecordById("quote", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching quote with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching quote with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(quoteData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map form data to database fields - only Updateable fields
      const updateableData = {
        Name: quoteData.name || "",
        Tags: quoteData.Tags || quoteData.tags || "",
        Owner: quoteData.Owner ? parseInt(quoteData.Owner) : null,
        projectType: quoteData.projectType || "",
        quantity: quoteData.quantity || "",
        timeline: quoteData.timeline || "",
        description: quoteData.description || "",
        materials: quoteData.materials || "",
        tolerances: quoteData.tolerances || "",
        finishRequirements: quoteData.finishRequirements || "",
        dimensions: quoteData.dimensions || "",
        specialRequirements: quoteData.specialRequirements || "",
        files: Array.isArray(quoteData.files) ? quoteData.files.join(",") : "",
        email: quoteData.email || "",
        phone: quoteData.phone || "",
        company: quoteData.company || "",
        address: quoteData.address || "",
        additionalNotes: quoteData.additionalNotes || "",
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord("quote", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create quotes ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create quote record");
        }
        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating quote:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating quote:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields plus Id
      const updateableData = {
        Id: parseInt(id),
        updatedAt: new Date().toISOString()
      };

      if (updateData.Name !== undefined) updateableData.Name = updateData.Name;
      if (updateData.Tags !== undefined) updateableData.Tags = updateData.Tags;
      if (updateData.Owner !== undefined) updateableData.Owner = updateData.Owner ? parseInt(updateData.Owner) : null;
      if (updateData.projectType !== undefined) updateableData.projectType = updateData.projectType;
      if (updateData.quantity !== undefined) updateableData.quantity = updateData.quantity;
      if (updateData.timeline !== undefined) updateableData.timeline = updateData.timeline;
      if (updateData.description !== undefined) updateableData.description = updateData.description;
      if (updateData.materials !== undefined) updateableData.materials = updateData.materials;
      if (updateData.tolerances !== undefined) updateableData.tolerances = updateData.tolerances;
      if (updateData.finishRequirements !== undefined) updateableData.finishRequirements = updateData.finishRequirements;
      if (updateData.dimensions !== undefined) updateableData.dimensions = updateData.dimensions;
      if (updateData.specialRequirements !== undefined) updateableData.specialRequirements = updateData.specialRequirements;
      if (updateData.files !== undefined) updateableData.files = Array.isArray(updateData.files) ? updateData.files.join(",") : updateData.files;
      if (updateData.email !== undefined) updateableData.email = updateData.email;
      if (updateData.phone !== undefined) updateableData.phone = updateData.phone;
      if (updateData.company !== undefined) updateableData.company = updateData.company;
      if (updateData.address !== undefined) updateableData.address = updateData.address;
      if (updateData.additionalNotes !== undefined) updateableData.additionalNotes = updateData.additionalNotes;
      if (updateData.status !== undefined) updateableData.status = updateData.status;

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord("quote", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update quotes ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update quote record");
        }
        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error updating quote with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error updating quote with ID ${id}:`, error.message);
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

      const response = await apperClient.deleteRecord("quote", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete quotes ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete quote record");
        }
        return true;
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error deleting quote with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error deleting quote with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  }
};