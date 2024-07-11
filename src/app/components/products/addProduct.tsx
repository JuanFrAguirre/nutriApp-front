'use client';
import { useLoadingSpinner } from '@nutriApp/app/services/useLoading';
import { useModal } from '@nutriApp/app/services/useModal';
import { useProducts } from '@nutriApp/app/services/useProducts';
import { checkIfNumber } from '@nutriApp/app/utils/checkIfNumber';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { Input } from '../input/input';
import { AddProductModal } from '../modals/addProductModal';

export const AddProduct = () => {
  const { setShow } = useModal(AddProductModal.displayName!);
  const addProductForm = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const { addProduct } = useProducts();
  const { setLoading } = useLoadingSpinner();
  const [image, setImage] = useState('');

  const validateForm = useCallback((formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries());
    let numericValues = [
      formValues['calories'],
      formValues['proteins'],
      formValues['fats'],
      formValues['carbohydrates'],
      formValues['presentationSize'],
    ];
    if (numericValues.some((value) => !checkIfNumber(Number(value)))) {
      toast.error('Nutritional data must be numbers');
      return false;
    }
    if (!formValues['title']) {
      toast.error('Title is required');
      return false;
    }
    return true;
  }, []);

  const submitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!addProductForm.current) {
        toast.error('Missing data');
        return;
      }
      const formData = new FormData(addProductForm.current);
      const formValues = Object.fromEntries(formData.entries());
      if (validateForm(formData)) {
        const extendedProduct = {
          title: formValues['title'].toString(),
          presentationSize: Number(formValues['presentationSize'].toString()),
          image: formValues['image'].toString(),
          tags: formValues['tags'].toString(),
          calories: Number(formValues['calories'].toString()),
          proteins: Number(formValues['proteins'].toString()),
          fats: Number(formValues['fats'].toString()),
          carbohydrates: Number(formValues['carbohydrates'].toString()),
        };
        setLoading(true);
        await addProduct(extendedProduct);
        setLoading(false);
        setShow(false);
      }
    },
    [addProduct, setShow, setLoading, validateForm],
  );

  const onImgInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImage(e.target.value);
  };

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [setShow]);

  return (
    <>
      <form
        onSubmit={submitForm}
        ref={addProductForm}
        className="px-4 py-4 flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-1">
          <h2 className="py-4 text-2xl md:text-4xl font-semibold text-center">
            Add a product
          </h2>
          <div className="md:w-[80%] lg:w-[60%] xl:max-w-[1000px] md:mx-auto">
            <div className="flex gap-10">
              <div className="space-y-4 grow">
                <Input
                  className="flex flex-col gap-1 md:gap-2"
                  labelClassName="md:font-semibold"
                  inputClassName="md:px-4 md:py-2"
                  id="title"
                  name="title"
                  type="text"
                  label="Título"
                  required
                  ref={titleRef}
                />
                <Input
                  className="flex flex-col gap-1 md:gap-2"
                  labelClassName="md:font-semibold"
                  inputClassName="md:px-4 md:py-2"
                  id="image"
                  name="image"
                  type="text"
                  label="Imagen (URL)"
                  onChange={onImgInputChange}
                />
                <Input
                  className="flex flex-col gap-1 md:gap-2"
                  labelClassName="md:font-semibold"
                  inputClassName="md:px-4 md:py-2"
                  id="tags"
                  name="tags"
                  type="text"
                  label="Etiquetas (separadas por coma)"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    className="flex flex-col gap-1 md:gap-2"
                    labelClassName="md:font-semibold"
                    inputClassName="md:px-4 md:py-2"
                    id="presentationSize"
                    name="presentationSize"
                    type="number"
                    label="Presentación (en gramos)"
                    required
                    step={0.1}
                  />
                  <Input
                    className="flex flex-col gap-1 md:gap-2"
                    labelClassName="md:font-semibold"
                    inputClassName="md:px-4 md:py-2"
                    id="calories"
                    name="calories"
                    type="number"
                    label="Calorías (en 100g)"
                    required
                    step={0.1}
                  />
                  <Input
                    className="flex flex-col gap-1 md:gap-2"
                    labelClassName="md:font-semibold"
                    inputClassName="md:px-4 md:py-2"
                    id="proteins"
                    name="proteins"
                    type="number"
                    label="Proteínas (en 100g)"
                    required
                    step={0.1}
                  />
                  <Input
                    className="flex flex-col gap-1 md:gap-2"
                    labelClassName="md:font-semibold"
                    inputClassName="md:px-4 md:py-2"
                    id="fats"
                    name="fats"
                    type="number"
                    label="Grasas (en 100g)"
                    required
                    step={0.1}
                  />
                  <Input
                    className="flex flex-col gap-1 md:gap-2"
                    labelClassName="md:font-semibold"
                    inputClassName="md:px-4 md:py-2"
                    id="carbohydrates"
                    name="carbohydrates"
                    type="number"
                    label="Carbohidratos (en 100g)"
                    required
                    step={0.1}
                  />
                </div>
              </div>
              {image ? (
                /* eslint-disable-next-line */
                <img
                  src={image}
                  alt={titleRef?.current?.value}
                  className="max-w-[50%] rounded-xl border border-stone-200 object-contain bg-white max-xl:hidden"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex justify-end md:justify-center mt-4">
          <button className="bg-brandGreen text-white py-2 px-4 rounded-xl">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
