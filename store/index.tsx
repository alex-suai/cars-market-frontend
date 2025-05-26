import {CarsProvider} from '@/store/CarContext';
import {ClientsProvider} from '@/store/ClientContext';
import {ContractsProvider} from '@/store/ContractContext';
import {SalesProvider} from '@/store/SaleContext';
import {EmployeesProvider} from '@/store/EmployeeContext';
import {DiscountsProvider} from '@/store/DiscountContext';
import {ModalFormProvider} from '@/store/ModalFormContext';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

export function AppProviders({ children }: Props) {
  return (
    <CarsProvider>
      <ClientsProvider>
        <ContractsProvider>
          <SalesProvider>
            <EmployeesProvider>
              <DiscountsProvider>
                <ModalFormProvider>
                  {children}
                </ModalFormProvider>
              </DiscountsProvider>
            </EmployeesProvider>
          </SalesProvider>
        </ContractsProvider>
      </ClientsProvider>
    </CarsProvider>
  );
}