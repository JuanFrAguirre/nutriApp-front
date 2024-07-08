import { Search } from '@nutriApp/app/icons/search';
import clsx from 'clsx';
import { ChangeEventHandler, LegacyRef } from 'react';

interface Props {
  id: string;
  type: string;
  name: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: String;
  logo?: boolean;
  max?: number;
  min?: number;
  defaultValue?: string;
  reference?: LegacyRef<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Input = (props: Props) => {
  const {
    id,
    name,
    type,
    label,
    className,
    inputClassName,
    labelClassName,
    logo,
    max,
    min,
    defaultValue,
    reference,
    onChange,
    ...rest
  } = props;
  return (
    <div className={clsx(`${className ?? ''}`)}>
      {label ? (
        <label htmlFor={id} className={clsx(` ${labelClassName ?? ''}`)}>
          {label}
        </label>
      ) : null}
      {logo ? (
        <div className="bg-stone-200 rounded-md w-fit relative">
          <Search className="absolute left-1 top-0 bottom-0 h-full fill-stone-600" />
          <input
            type={type}
            name={name}
            id={id}
            className={clsx(
              `${
                inputClassName ?? ''
              } bg-stone-200 py-0.5 pl-8 pr-2 rounded-md text-base`,
            )}
            max={max}
            min={min}
            ref={reference}
            defaultValue={defaultValue}
            onChange={onChange}
            {...rest}
          />
        </div>
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          className={clsx(
            `${
              inputClassName ?? ''
            } bg-stone-200 py-0.5 px-2 rounded-md text-base`,
          )}
          max={max}
          min={min}
          ref={reference}
          defaultValue={defaultValue}
          onChange={onChange}
          {...rest}
        />
      )}
    </div>
  );
};
