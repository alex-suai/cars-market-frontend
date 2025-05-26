// @/store/CarContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {Car, CarsModelVersion} from '@/shared/types/car';
import { CreateCarDto, UpdateCarDto } from '@/shared/dto/carDto';
import {api} from '@/shared/api';

interface CarsContextValue {
    items: Car[];
    loading: boolean;
    selected: Car | null;
    setSelected: (car: Car | null) => void;
    fetchCars: () => Promise<void>;
    createCar: (car: CreateCarDto) => Promise<void>;
    updateCar: (id: number, car: UpdateCarDto) => Promise<void>;
    deleteCar: (id: number) => Promise<void>;
}

const CarsContext = createContext<CarsContextValue | undefined>(undefined);

export const CarsProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<Car | null>(null);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const { data } = await api.carsApi.fetchAll();
            setItems(data);
        } catch (error) {
            console.error('Failed to fetch cars:', error);
        } finally {
            setLoading(false);
        }
    };

    const createCar = async (car: CreateCarDto) => {
        setLoading(true);
        try {
            const { data } = await api.carsApi.create(car);
            setItems(prev => [...prev, data]);
        } catch (error) {
            console.error('Failed to create car:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCar = async (id: number, car: UpdateCarDto) => {
        setLoading(true);
        try {
            const { data } = await api.carsApi.update(id, car);
            setItems(prev => prev.map(c => (c.id === id ? data : c)));
        } catch (error) {
            console.error('Failed to update car:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCar = async (id: number) => {
        setLoading(true);
        try {
            await api.carsApi.delete(id);
            setItems(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete car:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
      <CarsContext.Provider value={{ items, loading, fetchCars, createCar, updateCar, deleteCar, selected, setSelected }}>
          {children}
      </CarsContext.Provider>
    );
};

export const useCars = () => {
    const context = useContext(CarsContext);
    if (!context) throw new Error('useCars must be used within CarsProvider');
    return context;
};
