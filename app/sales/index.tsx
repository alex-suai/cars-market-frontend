import {Text} from 'react-native';
import {useSales} from '@/store/SaleContext';
import SaleCard from '@/components/cards/SaleCard';
import {useNavigation} from 'expo-router';
import {useEffect} from 'react';
import ShowDataScreen from '@/components/ShowDataScreen';

export default function SalesScreen() {
  const {items, loading} = useSales();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: 'Продажи'});
  }, [navigation]);

  return (
    <ShowDataScreen
      items={items}
      loading={loading}
      renderCard={(sale) => <SaleCard sale={sale} />}
    />
  );
}
