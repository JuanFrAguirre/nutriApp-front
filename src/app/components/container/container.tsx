import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-700 pt-16">
      {children}
    </div>
  );
};
