import axios from "axios";
import config from "../config/config";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_WEB_SERVER,
});

const HttpService = {
  async request(endpoint, method = "GET", data = null) {
    try {
      const config = {
        method,
        url: endpoint,
        data,
      };

      const response = await httpClient(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async get(endpoint, params = {}) {
    return this.request(endpoint, "GET", { params });
  },

  async post(endpoint, data) {
    return this.request(endpoint, "POST", data);
  },

  async put(endpoint, data) {
    return this.request(endpoint, "PUT", data);
  },

  async delete(endpoint) {
    return this.request(endpoint, "DELETE");
  },
};

export default HttpService;
