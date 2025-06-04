//Axios + interceptor com JWT

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// This code sets up an Axios instance with a base URL and an interceptor that adds a JWT token to the Authorization header of each request, if the token exists in localStorage. This is useful for making authenticated API requests in a React application.
// The base URL is set to 'http://localhost:3000/api', which is where the API server is expected to be running. The interceptor checks for a token in localStorage and adds it to the request headers, allowing the server to authenticate the request. 