// src/index.ts for jeet-kiit-crud (browser-compatible version)
import axios from "axios";

// Instead of using dotenv, we'll use environment variables that are exposed to the client
// https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
const API_URL = process.env.NEXT_PUBLIC_CRUD_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_CRUD_API_KEY;

// Check if API details are available (will be undefined during build)
const getHeaders = () => {
  if (!API_URL || !API_KEY) {
    console.warn("Missing NEXT_PUBLIC_CRUD_API_URL or NEXT_PUBLIC_CRUD_API_KEY in environment variables");
  }
  
  return {
    "x-api-key": API_KEY || "",
  };
};

export async function create(data: { value: string; txHash: string }) {
  const res = await axios.post(`${API_URL}/create`, data, { headers: getHeaders() });
  return res.data;
}

export async function get(id: string) {
  const res = await axios.get(`${API_URL}/${id}`, { headers: getHeaders() });
  return res.data;
}

export async function update(id: string, data: { value: string }) {
  const res = await axios.put(`${API_URL}/${id}`, data, { headers: getHeaders() });
  return res.data;
}

export async function remove(id: string) {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return res.data;
}