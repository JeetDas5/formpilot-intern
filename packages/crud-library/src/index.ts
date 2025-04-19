import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

// Load environment variables

const API_URL = "http://localhost:3000";
const API_KEY = "7071b16d-7b7d-4da2-9682-7b5941ef9fd7";

console.log("API_URL", API_URL);
console.log("API_KEY", API_KEY);

if (!API_URL || !API_KEY) {
  throw new Error(
    "API URL or API Key is missing. Please check your .env file."
  );
}

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

export const checkCredits = async () => {
  const res = await axios.get(`${API_URL}/api/credits`, { headers });
  if (res.data.remaining <= 0) {
    throw new Error("Request limit exceeded. Please recharge credits.");
  }
};

export const create = async (data: { value: string; txHash: string }) => {
  await checkCredits();
  const res = await axios.post(`${API_URL}/api/data`, data, { headers });
  return res.data;
};

export const get = async (id: string) => {
  await checkCredits();
  const res = await axios.get(`${API_URL}/api/data?id=${id}`, { headers });
  return res.data;
};

export const update = async (id: string, data: { value: string }) => {
  await checkCredits();
  const res = await axios.put(
    `${API_URL}/api/data`,
    { id, ...data },
    { headers }
  );
  return res.data;
};

export const remove = async (id: string) => {
  await checkCredits();
  const res = await axios.delete(`${API_URL}/api/data?id=${id}`, { headers });
  return res.data;
};

interface CrudLibrary {
  create: (data: { value: string; txHash: string }) => Promise<any>;
  get: (id: string) => Promise<any>;
  update: (id: string, data: { value: string }) => Promise<any>;
  remove: (id: string) => Promise<any>;
}

export default { create, get, update, remove } as CrudLibrary;
