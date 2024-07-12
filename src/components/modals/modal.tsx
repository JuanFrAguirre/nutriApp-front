'use client';
import { PlusSign } from '@nutriApp/icons/PlusSign';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  closeModal: () => void;
  title?: string;
}

export const Modal: FC<Props> = ({ children, closeModal, title }) => {
  return (
    <div className="z-[700] relative">
      <div
        className="fixed left-0 right-0 top-0 bottom-0 bg-black/40"
        onClick={closeModal}
      ></div>
      <div className="fixed left-0 right-0 top-0 bottom-0 w-[90vw] h-[80vh] shadow-2xl bg-stone-50 m-auto rounded-xl overscroll-none">
        {title && (
          <h2 className="py-4 text-2xl md:text-4xl font-semibold text-center">
            {title}
          </h2>
        )}
        <section
          className={clsx(
            'overflow-y-auto relative bottom-0 top-0',
            title ? 'h-[85%]' : 'h-full',
          )}
        >
          {children}
        </section>
        <button className="absolute -top-2  -right-2" onClick={closeModal}>
          <div className="bg-brandGreen rounded-full border-2 border-stone-300">
            <PlusSign className=" rotate-45" />
          </div>
        </button>
      </div>
    </div>
  );
};
