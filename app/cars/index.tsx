import CarCard from "@/components/cards/CarCard";
import { useCars } from "@/store/CarContext";
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import ShowDataScreen from '@/components/ShowDataScreen';
import CarForm from '@/components/forms/CarForm';
import {CreateCarDto, UpdateCarDto} from '@/shared/dto/carDto';
import {useModalFormContext} from '@/store/ModalFormContext';
import {Cancel} from 'axios';

export default function CarsScreen() {
  const store = useCars();
  const navigation = useNavigation();
  const modal = useModalFormContext();

  useEffect(() => {
    navigation.setOptions({ title: 'Автомобили' });
  }, [navigation]);

  useEffect(() => {
    store.fetchCars();
  }, []);

  const handleSubmit = async (data: UpdateCarDto) => {
    if (store.selected !== null){
      await store.updateCar(store.selected.id, data);
      store.setSelected(null);
    }else{
      await store.createCar(data as CreateCarDto);
    }
    modal.close();
  };

  const handleCancel = () => {
    modal.close();
    store.setSelected(null)
  }

  return (
    <ShowDataScreen
      items={store.items}
      loading={store.loading}
      renderCard={(car) => <CarCard car={car}/>}
      modalTitle={store.selected ? "Редактировать машину" : "Добавить машину"}
      concreteModalForm={<CarForm onSubmit={handleSubmit} />}
      modalControl={{...modal, close: handleCancel} }// <-- прокинем сюда управление
    />
  );
}
