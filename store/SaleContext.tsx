import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Sale } from '@/types/sale';

interface SalesContextValue {
  items: Sale[];
  loading: boolean;
  fetchSales: () => void;
}

const SalesContext = createContext<SalesContextValue | undefined>(undefined);

export const SalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get<Sale[]>('/Sales');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch Sales:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <SalesContext.Provider value={{ items, loading, fetchSales }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
};