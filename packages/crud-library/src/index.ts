import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.NEXT_PUBLIC_CRUD_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_CRUD_API_KEY;

if (!API_KEY || !API_URL) {
  throw new Error("Missing CRUD_API_KEY or CRUD_API_URL in .env");
}

const headers = {
  "x-api-key": API_KEY,
};

export async function create(data: { value: string; txHash: string }) {
  const res = await axios.post(`${API_URL}/api/create`, data, { headers });
  return res.data;
}

export async function get(id: string) {
  const res = await axios.get(`${API_URL}/api/${id}`, { headers });
  return res.data;
}

export async function getAll() {
  const res = await axios.get(`${API_URL}/api/all`, { headers });
  return res.data;
}

export async function getCredits() {
  const res = await axios.get(`${API_URL}/api/credits`, { headers });
  return res.data;
}


export async function update(id: string, data: { value: string }) {
  const res = await axios.put(`${API_URL}/api/${id}`, data, { headers });
  return res.data;
}

export async function remove(id: string) {
  const res = await axios.delete(`${API_URL}/api/${id}`, { headers });
  return res.data;
}
