// @/store/ContractsContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Contract } from '@/shared/types/contract';
import { CreateContractDto, UpdateContractDto } from '@/shared/dto/contractsDto';
import {api} from '@/shared/api';

interface ContractsContextValue {
  items: Contract[];
  loading: boolean;
  selected: Contract | null;
  setSelected: (selected: Contract | null) => void;
  fetchContracts: () => Promise<void>;
  createContract: (contract: CreateContractDto) => Promise<void>;
  updateContract: (id: number, contract: UpdateContractDto) => Promise<void>;
  deleteContract: (id: number) => Promise<void>;
}

const ContractsContext = createContext<ContractsContextValue | undefined>(undefined);

export const ContractsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Contract | null>(null);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const { data } = await api.contractsApi.getAllContracts();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createContract = async (contract: CreateContractDto) => {
    setLoading(true);
    try {
      const { data } = await api.contractsApi.createContract(contract);
      setItems(prev => [...prev, data]);
    } catch (error) {
      console.error('Failed to create contract:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContract = async (id: number, contract: UpdateContractDto) => {
    setLoading(true);
    try {
      const { data } = await api.contractsApi.updateContract(id, contract);
      setItems(prev => prev.map(c => (c.id === id ? data : c)));
    } catch (error) {
      console.error('Failed to update contract:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContract = async (id: number) => {
    setLoading(true);
    try {
      await api.contractsApi.deleteContract(id);
      setItems(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete contract:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContractsContext.Provider
      value={{ items, loading, fetchContracts, createContract, updateContract, deleteContract, selected, setSelected }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractsContext);
  if (!context) {
    throw new Error('useContracts must be used within a ContractsProvider');
  }
  return context;
};
