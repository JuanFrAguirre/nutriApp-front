import { Food } from '@nutriApp/app/icons/Food';
import { useCalculator } from '@nutriApp/app/services/useCalculator';
import { useModal } from '@nutriApp/app/services/useModal';
import { CalculatorModal } from '../modals/calculatorModal';

export const OpenCalculatorButton = () => {
  const { setShow } = useModal(CalculatorModal.displayName!);
  const { productsList } = useCalculator();

  return (
    <button
      type="button"
      className="fixed bg-brandGreen rounded-xl h-14 w-14 bottom-12 right-6 z-[400] grid place-items-center shadow-xl border border-stone-200"
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
    </button>
  );
};
