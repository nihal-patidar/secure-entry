import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.SERVER_BASE_URL, // Replace with your backend's base URL
  // baseURL: "http://64.227.136.247/", // Replace with your backend's base URL
  // baseURL: "https://secure-entry-f5go.onrender.com",

  baseURL: "https://secure-entry-1.onrender.com",
  // baseURL : "http://localhost:3000",
  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
