import { Check } from '@nutriApp/app/icons/Check';
import { PlusSign } from '@nutriApp/app/icons/PlusSign';
import { useCalculator } from '@nutriApp/app/services/useCalculator';

export interface Product {
  id: string;
  title: string;
  presentationSize: number;
  description: string;
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
  const { addProduct, productsList } = useCalculator();

  const addProductToCalculator = () => {
    if (productsList.find((x) => x.id === product.id)) return;
    addProduct({ ...product, percentage: 100 });
  };

  return (
    <div className="w-full p-3 py-2 border-2 border-stone-200 rounded-lg shadow-lg space-y-2 relative flex flex-col justify-between">
      <button
        className="absolute right-2 top-2 bg-brandGreen rounded-full p-0.5"
        onClick={addProductToCalculator}
      >
        {productsList.find((x) => x.id === product.id) ? (
          <Check className="fill-white w-8 h-8" />
        ) : (
          <PlusSign className="fill-white w-8 h-8" />
        )}
      </button>
      <div className="space-y-2">
        {product.image ? (
          // eslint-disable-next-line
          <img
            src={product.image}
            alt={product.title}
            width={900}
            height={900}
            className="rounded-xl border border-stone-200"
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
            className="rounded-xl border border-stone-200"
          />
        )}
        <h1 className="font-bold text-brandGreen line-clamp-2 pb-1 mt-1 border-b border-stone-200">
          {product.title}
        </h1>
      </div>

      <div className="flex justify-between items-center border-b border-stone-200 mb-1 pb-1">
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
