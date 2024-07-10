'use client';
import { useCalculator } from '@nutriApp/app/services/useCalculator';
import { useModal } from '@nutriApp/app/services/useModal';
import { Calculator } from '../calculator/calculator';
import { Modal } from './modal';
import { useEffect } from 'react';

export const CalculatorModal = () => {
  const { productsList } = useCalculator();

  const { setShow } = useModal(CalculatorModal.displayName!);
  const closeModal = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [setShow]);

  return (
    <Modal closeModal={closeModal}>
      <Calculator productsList={productsList} />
    </Modal>
  );
};

CalculatorModal.displayName = 'CalculatorModal';
