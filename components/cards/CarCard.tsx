// components/CarCard.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Car } from '@/shared/types/car';
import Card from './Card';
import {useCars} from '@/store/CarContext';
import {useModalFormContext} from '@/store/ModalFormContext';

export default function CarCard({ car }: { car: Car}) {
  const {deleteCar, setSelected} = useCars();
  const modal = useModalFormContext();

  const onEdit = () => {
    setSelected(car)
    modal.open();
  }

  const onDelete = async () => {
    await deleteCar(car.id);
  }

  return (
    <Card onEdit={onEdit} onDelete={onDelete}>
      <Text style={styles.title}>{car.vin}</Text>
      <Text>Цвет: {car.color}</Text>
      <Text>Пробег: {car.mileage} км</Text>
      <Text>Статус: {car.status}</Text>
      <Text>Производитель: {car.manufacturer}</Text>
      <Text>Модель: {car.model}</Text>
      <Text>Версия модели: {car.model_version}</Text>
      <Text>Цена: {car.price} ₽</Text>
      <Text>Дата производства: {new Date(car.arrival_date).toDateString()}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});
