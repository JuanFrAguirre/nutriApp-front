import { PlusSign } from '@nutriApp/app/icons/PlusSign';
import { useModal } from '@nutriApp/app/services/useModal';
import { AddProductModal } from '../modals/addProductModal';

export const OpenAddProductButton = () => {
  const { setShow } = useModal(AddProductModal.displayName!);

  return (
    <button
      type="button"
      className="fixed bg-brandGreen rounded-xl h-14 w-14 bottom-28 right-6 z-[400] grid place-items-center shadow-xl border border-stone-200"
      onClick={() => {
        setShow(true);
      }}
    >
      <PlusSign className="w-10 h-10" />
    </button>
  );
};
