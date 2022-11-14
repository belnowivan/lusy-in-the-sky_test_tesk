
export enum Sizes {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}

export type Size = keyof typeof Sizes;

export interface Product {
    id: number,
    model: string,
    name: string,
    price: string,
    special: string,
    description: string,
    image: string,
    sizes: Array<Size>,
}

export interface SearchService<T> {
    data: Array<T>,
    count: number,
    total: number,
    pageCount: number,
    page: number,
}

export interface CheckoutCart {
    products: Array<{ id: Product['id'], size: Size }>
}

export enum LoadingStatus {
    Idle = 'Idle',
    Loading = 'Idle',
    Success = 'Success',
    Failure = 'Failure',
}