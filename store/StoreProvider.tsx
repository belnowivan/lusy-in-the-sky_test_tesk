import { createContext, ReactElement, useContext } from 'react';
import { ProductStore } from './ProductStore';

let store: ProductStore;
export const StoreContext = createContext({});

export const useStore = (): ProductStore => {
    const context = useContext(StoreContext);
    return context as ProductStore;
}

function initializeStore() {
    const _store = store ?? new ProductStore();

    if (typeof window === 'undefined') {
        return _store
    }

    if (!store) store = _store

    return _store
}

export function StoreProvider({ children }: { children: ReactElement }) {
    const store = initializeStore()
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}