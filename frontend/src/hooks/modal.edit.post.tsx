/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext, useCallback, useContext, useState } from 'react';

interface ModalEditPostContextData {
  toggleOpenEditPostModal(): void;

  isOpenEditPostModal: boolean;
}

type ModalEditPostProviderProps = React.PropsWithChildren;

const ModalEditPostContext = createContext<ModalEditPostContextData>(
  {} as ModalEditPostContextData,
);

const ModalEditPostProvider: React.FC<ModalEditPostProviderProps> = ({
  children,
}) => {
  const [isOpenEditPostModal, setIsOpenEditPostModal] = useState(false);

  const toggleOpenEditPostModal = useCallback(() => {
    setIsOpenEditPostModal(!isOpenEditPostModal);
  }, [isOpenEditPostModal]);

  return (
    <ModalEditPostContext.Provider
      value={{ isOpenEditPostModal, toggleOpenEditPostModal }}
    >
      {children}
    </ModalEditPostContext.Provider>
  );
};

const useModalEditPost = function (): ModalEditPostContextData {
  const context = useContext<ModalEditPostContextData>(ModalEditPostContext);

  if (!context) {
    throw new Error(
      'useModalEditPost must be used within ModalEditPostProvider',
    );
  }

  return context;
};

export { ModalEditPostProvider, useModalEditPost };
