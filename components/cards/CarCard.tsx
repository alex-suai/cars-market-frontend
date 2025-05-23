// components/CarCard.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Car } from '@/shared/types/car';
import Card from './Card';

export default function CarCard({ car }: { car: Car }) {
  const onEdit = () => {

  }
  const onDelete = () => {

  }

  return (
    <Card onEdit={onEdit} onDelete={onDelete}>
      <Text style={styles.title}>{car.vin}</Text>
      <Text>Цвет: {car.color}</Text>
      <Text>Пробег: {car.mileage} км</Text>
      <Text>Цена: {car.price} ₽</Text>
      <Text>Статус: {car.status}</Text>
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
