import { FlatList, Text } from "react-native";
import {useSales} from '@/store/SaleContext';
import SaleCard from '@/components/SaleCard';

export default function SalesScreen() {
  const { items, loading } = useSales();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <SaleCard sale={item} />}
    />
  );
}
