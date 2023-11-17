import axios from "axios";
import config from "../config/config";

const wevServer = import.meta.env.VITE_WEB_SERVER;
const httpClient = axios.create({
  baseURL: wevServer
});

const HttpService = {
  async request(endpoint, method = "GET", data = null, contentType = 'application/json') {
    try {
      const config = {
        method,
        url: endpoint,
        data,
        headers: {
          'Content-Type': contentType,
        },
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

  async post(endpoint, data, contentType) {
    return this.request(endpoint, "POST", data, contentType);
  },

  async put(endpoint, data) {
    return this.request(endpoint, "PUT", data);
  },

  async delete(endpoint) {
    return this.request(endpoint, "DELETE");
  },
};

export default HttpService;
