export interface CreateClientDto {
  name: string;
  surname?: string;
  phone_number?: string;
  email: string;
}

export type UpdateClientDto = Partial<CreateClientDto>;