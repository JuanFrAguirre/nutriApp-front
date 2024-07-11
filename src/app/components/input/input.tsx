import { Search } from '@nutriApp/app/icons/search';
import clsx from 'clsx';
import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
  step?: number;
  defaultValue?: string;
  reference?: LegacyRef<HTMLInputElement>;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={clsx(`${props.className ?? ''}`)}>
      {props.label ? (
        <label
          htmlFor={props.id}
          className={clsx(` ${props.labelClassName ?? ''}`)}
        >
          {props.label}
        </label>
      ) : null}
      {props.logo ? (
        <div className="bg-stone-200 rounded-md w-fit relative">
          <Search className="absolute left-1 top-0 bottom-0 h-full fill-stone-600" />
          <RawInput
            {...props}
            inputClassName={clsx('pl-8 pr-2 max-w-40', props.inputClassName)}
            ref={ref}
            reference={ref}
          />
        </div>
      ) : (
        <RawInput
          {...props}
          inputClassName={clsx('px-2', props.inputClassName)}
          ref={ref}
          reference={ref}
        />
      )}
    </div>
  );
});

const propsToFilter = ['labelClassName', 'inputClassName', 'logo'];

const RawInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...Object.fromEntries(
        Object.entries(props).filter(([key]) => !propsToFilter.includes(key)),
      )}
      type={props.type}
      name={props.name}
      id={props.id}
      className={clsx(
        `bg-stone-200 py-0.5 rounded-md text-base
        ${props.inputClassName ?? ''}`,
      )}
      max={props.max}
      min={props.min}
      ref={ref || props.reference}
      defaultValue={props.defaultValue}
      step={props.step}
      onChange={props.onChange}
      required={props.required}
    />
  );
});

Input.displayName = 'Input';
RawInput.displayName = 'RawInput';
