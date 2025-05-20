import { CarsProvider } from "@/store/CarContext";
import { Stack } from "expo-router";
import {ClientsProvider} from '@/store/ClientContext';

export default function RootLayout() {
  return (
    <CarsProvider>
      <ClientsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>;
      </ClientsProvider>
    </CarsProvider>
  )
  
  
}
