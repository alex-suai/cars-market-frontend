// @/store/ContractsContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Contract } from '@/shared/types/contract';
import { CreateContractDto, UpdateContractDto } from '@/shared/dto/contractsDto';
import {contractsApi} from '@/shared/api/contracts';

interface ContractsContextValue {
  items: Contract[];
  loading: boolean;
  fetchContracts: () => void;
  createContract: (contract: CreateContractDto) => void;
  updateContract: (id: number, contract: UpdateContractDto) => void;
  deleteContract: (id: number) => void;
}

const ContractsContext = createContext<ContractsContextValue | undefined>(undefined);

export const ContractsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const { data } = await contractsApi.getAllContracts();
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
      const { data } = await contractsApi.createContract(contract);
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
      const { data } = await contractsApi.updateContract(id, contract);
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
      await contractsApi.deleteContract(id);
      setItems(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete contract:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <ContractsContext.Provider
      value={{ items, loading, fetchContracts, createContract, updateContract, deleteContract }}
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
