import axiosClient from '@/shared/api/axiosClient';
import {Contract} from '@/shared/types/contract';
import {CreateContractDto, UpdateContractDto} from '@/shared/dto/contractsDto';

export const contractsApi = {
  getAllContracts: () => axiosClient.get<Contract[]>('/contracts'),
  // getContractById: (id: number) => axiosClient.get<Contract>(`/contracts/${id}`),
  createContract: (car: CreateContractDto) => axiosClient.post<Contract>('/contracts', car),
  updateContract: (id: number, car: UpdateContractDto) => axiosClient.put<Contract>(`/contracts/${id}`, car),
  deleteContract: (id: number) => axiosClient.delete(`/contracts/${id}`)
}
