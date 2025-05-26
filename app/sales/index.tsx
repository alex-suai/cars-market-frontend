import {FlatList, Text} from 'react-native';
import {useSales} from '@/store/SaleContext';
import SaleCard from '@/components/cards/SaleCard';
import {useNavigation} from 'expo-router';
import {useEffect} from 'react';

export default function SalesScreen() {
  const {items, loading, fetchSales} = useSales();
  const navigation = useNavigation();

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    navigation.setOptions({title: 'Продажи'});
  }, [navigation]);

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <SaleCard sale={item}/>}
    />
  );
}
