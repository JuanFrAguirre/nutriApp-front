'use client';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import { Product } from '../components/products/product';
import { useLoadingSpinner } from './useLoading';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>();
  const [refetch, setRefetch] = useState(false);

  const { setLoading } = useLoadingSpinner();

  const getProducts = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(`${BACKEND_URL}/products`);
    setTimeout(() => {
      setProducts(response.data);
      setLoading(false);
    }, 200);
  }, [setLoading]);

  const refetchProducts = () => {
    setRefetch(true);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (refetch) {
      getProducts();
      setRefetch(false);
    }
  }, [refetch, getProducts]);

  return { products, refetchProducts };
};
