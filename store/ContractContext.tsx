import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Contract } from '@/types/contract';

interface ContractsContextValue {
  items: Contract[];
  loading: boolean;
  fetchContracts: () => void;
}

const ContractsContext = createContext<ContractsContextValue | undefined>(undefined);

export const ContractsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get<Contract[]>('/Contracts');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch Contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <ContractsContext.Provider value={{ items, loading, fetchContracts }}>
      {children}
    </ContractsContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};