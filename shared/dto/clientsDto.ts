export interface CreateClientDto {
  name: string;
  surname?: string;
  phone_number?: string;
  email: string;
  sales_amount?: number;
  total_expenses?: number;
}

export type UpdateClientDto = Partial<CreateClientDto>;