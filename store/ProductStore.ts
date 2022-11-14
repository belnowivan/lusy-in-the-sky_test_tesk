import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { v4 as uuidv4 } from 'uuid';
import { cartServiceInstance } from '../services/CartService';
import { LoadingStatus, Product } from '../typings/common';

enableStaticRendering(typeof window === 'undefined');

export type CartItem = Product & { size: Product['sizes'][number], uuid?: string };

export class ProductStore {
    products: Array<CartItem> = [];
    checkoutStatus = LoadingStatus.Idle;
    lastOrderId: null | number = null;

    constructor() {
        makeAutoObservable(this);
    }

    addProduct = (newProducts: CartItem) => {
        this.products.push({ ...newProducts, uuid: uuidv4() });
        this.lastOrderId = null;
    };

    removeProduct = (removeUuid: CartItem['uuid']) => {
        this.products = this.products.filter(product => product.uuid !== removeUuid);
    }

    checkout = async () => {
        const checkoutCart = this.products.map(({ id, size }) => ({ id, size }))
        try {
            this.checkoutStatus = LoadingStatus.Loading;
            const { data: { orderId } } = await cartServiceInstance.checkout({ products: checkoutCart });
            this.lastOrderId = orderId;
            this.products = [];
            this.checkoutStatus = LoadingStatus.Success;
            return orderId;
        } catch (e) {
            this.checkoutStatus = LoadingStatus.Failure;
            throw e;
        }
    }

    get count() {
        return this.products.length;
    }

    get price() {
        return this.products.reduce((acc, products) => {
            const [, specialToNumber] = products.special.split('$');
            const [, priceToNumber] = products.price.split('$');
            const price = products.special ? Number(specialToNumber) + acc : Number(priceToNumber) + acc;
            return price;
        }, 0);
    }
}