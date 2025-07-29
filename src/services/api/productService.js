import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(250);
    const product = productsData.find(item => item.Id === parseInt(id));
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return { ...product };
  },

  async create(productData) {
    await delay(400);
    const newId = Math.max(...productsData.map(p => p.Id)) + 1;
    const newProduct = {
      Id: newId,
      ...productData
    };
    productsData.push(newProduct);
    return { ...newProduct };
  },

  async update(id, productData) {
    await delay(350);
    const index = productsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    productsData[index] = { ...productsData[index], ...productData };
    return { ...productsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = productsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    const deletedProduct = { ...productsData[index] };
    productsData.splice(index, 1);
    return deletedProduct;
  }
};