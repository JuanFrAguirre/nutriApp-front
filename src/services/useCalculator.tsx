'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import { Product } from '../components/products/product';

export type TypeOfMeasurement = 'relative' | 'absolute';

export interface ExtendedProduct extends Product {
  typeOfMeasurement?: TypeOfMeasurement;
  percentage?: number;
  absoluteWeight?: number;
}

interface CalculatorContext {
  productsList: ExtendedProduct[];
  setProductsList: Dispatch<SetStateAction<ExtendedProduct[]>>;
}

const context = createContext<CalculatorContext>({
  productsList: [],
  setProductsList: () => {},
});

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [productsList, setProductsList] = useState<ExtendedProduct[]>([]);

  const value = useMemo(
    () => ({ productsList, setProductsList }),
    [productsList, setProductsList],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useCalculator = () => {
  const { productsList, setProductsList } = useContext(context);

  const addProduct = useCallback(
    (product: ExtendedProduct) => {
      if (productsList.find((storedProduct) => storedProduct.id === product.id))
        return;
      setProductsList((prev) => [...prev, product]);
    },
    [productsList, setProductsList],
  );

  const modifyProduct = useCallback(
    (product: ExtendedProduct, type: 'relative' | 'absolute') => {
      setProductsList((currentProducts) => [
        ...currentProducts.map((currProduct) =>
          currProduct.id === product.id
            ? { ...product, typeOfMeasurement: type }
            : currProduct,
        ),
      ]);
    },
    [setProductsList],
  );

  const removeProduct = useCallback(
    (id: string) => {
      setProductsList((currentProducts) => [
        ...currentProducts.filter((x) => x.id !== id),
      ]);
    },
    [setProductsList],
  );

  const clearCalculator = useCallback(() => {
    setProductsList([]);
  }, [setProductsList]);

  return {
    productsList,
    setProductsList,
    addProduct,
    modifyProduct,
    removeProduct,
    clearCalculator,
  };
};
