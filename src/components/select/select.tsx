import clsx from 'clsx';
import { ChangeEvent, FC } from 'react';

interface Option {
  id: string;
  value: number | string;
  default?: boolean;
}

interface Props {
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  id: string;
  name: string;
  label?: string;
  options: Option[];
  defaultOption?: Option;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: FC<Props> = ({
  className,
  labelClassName,
  selectClassName,
  id,
  name,
  label,
  options,
  defaultOption,
  onChange,
}) => {
  return (
    <div className={clsx(`${className ?? ''}`)}>
      {label ? (
        <label htmlFor={id} className={clsx(`${labelClassName ?? ''}`)}>
          {label}
        </label>
      ) : null}
      <select
        name={name}
        id={id}
        className={clsx(`${selectClassName ?? ''}`)}
        onChange={onChange}
      >
        {defaultOption && (
          <option value={defaultOption.id}>{defaultOption.value}</option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id} selected={option.default}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
