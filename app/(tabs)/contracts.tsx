import { FlatList, Text } from "react-native";
import {useContracts} from '@/store/ContractContext';
import ContractCard from '@/components/ContractCard';

export default function ContractsScreen() {
  const { items, loading } = useContracts();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ContractCard contract={item} />}
    />
  );
}
