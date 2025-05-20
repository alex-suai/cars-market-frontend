import { CarsProvider } from "@/store/CarContext";
import { Stack } from "expo-router";
import {ClientsProvider} from '@/store/ClientContext';
import {ContractsProvider} from '@/store/ContractContext';
import {SalesProvider} from '@/store/SaleContext';
import {COLORS} from '@/shared/const/colors';

export default function RootLayout() {
  return (
    <CarsProvider>
      <ClientsProvider>
        <ContractsProvider>
          <SalesProvider>
            <Stack screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.greyBackgroundColor,
              },
            }}/>
          </SalesProvider>
        </ContractsProvider>
      </ClientsProvider>
    </CarsProvider>
  )
  
  
}
