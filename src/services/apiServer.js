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
      throw error;
    });
  },

  post(resource, data) {
    return axios.post(resource, data).catch((error) => {
      console.error(`Fejl i POST-anmodning til ${resource}`, error.response || error.message);
      throw error;
    });
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },
};

export default ApiService;
