// @/context/ModalFormContext.tsx
import React, { createContext, useContext } from 'react';
import {useModalForm} from '@/shared/utils/useModalForm';

const ModalFormContext = createContext<ReturnType<typeof useModalForm> | null>(null);

export const ModalFormProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useModalForm();
  return (
    <ModalFormContext.Provider value={modal}>
      {children}
    </ModalFormContext.Provider>
  );
};

export const useModalFormContext = () => {
  const context = useContext(ModalFormContext);
  if (!context) {
    throw new Error('useModalFormContext must be used within a ModalFormProvider');
  }
  return context;
};
