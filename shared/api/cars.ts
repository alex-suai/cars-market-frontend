import axiosClient from '@/shared/api/axiosClient';
import {Car} from '@/shared/types/car';
import {CreateCarDto, UpdateCarDto} from '@/shared/dto/carDto';

export const carApi = {
  fetchAll: () => axiosClient.get<Car[]>('/cars'),
  create: (data: CreateCarDto) => axiosClient.post<Car>('/cars', data),
  update: (id: number, data: UpdateCarDto) => axiosClient.put<Car>(`/cars/${id}`, data),
  delete: (id: number) => axiosClient.delete(`/cars/${id}`),
};