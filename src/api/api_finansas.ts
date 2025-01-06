import axios from "axios"

export const apiFinansas = axios.create({
  baseURL: import.meta.env.VITE_API_FINANSAS_URL,
});



