import mockQuotes from "@/services/mockData/quotes.json";

let quotes = [...mockQuotes];
let nextId = Math.max(...quotes.map(q => q.Id)) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const quoteService = {
  async getAll() {
    await delay(500);
    return [...quotes];
  },

  async getById(id) {
    await delay(300);
    const quote = quotes.find(q => q.Id === parseInt(id));
    if (!quote) {
      throw new Error(`Quote with ID ${id} not found`);
    }
    return { ...quote };
  },

  async create(quoteData) {
    await delay(800);
    
    const newQuote = {
      Id: nextId++,
      ...quoteData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    quotes.push(newQuote);
    return { ...newQuote };
  },

  async update(id, updateData) {
    await delay(600);
    
    const index = quotes.findIndex(q => q.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Quote with ID ${id} not found`);
    }
    
    quotes[index] = {
      ...quotes[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return { ...quotes[index] };
  },

  async delete(id) {
    await delay(400);
    
    const index = quotes.findIndex(q => q.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Quote with ID ${id} not found`);
    }
    
    quotes.splice(index, 1);
    return true;
  }
};