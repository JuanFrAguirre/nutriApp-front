'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from 'react';

interface LoadingSpinnerContext {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<LoadingSpinnerContext>({
  loading: false,
  setLoading() {},
});

export const LoadingSpinnerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useLoadingSpinner = () => {
  const { loading, setLoading } = useContext(context);

  return { loading, setLoading };
};
