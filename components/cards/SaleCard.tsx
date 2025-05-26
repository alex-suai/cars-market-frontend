// components/CarCard.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import {Sale} from '@/shared/types/sale';
import {useSales} from '@/store/SaleContext';

export default function SaleCard({ sale }: { sale: Sale }) {
  const {deleteSale} = useSales();

  const onDelete = async () => {
    await deleteSale(sale.id);
  }

  return (
    <Card onDelete={onDelete}>
      <Text style={styles.title}>{sale.contract_number}</Text>
      <Text>Автомобиль: {sale.car_vin}</Text>
      <Text>Выручка: {sale.profit} ₽</Text>
      <Text>Налог: {sale.tax_sum} км</Text>
      <Text>Скидка: {sale.discount_amount} ₽</Text>
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
