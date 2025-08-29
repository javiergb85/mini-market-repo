import { create } from 'zustand';
import { Product } from '../../../shared/types';
import { fetchProducts as fetchProductsFromApi } from '../../lib/api'

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchProductsFromApi();
      set({ products: data, isLoading: false });
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
       
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
