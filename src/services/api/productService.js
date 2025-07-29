export const productService = {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "icon" } },
          { field: { Name: "category" } },
          { field: { Name: "imageUrl" } },
          { field: { Name: "specifications" } },
          { field: { Name: "materials" } }
        ],
        orderBy: [{ fieldName: "Name", sorttype: "ASC" }],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords("product", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching products:", error.message);
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "icon" } },
          { field: { Name: "category" } },
          { field: { Name: "imageUrl" } },
          { field: { Name: "specifications" } },
          { field: { Name: "materials" } }
        ]
      };

      const response = await apperClient.getRecordById("product", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching product with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching product with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(productData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const updateableData = {
        Name: productData.Name || productData.title || "",
        Tags: productData.Tags || productData.tags || "",
        Owner: productData.Owner ? parseInt(productData.Owner) : null,
        title: productData.title || "",
        description: productData.description || "",
        icon: productData.icon || "",
        category: productData.category || "",
        imageUrl: productData.imageUrl || "",
        specifications: Array.isArray(productData.specifications) ? productData.specifications.join(",") : productData.specifications || "",
        materials: Array.isArray(productData.materials) ? productData.materials.join(",") : productData.materials || ""
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord("product", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create products ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create product record");
        }
        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating product:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating product:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, productData) {
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

      if (productData.Name !== undefined) updateableData.Name = productData.Name;
      if (productData.Tags !== undefined) updateableData.Tags = productData.Tags;
      if (productData.Owner !== undefined) updateableData.Owner = productData.Owner ? parseInt(productData.Owner) : null;
      if (productData.title !== undefined) updateableData.title = productData.title;
      if (productData.description !== undefined) updateableData.description = productData.description;
      if (productData.icon !== undefined) updateableData.icon = productData.icon;
      if (productData.category !== undefined) updateableData.category = productData.category;
      if (productData.imageUrl !== undefined) updateableData.imageUrl = productData.imageUrl;
      if (productData.specifications !== undefined) updateableData.specifications = Array.isArray(productData.specifications) ? productData.specifications.join(",") : productData.specifications;
      if (productData.materials !== undefined) updateableData.materials = Array.isArray(productData.materials) ? productData.materials.join(",") : productData.materials;

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord("product", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update products ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update product record");
        }
        return response.results[0].data;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error updating product with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error updating product with ID ${id}:`, error.message);
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

      const response = await apperClient.deleteRecord("product", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete products ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete product record");
        }
        return true;
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error deleting product with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error deleting product with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  }
};