'use client';
import { PlusSign } from '@nutriApp/icons/PlusSign';
import { useRouter } from 'next/navigation';

export const OpenAddProductButton = () => {
  const { push } = useRouter();

  return (
    <button
      type="button"
      className="fixed bg-brandGreen rounded-xl h-14 w-14 bottom-28 right-6 z-[400] grid place-items-center shadow-xl border border-stone-200"
      onClick={() => {
        push('/products/add');
      }}
    >
      <PlusSign className="w-10 h-10" />
    </button>
  );
};
