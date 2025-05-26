// @/store/EmployeesContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Employee } from '@/shared/types/employee';
import { api } from '@/shared/api';
import {CreateEmployeeDto, UpdateEmployeeDto} from '@/shared/dto/employeeDto';

interface EmployeesContextValue {
  items: Employee[];
  loading: boolean;
  selected: Employee | null;
  setSelected: (employee: Employee | null) => void;
  fetchEmployees: () => Promise<void>;
  createEmployee: (employee: CreateEmployeeDto) => Promise<void>;
  updateEmployee: (id: number, employee: UpdateEmployeeDto) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
}

const EmployeesContext = createContext<EmployeesContextValue | undefined>(undefined);

export const EmployeesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data } = await api.employeesApi.getAllEmployees();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employee: CreateEmployeeDto) => {
    setLoading(true);
    try {
      const { data } = await api.employeesApi.createEmployee(employee);
      setItems(prev => [...prev, data]);
    } catch (error) {
      console.error('Failed to create employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: number, employee: UpdateEmployeeDto) => {
    setLoading(true);
    try {
      const { data } = await api.employeesApi.updateEmployee(id, employee);
      setItems(prev => prev.map(e => (e.id === id ? data : e)));
    } catch (error) {
      console.error('Failed to update employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    setLoading(true);
    try {
      await api.employeesApi.deleteEmployee(id);
      setItems(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Failed to delete employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeesContext.Provider
      value={{
        items,
        loading,
        selected,
        setSelected,
        fetchEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeesProvider');
  }
  return context;
};
