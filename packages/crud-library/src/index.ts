import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export type CrudClientConfig = {
  apiKey: string;
  apiUrl: string;
};

export function CrudLibrary({ apiKey,apiUrl }: CrudClientConfig) {
  if (!apiKey || !apiUrl) {
    throw new Error("Missing apiKey or apiUrl when creating the CRUD client.");
  }

  const API_TODO_URL = "http://localhost:3001/api"

  const headers = {
    "x-api-key": apiKey,
  };

  return {
    async create(data: { value: string; txHash: string }) {
      const res = await axios.post(`${API_TODO_URL}/create`, data, { headers });
      return res.data;
    },

    async get(id: string) {
      const res = await axios.get(`${API_TODO_URL}/${id}`, { headers });
      return res.data;
    },

    async getAll() {
      const res = await axios.get(`${API_TODO_URL}/all`, { headers });
      return res.data;
    },

    async getCredits() {
      const res = await axios.get(`${API_TODO_URL}/credits`, { headers });
      return res.data;
    },

    async update(id: string, data: { value: string }) {
      const res = await axios.put(`${API_TODO_URL}/${id}`, data, { headers });
      return res.data;
    },

    async remove(id: string) {
      const res = await axios.delete(`${API_TODO_URL}/${id}`, { headers });
      return res.data;
    },
  };
}
