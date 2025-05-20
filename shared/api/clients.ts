import axiosClient from '@/shared/api/axiosClient';
import {CreateClientDto, UpdateClientDto} from '@/shared/dto/clientsDto';
import {Client} from '@/shared/types/client';

export const clientApi = {
  getAllClients: () => axiosClient.get<Client[]>('/clients'),
  // getClientById = (id: number) => axiosClient.get<Client>(`/clients/${id}`),
  createClient: (car: CreateClientDto) => axiosClient.post<Client>('/clients', car),
  updateClient: (id: number, car: UpdateClientDto) => axiosClient.put<Client>(`/clients/${id}`, car),
  deleteClient: (id: number) => axiosClient.delete(`/clients/${id}`)
}
