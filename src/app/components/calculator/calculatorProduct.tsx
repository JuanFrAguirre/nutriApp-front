'use client';
import {
  ExtendedProduct,
  useCalculator,
} from '@nutriApp/app/services/useCalculator';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Input } from '../input/input';
import clsx from 'clsx';
import { Trashcan } from '@nutriApp/app/icons/Trashcan';

interface Props {
  product: ExtendedProduct;
}

export const CalculatorProduct = ({ product }: Props) => {
  const [percentage, setPercentage] = useState(100);
  const { modifyProduct, removeProduct } = useCalculator();

  const onPercentageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0 || value > 100) return;
    setPercentage(value);
  }, []);

  const changePercentage = useCallback((number: number) => {
    setPercentage(number);
  }, []);

  useEffect(() => {
    modifyProduct({ ...product, percentage });
    //eslint-disable-next-line
  }, [modifyProduct, percentage]);

  return (
    <div className="border-2 rounded-lg p-2 lg:flex gap-4 lg:max-h-[400px]">
      <div className="lg:basis-1/2 lg:flex flex-col justify-between">
        <div className="flex justify-between p-1 items-center">
          <p className="line-clamp-1 md:line-clamp-2 text-lg text-brandGreen font-bold mb-2">
            {product.title}
          </p>
          <button
            className="flex items-center"
            onClick={() => removeProduct(product.id)}
          >
            <Trashcan className="fill-red-500 w-8 h-8" />
          </button>
        </div>
        <div className="flex gap-2 justify-between border border-stone-200 rounded-xl p-1">
          <button
            className={clsx(
              'bg-stone-200 rounded-lg px-2',
              percentage === 25 && 'border-2 border-brandGreen',
            )}
            onClick={() => changePercentage(25)}
          >
            <p>25%</p>
          </button>
          <button
            className={clsx(
              'bg-stone-200 rounded-lg px-2',
              percentage === 33 && 'border-2 border-brandGreen',
            )}
            onClick={() => changePercentage(33)}
          >
            <p>33%</p>
          </button>
          <button
            className={clsx(
              'bg-stone-200 rounded-lg px-2',
              percentage === 50 && 'border-2 border-brandGreen',
            )}
            onClick={() => changePercentage(50)}
          >
            <p>50%</p>
          </button>
          <button
            className={clsx(
              'bg-stone-200 rounded-lg px-2',
              percentage === 75 && 'border-2 border-brandGreen',
            )}
            onClick={() => changePercentage(75)}
          >
            <p>75%</p>
          </button>
          <button
            className={clsx(
              'bg-stone-200 rounded-lg px-2',
              percentage === 100 && 'border-2 border-brandGreen',
            )}
            onClick={() => changePercentage(100)}
          >
            <p>100%</p>
          </button>
        </div>
        <div className="border-b border-stone-300 mb-1 py-1 flex items-center gap-4">
          <p className="text-lg text-brandGreen">Porcion</p>
          <p>
            {percentage == 100 ? (
              `${product.presentationSize.toFixed(1)}g`
            ) : (
              <>
                {(percentage * 0.01 * product.presentationSize).toFixed(1)}g /
                {product.presentationSize.toFixed(1)}g - ({percentage}%)
              </>
            )}
          </p>
        </div>
        {/* </div> */}
        <div className="flex justify-between">
          <div className="p-0.5">
            <p>Calories</p>
            <p className="text-brandGreen font-semibold">
              {product.calories.toFixed(1)}kcal
            </p>
          </div>
          <div className="p-0.5">
            <p>Protein</p>
            <p className="text-brandGreen font-semibold">
              {product.proteins.toFixed(1)}g
            </p>
          </div>
          <div className="p-0.5">
            <p>Fat</p>
            <p className="text-brandGreen font-semibold">
              {product.fats.toFixed(1)}g
            </p>
          </div>
          <div className="p-0.5">
            <p>Carbos</p>
            <p className="text-brandGreen font-semibold">
              {product.carbohydrates.toFixed(1)}g
            </p>
          </div>
        </div>
      </div>

      <div className="max-lg:hidden lg:basis-1/2 rounded-xl border-2 border-stone-200 overflow-hidden grid place-items-center">
        {/* eslint-disable-next-line */}
        <img src={product.image} alt={product.title} />
      </div>
    </div>
  );
};
