'use client';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import { Product } from '../components/products/product';

const DATA = [
  {
    id: 123,
    title: 'Product1',
    calories: 1000,
    proteins: 55.4,
    fats: 55.4,
    carbohydrates: 55.4,
  },
  {
    id: 233,
    title: 'Product2',
    calories: 1000,
    proteins: 55.4,
    fats: 55.4,
    carbohydrates: 55.4,
  },
  {
    id: 333,
    title: 'Product3',
    calories: 1000,
    proteins: 55.4,
    fats: 55.4,
    carbohydrates: 55.4,
  },
  {
    id: 12112,
    title: 'Product4',
    calories: 1000,
    proteins: 55.4,
    fats: 55.4,
    carbohydrates: 55.4,
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>();

  const getProducts = useCallback(async () => {
    const response = await axios.get(`${BACKEND_URL}/products`);
    console.log(response.data);
    setProducts(response.data);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { products, getProducts };
};
