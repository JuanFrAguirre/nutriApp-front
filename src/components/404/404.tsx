import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const NotFound404 = () => {
  const { back } = useRouter();

  return (
    <div className="text-center h-full flex flex-col justify-center gap-10 pb-40 px-10 mx-auto">
      <h1 className="text-center text-2xl">
        Lo sentimos, no hemos podido encontrar lo que estás buscando...
      </h1>
      <button onClick={back}>
        <p className="underline text-brandGreen font-semibold">Volver</p>
      </button>
    </div>
  );
};
