import axiosClient from '@/shared/api/axiosClient';
import {Contract} from '@/shared/types/contract';
import {CreateContractDto, UpdateContractDto} from '@/shared/dto/contractsDto';

export const contractsApi = {
  getAllContracts: () => axiosClient.get<Contract[]>('/contracts'),
  // getContractById: (id: number) => axiosClient.get<Contract>(`/contracts/${id}`),
  createContract: (contract: CreateContractDto) => axiosClient.post<Contract>('/contracts', contract),
  updateContract: (id: number, contract: UpdateContractDto) => axiosClient.patch<Contract>(`/contracts/${id}`, contract),
  deleteContract: (id: number) => axiosClient.delete(`/contracts/${id}`)
}
