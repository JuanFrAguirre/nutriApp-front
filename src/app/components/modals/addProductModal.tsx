import { useModal } from '@nutriApp/app/services/useModal';
import { Modal } from './modal';
import { AddProduct } from '../products/addProduct';

export const AddProductModal = () => {
  const { setShow } = useModal(AddProductModal.displayName!);

  const closeModal = () => {
    setShow(false);
  };

  return (
    <Modal closeModal={closeModal}>
      <AddProduct />
    </Modal>
  );
};

AddProductModal.displayName = 'AddProductModal';
