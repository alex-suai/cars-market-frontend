import {useClients} from '@/store/ClientContext';
import ClientCard from '@/components/cards/ClientCard';
import {useNavigation} from 'expo-router';
import {useEffect} from 'react';
import ShowDataScreen from '@/components/ShowDataScreen';

export const options = {
  title: 'Клиенты',
};

export default function ClientsScreen() {
  const { items, loading } = useClients();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: 'Клиенты'});
  }, [navigation]);

  return (
    <ShowDataScreen
      items={items}
      loading={loading}
      renderCard={(client) => <ClientCard client={client} />}
    />
  );
}
