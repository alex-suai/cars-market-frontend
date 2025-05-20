// @/store/CarContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Car } from '@/shared/types/car';
import { CreateCarDto, UpdateCarDto } from '@/shared/dto/carDto';
import {carApi} from '@/shared/api/cars';

interface CarsContextValue {
    items: Car[];
    loading: boolean;
    fetchCars: () => void;
    createCar: (car: CreateCarDto) => Promise<void>;
    updateCar: (id: number, car: UpdateCarDto) => Promise<void>;
    deleteCar: (id: number) => Promise<void>;
}

const CarsContext = createContext<CarsContextValue | undefined>(undefined);

export const CarsProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const { data } = await carApi.fetchAll();
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
            const { data } = await carApi.create(car);
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
            const { data } = await carApi.update(id, car);
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
            await carApi.delete(id);
            setItems(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete car:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
      <CarsContext.Provider value={{ items, loading, fetchCars, createCar, updateCar, deleteCar }}>
          {children}
      </CarsContext.Provider>
    );
};

export const useCars = () => {
    const context = useContext(CarsContext);
    if (!context) throw new Error('useCars must be used within CarsProvider');
    return context;
};
