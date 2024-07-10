'use client';
import { useModal } from '@nutriApp/app/services/useModal';
import { useProducts } from '@nutriApp/app/services/useProducts';
import { OpenCalculatorButton } from '../calculator/openCalculatorButton';
import { AddProductModal } from '../modals/addProductModal';
import { CalculatorModal } from '../modals/calculatorModal';
import { OpenAddProductButton } from './openAddProductButton';
import { Product } from './product';

export const Products = () => {
  const { products } = useProducts();
  const { modal: calculatorModal } = useModal(CalculatorModal.displayName!);
  const { modal: addProductModal } = useModal(AddProductModal.displayName!);

  return (
    <>
      <main className="px-2 py-3 md:max-w-[768px] md:mx-auto lg:max-w-[1024px] xl:max-w-[1280px]">
        {!!products?.length ? (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <div className="grid place-items-center">
            <p className="text2xl font-bold">Ningún producto aún...</p>
          </div>
        )}
        <OpenAddProductButton />
        <OpenCalculatorButton />
      </main>
      {calculatorModal.show && <CalculatorModal />}
      {addProductModal.show && <AddProductModal />}
    </>
  );
};
