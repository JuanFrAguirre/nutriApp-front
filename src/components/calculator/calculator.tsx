'use client';
import { ExtendedProduct } from '@nutriApp/services/useCalculator';
import { FC, useCallback } from 'react';
import { CalculatorProduct } from './calculatorProduct';
import { Trashcan } from '@nutriApp/icons/Trashcan';
import { useCalculator } from '../../services/useCalculator';
import { useModal } from '@nutriApp/services/useModal';
import { CalculatorModal } from '../modals/calculatorModal';

interface CalculatorProps {
  productsList: ExtendedProduct[];
}

type value = 'calories' | 'proteins' | 'fats' | 'carbohydrates';

export const Calculator: FC<CalculatorProps> = ({ productsList }) => {
  const { clearCalculator } = useCalculator();
  const { setShow } = useModal(CalculatorModal.displayName);

  const onClearCalculatorClick = useCallback(() => {
    clearCalculator();
    setShow(false);
  }, [clearCalculator, setShow]);

  const obtainValue = useCallback(
    (value: value) => {
      return productsList
        .reduce((acc, curr) => {
          return curr.typeOfMeasurement === 'relative'
            ? acc +
                curr[value] *
                  curr.presentationSize *
                  0.01 *
                  curr.percentage! *
                  0.01
            : acc + curr[value] * curr.absoluteWeight! * 0.01;
        }, 0)
        .toFixed(1);
    },
    [productsList],
  );

  return (
    <div className="flex flex-col h-full pt-2 xl:pt-0 xl:flex-row">
      {!!productsList.length ? (
        <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4 lg:gap-10 grow overflow-y-auto px-2 xl:px-4 pb-4 xl:pt-4">
          {productsList.map((product) => (
            <CalculatorProduct key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="grow grid place-items-center">
          <p className="text2xl font-bold">Nada por calcular aún...</p>
        </div>
      )}
      <div className="max-xl:max-h-[30%] px-5 pb-3 xl:pt-2 border-t-2 xl:border-t-0 xl:border-l-2 border-brandGreen xl:gap-10 flex xl:flex-col">
        <div className="flex flex-col font-semibold grow">
          <p className="text-lg xl:text-2xl text-brandGreen font-semibold text-center py-1 xl:text-left">
            Totales
          </p>
          <div className="flex justify-between xl:flex-col">
            <div>
              <p className="xl:mb-5">
                Calorías
                <br />
                <span className="text-brandGreen text-lg font-bold">
                  {obtainValue('calories')}kcal
                </span>
              </p>
              <p className="xl:mb-5">
                Proteínas
                <br />
                <span className="text-brandGreen text-lg font-bold">
                  {obtainValue('proteins')}g
                </span>
              </p>
            </div>
            <div>
              <p className="xl:mb-5">
                Grasas
                <br />
                <span className="text-brandGreen text-lg font-bold">
                  {obtainValue('fats')}g
                </span>
              </p>
              <p className="xl:mb-5">
                Carbohidratos
                <br />
                <span className="text-brandGreen text-lg font-bold">
                  {obtainValue('carbohydrates')}g
                </span>
              </p>
            </div>
          </div>
        </div>

        <button
          className="rounded-full w-10 h-10 border-2 border-red-500 grid place-items-center max-xl:self-start max-xl:mt-4 xl:self-end"
          onClick={onClearCalculatorClick}
        >
          <Trashcan className="fill-red-500 w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
