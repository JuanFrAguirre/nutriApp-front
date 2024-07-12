'use client';
import { Container } from '@nutriApp/components/container/container';
import { Input } from '@nutriApp/components/input/input';
import { STOCK_IMAGE } from '@nutriApp/components/products/addProduct';
import { useLoadingSpinner } from '@nutriApp/services/useLoading';
import { useProducts } from '@nutriApp/services/useProducts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface Props {
  params: { id: string };
}

const DEFAULT_FORM_VALUES = {
  title: '',
  image: '',
  tags: '',
  presentationSize: 0,
  calories: 0,
  proteins: 0,
  fats: 0,
  carbohydrates: 0,
};

interface FormValues {
  id?: string;
  title: string;
  tags: string;
  description?: string;
  presentationSize: number;
  image?: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  createdAt?: string;
  updatedAt?: string;
}

const Page: FC<Props> = ({ params }) => {
  const { product, getProduct, editProduct, deleteProduct } = useProducts();
  const { setLoading } = useLoadingSpinner();
  const editProductForm = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState<FormValues>(DEFAULT_FORM_VALUES);
  const { push } = useRouter();

  const loadProduct = useCallback(async () => {
    setLoading(true);
    const response = await getProduct(params.id);
    if (response?.data) {
      setFormValues({
        id: response.data.id,
        title: response.data.title,
        tags: response.data.tags,
        description: response.data.description,
        presentationSize: response.data.presentationSize,
        image: response.data.image || '',
        calories: response.data.calories,
        proteins: response.data.proteins,
        fats: response.data.fats,
        carbohydrates: response.data.carbohydrates,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      });
    }
    setLoading(false);
  }, [setLoading, params.id, getProduct]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    },
    [formValues],
  );

  const submitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (JSON.stringify(formValues) === JSON.stringify(product)) return;
      try {
        await editProduct(formValues);
        loadProduct();
      } catch (error) {
        console.error(error);
      }
    },
    [editProduct, formValues, product, loadProduct],
  );

  const clearForm = useCallback(() => {
    loadProduct();
  }, [loadProduct]);

  const isEdited = useMemo(() => {
    return JSON.stringify(formValues) !== JSON.stringify(product);
  }, [formValues, product]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return (
    <>
      <Container>
        {product ? (
          <form
            onSubmit={submitForm}
            ref={editProductForm}
            className="px-4 py-4 flex flex-col justify-between h-full"
          >
            <div className="flex flex-col gap-1">
              <h1 className="py-4 pt-10 text-2xl md:text-4xl font-semibold text-center text-brandGreen">
                {product.title}
              </h1>
              <div className="md:w-[80%] lg:w-[60%] xl:max-w-[1000px] md:mx-auto relative">
                <Link className="absolute -top-24 left-0" href={'/'}>
                  <p className="hover:text-brandGreen  underline">{`Volver a productos`}</p>
                </Link>
                <div className="flex max-md:flex-col-reverse items-center gap-10">
                  <div className="space-y-4 grow self-stretch">
                    <Input
                      onChange={handleInputChange}
                      className="flex flex-col gap-1 md:gap-2"
                      labelClassName="md:font-semibold text-brandGreen"
                      inputClassName="md:px-4 md:py-2"
                      id="title"
                      name="title"
                      type="text"
                      label="Título"
                      value={formValues.title || ''}
                      required
                    />
                    <Input
                      onChange={handleInputChange}
                      className="flex flex-col gap-1 md:gap-2"
                      labelClassName="md:font-semibold text-brandGreen"
                      inputClassName="md:px-4 md:py-2"
                      id="image"
                      name="image"
                      type="text"
                      label="Imagen (URL)"
                      value={formValues.image || ''}
                    />
                    <Input
                      onChange={handleInputChange}
                      className="flex flex-col gap-1 md:gap-2"
                      labelClassName="md:font-semibold text-brandGreen"
                      inputClassName="md:px-4 md:py-2"
                      id="tags"
                      name="tags"
                      type="text"
                      label="Etiquetas (separadas por coma)"
                      value={formValues.tags || ''}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        onChange={handleInputChange}
                        className="flex flex-col gap-1 md:gap-2"
                        labelClassName="md:font-semibold text-brandGreen"
                        inputClassName="md:px-4 md:py-2"
                        id="presentationSize"
                        name="presentationSize"
                        type="number"
                        label="Presentación (en gramos)"
                        required
                        step={0.1}
                        value={formValues.presentationSize || 0}
                      />
                      <Input
                        onChange={handleInputChange}
                        className="flex flex-col gap-1 md:gap-2"
                        labelClassName="md:font-semibold text-brandGreen"
                        inputClassName="md:px-4 md:py-2"
                        id="calories"
                        name="calories"
                        type="number"
                        label="Calorías (en 100g)"
                        required
                        step={0.1}
                        value={formValues.calories || 0}
                      />
                      <Input
                        onChange={handleInputChange}
                        className="flex flex-col gap-1 md:gap-2"
                        labelClassName="md:font-semibold text-brandGreen"
                        inputClassName="md:px-4 md:py-2"
                        id="proteins"
                        name="proteins"
                        type="number"
                        label="Proteínas (en 100g)"
                        required
                        step={0.1}
                        value={formValues.proteins || 0}
                      />
                      <Input
                        onChange={handleInputChange}
                        className="flex flex-col gap-1 md:gap-2"
                        labelClassName="md:font-semibold text-brandGreen"
                        inputClassName="md:px-4 md:py-2"
                        id="fats"
                        name="fats"
                        type="number"
                        label="Grasas (en 100g)"
                        required
                        step={0.1}
                        value={formValues.fats || 0}
                      />
                      <Input
                        onChange={handleInputChange}
                        className="flex flex-col gap-1 md:gap-2"
                        labelClassName="md:font-semibold text-brandGreen"
                        inputClassName="md:px-4 md:py-2"
                        id="carbohydrates"
                        name="carbohydrates"
                        type="number"
                        label="Carbohidratos (en 100g)"
                        required
                        step={0.1}
                        value={formValues.carbohydrates || 0}
                      />
                    </div>
                  </div>
                  {/* eslint-disable-next-line */}
                  <img
                    src={
                      product.image
                        ? `${product.image}?fit=crop&h=600&w=600`
                        : null || STOCK_IMAGE
                    }
                    alt={product.title}
                    className="w-[300px] md:w-1/2 object-contain rounded-xl border border-stone-200 bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 gap-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-xl disabled:bg-stone-300 disabled:cursor-not-allowed"
                type="button"
                onClick={() => {
                  const response = prompt(
                    `Seguro que deseas borrar este producto?\nPara confirmar escribe: BORRAR ${product.title}`,
                  );
                  if (response !== `BORRAR ${product.title}`) return;
                  deleteProduct(product.id!);
                  push('/products');
                }}
              >
                Borrar
              </button>
              <button
                className="bg-orange-400 text-white py-2 px-4 rounded-xl disabled:bg-stone-300 disabled:cursor-not-allowed"
                disabled={!isEdited}
                type="button"
                onClick={clearForm}
              >
                Limpiar
              </button>
              <button
                className="bg-brandGreen text-white py-2 px-4 rounded-xl disabled:bg-stone-300 disabled:cursor-not-allowed"
                disabled={!isEdited}
              >
                Guardar
              </button>
            </div>
          </form>
        ) : null}
      </Container>
    </>
  );
};

export default Page;
