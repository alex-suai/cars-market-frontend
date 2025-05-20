import CarCard from "@/components/cards/CarCard";
import { useCars } from "@/store/CarContext";
import {useNavigation} from 'expo-router';
import {useEffect} from 'react';
import ShowDataScreen from '@/components/ShowDataScreen';

export const options = {
  title: 'Автомобили',
};

export default function CarsScreen() {
    const { items, loading } = useCars();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: 'Автомобили'});
  }, [navigation]);

  return (
    <ShowDataScreen
      items={items}
      loading={loading}
      renderCard={(car) => <CarCard car={car} />}
    />
  );
}
