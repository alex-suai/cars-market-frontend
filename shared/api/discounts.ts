import axiosClient from '@/shared/api/axiosClient';
import {Discount} from '@/shared/types';
import {DiscountDto} from '@/shared/dto';

export const discountsApi = {
  getAllDiscounts: () => axiosClient.get<Discount[]>('/discounts'),
  // getDiscountById: (id: number) => axiosClient.get<Discount>(`/discounts/${id}`),
  createDiscount: (discount: DiscountDto) => axiosClient.post<Discount>('/discounts', discount),
  updateDiscount: (id: number, discount: DiscountDto) => axiosClient.put<Discount>(`/discounts/${id}`, discount),
  deleteDiscount: (id: number) => axiosClient.delete(`/discounts/${id}`)
}