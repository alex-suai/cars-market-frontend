export interface Car {
    id: number;
    vin: string;
    model: string;
    model_version: string;
    manufacturer: string;
    mileage: number;
    price: number;
    color: string;
    status: 'in_stock' | 'reserved' | 'sold' | 'ordered';
    arrival_date: Date;
}

export interface CarsModelVersion {
    id: number;
    name: string;
    year_from: number;
    year_to: number;
    model: string;
}