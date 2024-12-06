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
    const token = localStorage.getItem("authToken");
    if (token) {
        this.setToken(token); // Indsæt token i `Authorization` headeren
    }
    return axios.get(resource).catch((error) => {
        console.error(`Fejl i GET-anmodning til ${resource}`, error.response?.data || error.message);
        throw error;
    });
},

post(resource, data) {
  return axios.post(resource, data).catch((error) => {
    // Tjek om der er en response fra serveren
    if (error.response) {
      console.error(`Fejl i POST-anmodning til ${resource}:`, error.response.data);
      throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      console.error("Error setting up request:", error.message);
      throw new Error("Error setting up the request");
    }
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
