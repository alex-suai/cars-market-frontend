import React, {createContext, useContext, useState} from 'react';
import {api} from '@/shared/api';
import {Discount} from '@/shared/types';
import {DiscountDto} from '@/shared/dto';

interface DiscountsContextValue {
  items: Discount[];
  loading: boolean;
  selected: Discount | null;
  setSelected: (selected: Discount | null) => void;
  fetchDiscounts: () => Promise<void>;
  createDiscount: (discount: DiscountDto) => Promise<void>;
  updateDiscount: (id: number, discount: DiscountDto) => Promise<void>;
  deleteDiscount: (id: number) => Promise<void>;
}

const DiscountsContext = createContext<DiscountsContextValue | undefined>(undefined);

export const DiscountsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Discount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Discount | null>(null);

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const { data } = await api.discountsApi.getAllDiscounts();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch discounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDiscount = async (discount: DiscountDto) => {
    setLoading(true);
    try {
      const { data } = await api.discountsApi.createDiscount(discount);
      setItems(prev => [...prev, data]);
    } catch (error) {
      console.error('Failed to create discount:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDiscount = async (id: number, discount: DiscountDto) => {
    setLoading(true);
    try {
      const { data } = await api.discountsApi.updateDiscount(id, discount);
      setItems(prev => prev.map(c => (c.id === id ? data : c)));
    } catch (error) {
      console.error('Failed to update discount:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDiscount = async (id: number) => {
    setLoading(true);
    try {
      await api.discountsApi.deleteDiscount(id);
      setItems(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete discount:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DiscountsContext.Provider
      value={{ items, loading, fetchDiscounts, createDiscount, updateDiscount, deleteDiscount, selected, setSelected }}
    >
      {children}
    </DiscountsContext.Provider>
  );
};

export const useDiscounts = () => {
  const context = useContext(DiscountsContext);
  if (!context) {
    throw new Error('useDiscounts must be used within a DiscountsProvider');
  }
  return context;
};