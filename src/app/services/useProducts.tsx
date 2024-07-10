'use client';
import axios from 'axios';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BACKEND_URL } from '../config';
import { Product } from '../components/products/product';
import { useLoadingSpinner } from './useLoading';
import { toast } from 'react-toastify';

interface ProductsContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

const context = createContext<ProductsContext>({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const value = useMemo(
    () => ({ products, setProducts }),
    [products, setProducts],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useProducts = () => {
  const { products, setProducts } = useContext(context);

  const { setLoading } = useLoadingSpinner();

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/products`);
      console.log(response.data);
      setTimeout(() => {
        setProducts(response.data);
        setLoading(false);
      }, 200);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [setLoading, setProducts]);

  const addProduct = useCallback(
    async (product: Product) => {
      try {
        setLoading(true);
        await axios.post(`${BACKEND_URL}/products`, product);
        await getProducts();
        toast.success('Product added successfully.');
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [setLoading, getProducts],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await axios.delete(`${BACKEND_URL}/products/${id}`);
        await getProducts();
        toast.success('Product deleted successfully.');
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    },
    [setLoading, getProducts],
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { products, getProducts, addProduct, deleteProduct };
};
