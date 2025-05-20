// components/CarCard.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import {Contract} from '@/types/contract';

export default function ContractCard({ contract }: { contract: Contract }) {
  return (
    <Card>
      <Text style={styles.title}>{contract.contract_number}</Text>
      <Text>Версия модели: {contract.carModelVersion}</Text>
      <Text>Вин номер авто: {contract.carVin} км</Text>
      <Text>Клиент: {contract.clientName} ₽</Text>
      <Text>Менеджер: {contract.manager}</Text>
      <Text>Стоимость: {contract.total_amount}</Text>
      <Text>Метод оплаты: {contract.payment_method}</Text>
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
