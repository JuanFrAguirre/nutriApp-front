import {
  ExtendedProduct,
  useCalculator,
} from '@nutriApp/app/services/useCalculator';
import { useModal } from '@nutriApp/app/services/useModal';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '../input/input';
import { Modal } from './modal';
import { Calculator } from '../calculator/calculator';

export const CalculatorModal = () => {
  const { productsList } = useCalculator();

  const { setShow } = useModal(CalculatorModal.displayName!);
  const closeModal = () => {
    setShow(false);
  };

  return (
    <Modal closeModal={closeModal}>
      <Calculator productsList={productsList} />
    </Modal>
  );
};

CalculatorModal.displayName = 'CalculatorModal';
