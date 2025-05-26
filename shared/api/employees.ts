import axiosClient from '@/shared/api/axiosClient';
import {Employee} from '@/shared/types/employee';
import {CreateEmployeeDto, UpdateEmployeeDto} from '@/shared/dto/employeeDto';

export const employeesApi = {
  getAllEmployees: () => axiosClient.get<Employee[]>('/employees'),
  // getEmployeeById = (id: number) => axiosEmployee.get<Employee>(`/clients/${id}`),
  createEmployee: (employee: CreateEmployeeDto) => axiosClient.post<Employee>('/employees', employee),
  updateEmployee: (id: number, employee: UpdateEmployeeDto) => axiosClient.patch<Employee>(`/employees/${id}`, employee),
  deleteEmployee: (id: number) => axiosClient.delete(`/employees/${id}`)
}
