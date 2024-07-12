import { Check } from '@nutriApp/icons/Check';
import { Edit } from '@nutriApp/icons/Edit';
import { PlusSign } from '@nutriApp/icons/PlusSign';
import { useCalculator } from '@nutriApp/services/useCalculator';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useMemo } from 'react';
import { STOCK_IMAGE } from './addProduct';

export interface Product {
  id?: string;
  title: string;
  tags: string;
  description?: string;
  presentationSize: number;
  image?: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  product: Product;
}

export const Product = ({ product }: Props) => {
  const { addProduct, productsList, removeProduct } = useCalculator();
  const { push } = useRouter();

  const isAddedToCalculator = useMemo(
    () => productsList.find((x) => x.id === product.id),
    [productsList, product.id],
  );

  const onAddProductToCalculator = useCallback(() => {
    if (productsList.find((x) => x.id === product.id)) return;
    addProduct({ ...product, percentage: 100 });
  }, [addProduct, product, productsList]);

  const onRemoveProductFromCalculator = useCallback(() => {
    if (!isAddedToCalculator) return;
    if (!product.id) return;
    removeProduct(product.id);
  }, [isAddedToCalculator, removeProduct, product.id]);

  const onEditProductClick = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      push(`/products/${product.id}`);
    },
    [product.id, push],
  );

  return (
    <div
      className={clsx(
        'w-full p-3 py-2 border-2 rounded-lg shadow-xl space-y-2 relative flex flex-col justify-between',
        isAddedToCalculator ? 'border-brandGreen' : 'border-stone-200',
      )}
      onClick={
        isAddedToCalculator
          ? onRemoveProductFromCalculator
          : onAddProductToCalculator
      }
    >
      <button className="absolute right-2 top-2 bg-brandGreen rounded-full p-0.5">
        {isAddedToCalculator ? (
          <Check className="fill-white w-8 h-8" />
        ) : (
          <PlusSign className="fill-white w-8 h-8" />
        )}
      </button>
      <button
        className="absolute right-3 top-10 bg-orange-400 rounded-full p-0.5 w-7 h-7 grid place-items-center"
        onClick={onEditProductClick}
      >
        <Edit className="h-5 w-5 fill-white" />
      </button>
      <div className="flex flex-col h-full gap-4">
        {/* eslint-disable-next-line */}
        <img
          src={
            product.image
              ? `${product.image}?fit=crop&h=600&w=600`
              : null || STOCK_IMAGE
          }
          alt={product.title}
          width={900}
          height={900}
          className={clsx('rounded-xl border', 'border-stone-200')}
        />
        <h1
          className={clsx(
            'font-bold text-brandGreen line-clamp-2 border-stone-200 grow',
            // pb-1 mt-1 border-b
          )}
        >
          {product.title}
        </h1>
      </div>
    </div>
  );
};
