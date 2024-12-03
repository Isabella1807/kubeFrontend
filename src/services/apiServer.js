import axios from "axios";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  setToken(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  clearToken() {
    delete axios.defaults.headers.common["Authorization"];
  },

  get(resource) {
    return axios.get(resource).catch((error) => {
        console.error(`Fejl i GET-anmodning til ${resource}`, error.response || error.message);
        throw error; // Genkaster fejlen for yderligere håndtering
      });
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },
};

// Eksportér som ES-modul
export default ApiService;
