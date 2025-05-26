// @/store/ClientsContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@/shared/types/client';
import { CreateClientDto, UpdateClientDto } from '@/shared/dto/clientsDto';
import {api} from '@/shared/api';

interface ClientsContextValue {
  items: Client[];
  loading: boolean;
  selected: Client | null;
  setSelected: (client: Client | null) => void;
  fetchClients: () => Promise<void>;
  createClient: (client: CreateClientDto) => Promise<void>;
  updateClient: (id: number, client: UpdateClientDto) => Promise<void>;
  deleteClient: (id: number) => Promise<void>;
}

const ClientsContext = createContext<ClientsContextValue | undefined>(undefined);

export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Client | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data } = await api.clientsApi.getAllClients();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (client: CreateClientDto) => {
    setLoading(true);
    try {
      const { data } = await api.clientsApi.createClient(client);
      setItems(prev => [...prev, data]);
    } catch (error) {
      console.error('Failed to create client:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id: number, client: UpdateClientDto) => {
    setLoading(true);
    try {
      const { data } = await api.clientsApi.updateClient(id, client);
      setItems(prev => prev.map(c => (c.id === id ? data : c)));
    } catch (error) {
      console.error('Failed to update client:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: number) => {
    setLoading(true);
    try {
      await api.clientsApi.deleteClient(id);
      setItems(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete client:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientsContext.Provider
      value={{ items, loading, fetchClients, createClient, updateClient, deleteClient, selected, setSelected }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
};
