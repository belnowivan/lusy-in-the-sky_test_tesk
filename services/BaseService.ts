import axios, { AxiosInstance } from 'axios';

const defaultConfig = {
  baseURL: 'http://localhost:3000/',
};

export default abstract class BaseService {
  protected ai: AxiosInstance;

  constructor(_config = defaultConfig) {
    this.ai = axios.create(_config);

    this.ai.interceptors.request.use((response) => {
      return response;
    })
  }
}
