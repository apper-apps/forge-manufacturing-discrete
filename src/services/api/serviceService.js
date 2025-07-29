import servicesData from "@/services/mockData/services.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const serviceService = {
  async getAll() {
    await delay(300);
    return [...servicesData];
  },

  async getById(id) {
    await delay(250);
    const service = servicesData.find(item => item.Id === parseInt(id));
    if (!service) {
      throw new Error(`Service with ID ${id} not found`);
    }
    return { ...service };
  },

  async create(serviceData) {
    await delay(400);
    const newId = Math.max(...servicesData.map(s => s.Id)) + 1;
    const newService = {
      Id: newId,
      ...serviceData
    };
    servicesData.push(newService);
    return { ...newService };
  },

  async update(id, serviceData) {
    await delay(350);
    const index = servicesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Service with ID ${id} not found`);
    }
    servicesData[index] = { ...servicesData[index], ...serviceData };
    return { ...servicesData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = servicesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Service with ID ${id} not found`);
    }
    const deletedService = { ...servicesData[index] };
    servicesData.splice(index, 1);
    return deletedService;
  }
};