import type { AxiosPromise } from 'axios';
import { Product, SearchService } from '../typings/common';
import BaseService from './BaseService';

class ProductServices extends BaseService {
  private url = 'product/';

  get(params: { page?: number } = { page: 1 }): AxiosPromise<SearchService<Product>> {
    return this.ai.get(this.url, { params });
  }

  getById(id: Product['id']): AxiosPromise<Product> {
    return this.ai.get(`${this.url}${id}`);
  }
}

export const productServicesInstance = new ProductServices(); 