import { Tabs } from 'expo-router';
import {CarsProvider} from '@/store/CarContext';
import {ClientsProvider} from '@/store/ClientContext';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <CarsProvider>
        <Tabs.Screen name="cars" options={{ title: 'Cars' }} />
      </CarsProvider>
      <ClientsProvider>
        <Tabs.Screen name={"clients"} options={{ title: 'Clients' }} />
      </ClientsProvider>
    </Tabs>
  );
}