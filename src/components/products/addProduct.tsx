'use client';
import { useLoadingSpinner } from '@nutriApp/services/useLoading';
import { useProducts } from '@nutriApp/services/useProducts';
import { checkIfNumber } from '@nutriApp/utils/checkIfNumber';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export const STOCK_IMAGE =
  'https://static.vecteezy.com/system/resources/previews/027/381/351/non_2x/shopping-cart-icon-shopping-trolley-icon-shopping-cart-logo-container-for-goods-and-products-economics-symbol-design-elements-basket-symbol-silhouette-retail-design-elements-vector.jpg';

export const AddProduct = () => {
  const { push } = useRouter();
  const addProductForm = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const { addProduct } = useProducts();
  const { setLoading } = useLoadingSpinner();
  const [image, setImage] = useState(STOCK_IMAGE);

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
        push('/products');
      }
    },
    [addProduct, setLoading, validateForm, push],
  );

  const onImgInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImage(e.target.value);
  };

  useEffect(() => {
    titleRef?.current?.focus();
  }, []);

  return (
    <>
      <form
        onSubmit={submitForm}
        ref={addProductForm}
        className="px-4 py-4 flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-1">
          <h2 className="py-4 pt-10 text-2xl md:text-4xl font-semibold text-center">
            Agregar un producto
          </h2>
          <div className="xl:max-w-[1400px] md:mx-auto relative">
            <Link className="absolute -top-24 left-0" href={'/'}>
              <p className="hover:text-brandGreen  underline">{`Volver a productos`}</p>
            </Link>
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
                  onBlur={onImgInputChange}
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
                  src={image || STOCK_IMAGE}
                  alt={titleRef?.current?.value}
                  className="max-w-[50%] rounded-xl border border-stone-200 object-contain bg-white max-xl:hidden"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex justify-end md:justify-center mt-4">
          <button className="bg-brandGreen text-white py-2 px-4 rounded-xl">
            Agregar
          </button>
        </div>
      </form>
    </>
  );
};
