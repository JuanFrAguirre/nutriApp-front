'use client';
import { Food } from '@nutriApp/app/icons/Food';
import { useCalculator } from '@nutriApp/app/services/useCalculator';
import { useModal } from '@nutriApp/app/services/useModal';
import { useProducts } from '@nutriApp/app/services/useProducts';
import { CalculatorModal } from '../modals/calculatorModal';
import { Product } from './product';

export const Products = () => {
  const { products } = useProducts();
  const { modal, setShow } = useModal(CalculatorModal.displayName);
  const { productsList } = useCalculator();

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
        <div
          className="fixed bg-brandGreen rounded-xl h-14 w-14 bottom-10 right-6 z-[400] grid place-items-center"
          onClick={() => {
            setShow(true);
          }}
        >
          {!!productsList.length && (
            <div className="absolute -top-1 -right-1 text-sm w-6 h-6 rounded-full font-semibold grid place-items-center bg-red-500 text-white">
              {productsList.length < 10 ? productsList.length : '9+'}
            </div>
          )}
          <Food className="w-10 h-10" />
        </div>
      </main>
      {modal.show && <CalculatorModal />}
    </>
  );
};
