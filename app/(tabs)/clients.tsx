import { FlatList, Text } from "react-native";
import {useClients} from '@/store/ClientContext';
import ClientCard from '@/components/ClientCard';

export default function ClientsScreen() {
  const { items, loading } = useClients();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ClientCard client={item} />}
    />
  );
}
