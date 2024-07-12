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
import { Product } from '../components/products/product';
import { useLoadingSpinner } from './useLoading';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '@nutriApp/config';

interface ProductsContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  filteredProducts: Product[];
  setFilteredProducts: Dispatch<SetStateAction<Product[]>>;
  filtering: boolean;
  setFiltering: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<ProductsContext>({
  products: [],
  setProducts: () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
  filtering: false,
  setFiltering: () => {},
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filtering, setFiltering] = useState(false);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      filteredProducts,
      setFilteredProducts,
      filtering,
      setFiltering,
    }),
    [
      products,
      setProducts,
      filteredProducts,
      setFilteredProducts,
      filtering,
      setFiltering,
    ],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useProducts = () => {
  const {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    filtering,
    setFiltering,
  } = useContext(context);
  const [product, setProduct] = useState<Product>();

  const { setLoading } = useLoadingSpinner();

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/products`);
      setTimeout(() => {
        setProducts(response.data);
        setLoading(false);
      }, 200);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [setLoading, setProducts]);

  const filterProducts = useCallback(
    (value: string) => {
      const normalizedValue = value.toLowerCase();
      setFiltering(true);
      if (products) {
        setFilteredProducts(
          products.filter((product) => {
            if (!product.tags) {
              return product.title
                .split(' ')
                .some((word) => word.toLowerCase().includes(normalizedValue));
            }
            return (
              product.tags
                .split(',')
                .map((tag) => tag.trim())
                .some((tag) => tag.toLowerCase().includes(normalizedValue)) ||
              product.title
                .split(' ')
                .some((word) => word.toLowerCase().includes(normalizedValue))
            );
          }),
        );
      }
    },
    [setFiltering, products, setFilteredProducts],
  );

  const getProduct = useCallback(async (id: string) => {
    try {
      const response = await axios.get<Product>(
        `${BACKEND_URL}/products/${id}`,
      );
      setProduct(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        setLoading(false);
      }
    },
    [setLoading, getProducts],
  );

  const editProduct = useCallback(
    async (product: Product) => {
      try {
        setLoading(true);
        await axios.put(`${BACKEND_URL}/products/${product.id}`, product);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [setLoading],
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {
    products,
    filteredProducts,
    filtering,
    setFiltering,
    product,
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
    filterProducts,
  };
};
