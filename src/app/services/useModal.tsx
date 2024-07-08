'use client';
import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
} from 'react';

interface Modal {
  show?: boolean;
}

interface ModalStateHolder {
  [id: string]: Modal;
}

interface ModalContext {
  state: ModalStateHolder;
  setState: Dispatch<SetStateAction<ModalStateHolder>>;
}

const context = createContext<ModalContext>({ state: {}, setState() {} });

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({});

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useModal = (id: string) => {
  const modalContext = useContext(context);

  const currentModal = useMemo(() => {
    if (modalContext.state[id]) {
      return modalContext.state[id];
    }

    modalContext.state[id] = {
      show: false,
    };

    return modalContext.state[id];
  }, [modalContext.state, id]);

  const setShow = useCallback(
    (show: boolean) => {
      modalContext.setState((prev) => ({
        ...prev,
        [id]: { ...prev[id], show },
      }));
    },
    [modalContext, id],
  );

  const toggle = useCallback(() => {
    setShow(currentModal ? !modalContext.state[id]?.show : true);
  }, [currentModal, modalContext.state, id, setShow]);

  return {
    modal: currentModal,
    toggle,
    setShow,
  };
};
