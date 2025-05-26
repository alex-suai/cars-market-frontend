export interface CreateEmployeeDto {
  name: string;
  surname: string;
  profession: string;
}

export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;