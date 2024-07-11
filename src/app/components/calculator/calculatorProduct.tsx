'use client';
import { Trashcan } from '@nutriApp/app/icons/Trashcan';
import {
  ExtendedProduct,
  TypeOfMeasurement,
  useCalculator,
} from '@nutriApp/app/services/useCalculator';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Select } from '../select/select';
import { Input } from '../input/input';
import clsx from 'clsx';

interface Props {
  product: ExtendedProduct;
}

export const CalculatorProduct = ({ product }: Props) => {
  const [percentage, setPercentage] = useState(100);
  const [absoluteWeight, setAbsoluteWeight] = useState(100);
  const [typeOfMeasurement, setTypeOfMeasurement] =
    useState<TypeOfMeasurement>('relative');
  const { modifyProduct, removeProduct } = useCalculator();

  const changePercentage = useCallback((number: number) => {
    setPercentage(number);
  }, []);

  const changeAbsoluteWeight = useCallback((number: number) => {
    setAbsoluteWeight(number);
  }, []);

  const calculateNutrient = (nutrient: number, weight: number) => {
    return ((weight / 100) * nutrient).toFixed(1);
  };

  const calculateWeight = useCallback(() => {
    if (typeOfMeasurement === 'relative') {
      return (percentage * 0.01 * product.presentationSize).toFixed(1);
    }
    return absoluteWeight.toFixed(1);
  }, [absoluteWeight, percentage, product.presentationSize, typeOfMeasurement]);

  const weight = useMemo(() => calculateWeight(), [calculateWeight]);

  useEffect(() => {
    typeOfMeasurement === 'relative'
      ? modifyProduct({ ...product, percentage, typeOfMeasurement }, 'relative')
      : modifyProduct(
          { ...product, absoluteWeight, typeOfMeasurement },
          'absolute',
        );
    //eslint-disable-next-line
  }, [modifyProduct, percentage, absoluteWeight]);

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
        <p className="text-brandGreen text-lg pb-2">Ingresa la medida</p>
        <div className="flex gap-4 justify-between pb-4">
          <div className="">
            <button
              className={clsx(
                'text-center rounded-xl p-2 border',
                typeOfMeasurement === 'relative'
                  ? 'border-brandGreen'
                  : 'border-transparent',
              )}
              onClick={() => {
                setTypeOfMeasurement('relative');
              }}
            >
              <p>Unidades relativas</p>
            </button>
          </div>
          <div className="">
            <button
              className={clsx(
                'text-center rounded-xl p-2 border',
                typeOfMeasurement === 'absolute'
                  ? 'border-brandGreen'
                  : 'border-transparent',
              )}
              onClick={() => {
                setTypeOfMeasurement('absolute');
              }}
            >
              <p>Unidades absolutas</p>
            </button>
          </div>
        </div>
        <div className="border border-stone-200 rounded-xl">
          {typeOfMeasurement === 'relative' ? (
            <Select
              id={`percentage-${product.id}`}
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
              selectClassName="w-full text-center rounded-xl p-1 md:px-4 md:py-2 bg-stone-200"
              onChange={(e) => {
                changePercentage(Number(e.target.value));
              }}
            />
          ) : (
            <Input
              className="flex flex-col gap-1 md:gap-2"
              inputClassName="md:px-4 md:py-2"
              id={`proteins-${product.id}`}
              name="proteins"
              type="number"
              onChange={(e) => {
                changeAbsoluteWeight(Number(e.target.value));
              }}
              placeholder="Peso en gramos..."
              required
              step={0.1}
            />
          )}
        </div>
        <div className="border-b border-stone-300 mb-1 py-2 flex items-center gap-4">
          <p className="text-lg text-brandGreen">Porción</p>
          <p>{`${weight}g / ${product.presentationSize}g`}</p>
        </div>
        <div className="flex justify-between xl:grid xl:grid-cols-2">
          <div className="p-0.5 ">
            <p>Proteínas</p>
            <p className="text-brandGreen line-clamp-2 font-semibold">
              {calculateNutrient(product.proteins, Number(weight))}g
            </p>
          </div>
          <div className="p-0.5 ">
            <p>Grasas</p>
            <p className="text-brandGreen line-clamp-2 font-semibold">
              {calculateNutrient(product.fats, Number(weight))}g
            </p>
          </div>
          <div className="p-0.5 ">
            <p>Carbos</p>
            <p className="text-brandGreen line-clamp-2 font-semibold">
              {calculateNutrient(product.carbohydrates, Number(weight))}g
            </p>
          </div>
          <div className="p-0.5 ">
            <p>Calorías</p>
            <p className="text-brandGreen line-clamp-2 font-semibold">
              {calculateNutrient(product.calories, Number(weight))}
              kcal
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
