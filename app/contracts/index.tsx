import {useContracts} from '@/store/ContractContext';
import ContractCard from '@/components/cards/ContractCard';
import {useNavigation} from 'expo-router';
import {useEffect} from 'react';
import ShowDataScreen from '@/components/ShowDataScreen';

export const options = {
  title: 'Контракты',
};

export default function ContractsScreen() {
  const { items, loading } = useContracts();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: 'Контракты'});
  }, [navigation]);

  return (
    <ShowDataScreen
      items={items}
      loading={loading}
      renderCard={(contract) => <ContractCard contract={contract} />}
    />
  );
}
