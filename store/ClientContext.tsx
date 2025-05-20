import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Client } from '@/types/client';

interface ClientsContextValue {
  items: Client[];
  loading: boolean;
  fetchClients: () => void;
}

const ClientsContext = createContext<ClientsContextValue | undefined>(undefined);

export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get<Client[]>('/clients');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ items, loading, fetchClients }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};