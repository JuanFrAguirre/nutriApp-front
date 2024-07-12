'use client';
import { useModal } from '@nutriApp/services/useModal';
import { useProducts } from '@nutriApp/services/useProducts';
import { OpenCalculatorButton } from '../calculator/openCalculatorButton';
import { AddProductModal } from '../modals/addProductModal';
import { CalculatorModal } from '../modals/calculatorModal';
import { OpenAddProductButton } from './openAddProductButton';
import { Product } from './product';

export const Products = () => {
  const { products, filtering, filteredProducts } = useProducts();
  const { modal: calculatorModal } = useModal(CalculatorModal.displayName!);
  const { modal: addProductModal } = useModal(AddProductModal.displayName!);

  return (
    <>
      <main className="px-2 py-3 md:max-w-[768px] md:mx-auto lg:max-w-[1024px] xl:max-w-[1280px] relative">
        {!filtering && !!products?.length ? (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </section>
        ) : filtering && !!filteredProducts.length ? (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <div className="grid place-items-center">
            <p className="text2xl font-bold">Ningún producto aún...</p>
          </div>
        )}
        {/* <div className="absolute h-screen top-0 right-0"> */}
        <OpenAddProductButton />
        <OpenCalculatorButton />
        {/* </div> */}
      </main>
      {calculatorModal.show && <CalculatorModal />}
      {addProductModal.show && <AddProductModal />}
    </>
  );
};
