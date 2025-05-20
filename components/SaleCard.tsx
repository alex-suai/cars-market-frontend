// components/CarCard.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import {Sale} from '@/types/sale';

export default function SaleCard({ sale }: { sale: Sale }) {
  return (
    <Card>
      <Text style={styles.title}>{sale.contractNumber}</Text>
      <Text>Выручка: {sale.profit}</Text>
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
