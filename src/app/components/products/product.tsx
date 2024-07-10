import { Check } from '@nutriApp/app/icons/Check';
import { PlusSign } from '@nutriApp/app/icons/PlusSign';
import { Trashcan } from '@nutriApp/app/icons/Trashcan';
import { useCalculator } from '@nutriApp/app/services/useCalculator';
import { useProducts } from '@nutriApp/app/services/useProducts';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

export interface Product {
  id?: string;
  title: string;
  presentationSize: number;
  description?: string;
  image?: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

interface Props {
  product: Product;
}

export const Product = ({ product }: Props) => {
  const { addProduct, productsList, removeProduct } = useCalculator();
  const { deleteProduct } = useProducts();

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

  const onDeleteClick = useCallback(() => {
    if (!product.id) {
      toast.error('Invalid product data. Cannot delete.');
    }
    deleteProduct(product.id!);
  }, [deleteProduct, product.id]);

  return (
    <div
      className={clsx(
        'w-full p-3 py-2 border-2 rounded-lg shadow-xl space-y-2 relative flex flex-col justify-between',
        isAddedToCalculator ? 'border-brandGreen' : 'border-stone-200',
      )}
    >
      <button
        className="absolute right-2 top-2 bg-brandGreen rounded-full p-0.5"
        onClick={
          isAddedToCalculator
            ? onRemoveProductFromCalculator
            : onAddProductToCalculator
        }
      >
        {isAddedToCalculator ? (
          <Check className="fill-white w-8 h-8" />
        ) : (
          <PlusSign className="fill-white w-8 h-8" />
        )}
      </button>
      {/* <button
        className="absolute right-3 top-10 bg-white border-[2px] border-red-500 rounded-full p-0.5"
        onClick={onDeleteClick}
      >
        <Trashcan className="fill-red-500 w-5 h-5" />
      </button> */}
      <div className="space-y-2">
        {product.image ? (
          // eslint-disable-next-line
          <img
            src={product.image}
            alt={product.title}
            width={900}
            height={900}
            className={clsx(
              'rounded-xl border',
              isAddedToCalculator
                ? 'border-brandGreen border-2'
                : 'border-stone-200',
            )}
          />
        ) : (
          // eslint-disable-next-line
          <img
            src={
              'https://static.vecteezy.com/system/resources/previews/027/381/351/non_2x/shopping-cart-icon-shopping-trolley-icon-shopping-cart-logo-container-for-goods-and-products-economics-symbol-design-elements-basket-symbol-silhouette-retail-design-elements-vector.jpg'
            }
            alt={product.title}
            width={900}
            height={900}
            className={clsx(
              'rounded-xl border',
              isAddedToCalculator
                ? 'border-brandGreen border-2'
                : 'border-stone-200',
            )}
          />
        )}
        <h1
          className={clsx(
            'font-bold text-brandGreen line-clamp-2 pb-1 mt-1 border-b',
            isAddedToCalculator ? 'border-brandGreen' : 'border-stone-200',
          )}
        >
          {product.title}
        </h1>
      </div>

      <div
        className={clsx(
          'flex justify-between items-center border-b mb-1 pb-1',
          isAddedToCalculator ? 'border-brandGreen' : 'border-stone-200',
        )}
      >
        <p>Porción</p>
        <p className="text-brandGreen font-bold">{product.presentationSize}g</p>
      </div>

      <div>
        <div className="flex gap-1">
          <div className="flex flex-col basis-1/2">
            <p>
              Proteínas <br />{' '}
              <span className="text-brandGreen font-bold text-lg">
                {product.proteins}g
              </span>
            </p>
            <p>
              Grasas <br />{' '}
              <span className="text-brandGreen font-bold text-lg">
                {product.fats}g
              </span>
            </p>
          </div>
          <div className="flex flex-col basis-1/2">
            <p>
              Carbos <br />{' '}
              <span className="text-brandGreen font-bold text-lg">
                {product.carbohydrates}g
              </span>
            </p>
            <p>
              Calorías <br />{' '}
              <span className="text-brandGreen font-bold text-lg">
                {product.calories}kcal
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
