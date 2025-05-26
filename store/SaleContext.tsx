// @/store/SalesContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sale } from '@/shared/types/sale';
import {api} from '@/shared/api';

interface SalesContextValue {
  items: Sale[];
  loading: boolean;
  fetchSales: () => Promise<void>;
  deleteSale: (id: number) => Promise<void>;
}

const SalesContext = createContext<SalesContextValue | undefined>(undefined);

export const SalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const { data } = await api.salesApi.getAllSales();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSale = async (id: number) => {
    setLoading(true);
    try {
      await api.salesApi.deleteSale(id);
      setItems(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to delete sale:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SalesContext.Provider
      value={{ items, loading, fetchSales, deleteSale }}
    >
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
