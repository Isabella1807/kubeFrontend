import axios from "axios";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  // Add a method to set JWT token
  setToken(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  // Clear the token
  clearToken() {
    delete axios.defaults.headers.common["Authorization"];
  },
  // GET request
  get(resource) {
    return axios.get(resource);
  },

  // POST request
  post(resource, data) {
    return axios.post(resource, data);
  },

  // PUT request
  put(resource, data) {
    return axios.put(resource, data);
  },

  // DELETE request
  delete(resource) {
    return axios.delete(resource);
  },
};

export default ApiService;
