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
  return (
    <div className="w-full p-3 py-2 border-2 border-stone-200 rounded-lg shadow-lg space-y-2">
      <h1 className="font-bold text-brandGreen line-clamp-2">
        {product.title}
      </h1>
      <div>
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
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col basis-1/2">
          <p>
            Proteins <br />{' '}
            <span className="text-brandGreen font-bold text-lg">
              {product.proteins}g
            </span>
          </p>
          <p>
            Fats <br />{' '}
            <span className="text-brandGreen font-bold text-lg">
              {product.fats}g
            </span>
          </p>
        </div>
        <div className="flex flex-col basis-1/2">
          <p>
            Carbs <br />{' '}
            <span className="text-brandGreen font-bold text-lg">
              {product.carbohydrates}g
            </span>
          </p>
          <p>
            Calories <br />{' '}
            <span className="text-brandGreen font-bold text-lg">
              {product.calories}kcal
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
