'use client';
import { useProducts } from '@nutriApp/app/services/useProducts';
import { Product } from './product';

export const Products = () => {
  const { products } = useProducts();

  return (
    <main className="px-2 py-3">
      <section className="grid grid-cols-2 gap-2">
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </section>
    </main>
  );
};
