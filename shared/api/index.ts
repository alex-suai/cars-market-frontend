import {carApi} from '@/shared/api/cars';
import {clientApi} from '@/shared/api/clients';
import {employeesApi} from '@/shared/api/employees';
import {contractsApi} from '@/shared/api/contracts';
import {salesApi} from '@/shared/api/sales';
import {discountsApi} from '@/shared/api/discounts';

export const api = {
  carsApi: carApi,
  clientsApi: clientApi,
  employeesApi: employeesApi,
  contractsApi: contractsApi,
  salesApi: salesApi,
  discountsApi: discountsApi,
}