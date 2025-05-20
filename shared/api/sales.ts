import axiosClient from '@/shared/api/axiosClient';
import {Sale} from '@/shared/types/sale';

export const salesApi = {
  getAllSales: () => axiosClient.get<Sale[]>('/sales'),
  getSaleById: (id: number) => axiosClient.get<Sale>(`/sales/${id}`),
  deleteSale:(id: number) => axiosClient.delete(`/sales/${id}`),
}
