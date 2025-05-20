import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Car } from '@/types/car';

interface CarsContextValue {
    items: Car[];
    loading: boolean;
    fetchCars: () => void;
}

const CarsContext = createContext<CarsContextValue | undefined>(undefined);

export const CarsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get<Car[]>('/cars');
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch cars:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <CarsContext.Provider value={{ items, loading, fetchCars }}>
            {children}
        </CarsContext.Provider>
    );
};

export const useCars = () => {
    const context = useContext(CarsContext);
    if (!context) {
        throw new Error('useCars must be used within a CarsProvider');
    }
    return context;
};