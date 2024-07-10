'use client';
import { Trashcan } from '@nutriApp/app/icons/Trashcan';
import {
  ExtendedProduct,
  useCalculator,
} from '@nutriApp/app/services/useCalculator';
import clsx from 'clsx';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Select } from '../select/select';

interface Props {
  product: ExtendedProduct;
}

export const CalculatorProduct = ({ product }: Props) => {
  const [percentage, setPercentage] = useState(100);
  const { modifyProduct, removeProduct } = useCalculator();

  const changePercentage = useCallback((number: number) => {
    setPercentage(number);
  }, []);

  useEffect(() => {
    modifyProduct({ ...product, percentage });
    //eslint-disable-next-line
  }, [modifyProduct, percentage]);

  return (
    <div className="border-2 rounded-lg p-2 md:flex md:flex-col xl:flex-row gap-4 xl:max-h-[400px] shadow-lg">
      <div className="xl:basis-1/2 xl:w-1/2 xl:flex flex-col justify-between">
        <div className="flex justify-between p-1 items-center md:items-start">
          <p className="line-clamp-1 md:line-clamp-2 xl:line-clamp-4 text-lg text-brandGreen font-bold mb-2">
            {product.title}
          </p>
          <button
            className="flex items-center"
            onClick={() => removeProduct(product.id!)}
          >
            <Trashcan className="fill-red-500 w-8 h-8" />
          </button>
        </div>
        <div className="border border-stone-200 rounded-xl">
          <Select
            id="percentage"
            name="percentage"
            options={[
              { id: '12.5', value: '1/8 unidad' },
              { id: '16.66', value: '1/6 unidad' },
              { id: '20', value: '1/5 unidad' },
              { id: '25', value: '1/4 unidad' },
              { id: '33.33', value: '1/3 unidad' },
              { id: '50', value: '1/2 unidad' },
              { id: '100', value: '1 unidad', default: true },
              { id: '200', value: '2 unidades' },
              { id: '300', value: '3 unidades' },
              { id: '400', value: '4 unidades' },
              { id: '500', value: '5 unidades' },
            ]}
            className="w-full"
            selectClassName="w-full text-center rounded-xl p-1"
            onChange={(e) => {
              changePercentage(Number(e.target.value));
            }}
          />
        </div>
        <div className="border-b border-stone-300 mb-1 py-1 flex items-center gap-4">
          <p className="text-lg text-brandGreen">Porción</p>
          <p>{`${(percentage * 0.01 * product.presentationSize).toFixed(
            1,
          )}g`}</p>
        </div>
        {/* </div> */}
        <div className="flex justify-between xl:grid xl:grid-cols-2">
          <div className="p-0.5 ">
            <p>Proteínas</p>
            <p className="text-brandGreen line-clamp-2 font-semibold">
              {(percentage * 0.01 * product.proteins).toFixed(1)}g
            </p>
          </div>
          <div className="p-0.5 ">
            <p>Grasas</p>
            <p className="text-brandGreen line-clamp-2 font-semibold">
              {(percentage * 0.01 * product.fats).toFixed(1)}g
            </p>
          </div>
          <div className="p-0.5 ">
            <p>Carbos</p>
            <p className="text-brandGreen line-clamp-2 font-semibold">
              {(percentage * 0.01 * product.carbohydrates).toFixed(1)}g
            </p>
          </div>
          <div className="p-0.5 ">
            <p>Calorías</p>
            <p className="text-brandGreen line-clamp-2 font-semibold">
              {(percentage * 0.01 * product.calories).toFixed(1)}kcal
            </p>
          </div>
        </div>
      </div>

      <div className="max-md:hidden xl:basis-1/2 xl:w-1/2 rounded-xl border-2 border-stone-200 overflow-hidden grid place-items-center">
        {/* eslint-disable-next-line */}
        <img src={product.image} alt={product.title} />
      </div>
    </div>
  );
};
