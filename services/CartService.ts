import type { AxiosPromise } from 'axios';
import { CheckoutCart } from '../typings/common';
import BaseService from './BaseService';

class CartService extends BaseService {
  private url = 'checkout/';

  checkout(product: CheckoutCart): AxiosPromise<{ orderId: number }> {
    return this.ai.post(`${this.url}placeOrder`, { ...product });
  }
}

export const cartServiceInstance = new CartService(); 