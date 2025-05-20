import CarCard from "@/components/CarCard";
import { useCars } from "@/store/CarContext";
import { FlatList, Text } from "react-native";

export default function CarsScreen() {
    const { items, loading } = useCars();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CarCard car={item} />}
    />
  );
}
