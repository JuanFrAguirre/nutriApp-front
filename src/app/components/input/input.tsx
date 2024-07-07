import { Search } from '@nutriApp/app/icons/search';
import clsx from 'clsx';

interface Props {
  id: string;
  type: string;
  name: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: String;
}

export const Input = (props: Props) => {
  const { id, name, type, label, className, inputClassName, labelClassName } =
    props;
  return (
    <div className={clsx(`${className}`)}>
      {label ? (
        <label htmlFor={id} className={clsx(` ${labelClassName}`)}>
          {label}
        </label>
      ) : null}
      <div className="bg-stone-200 rounded-md w-fit relative">
        <Search className="absolute left-1 top-0 bottom-0 h-full fill-stone-600" />
        <input
          type={type}
          name={name}
          id={id}
          className={clsx(
            `${inputClassName} bg-stone-200 py-0.5 pl-8 rounded-md text-base w-40`,
          )}
        />
      </div>
    </div>
  );
};
