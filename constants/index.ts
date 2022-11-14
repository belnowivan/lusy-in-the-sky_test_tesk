export const navigation = {
    getPage: (page: number): string => `/products/page/${page}`,
    getProduct: (id: number): string => `/product/${id}`,
    getCart: (): string => `/cart`
}