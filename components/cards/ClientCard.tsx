import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import {Client} from '@/shared/types/client';

export default function ClientCard({ client }: { client: Client }) {
  const onEdit = () => {

  }
  const onDelete = () => {

  }

  return (
    <Card onEdit={onEdit} onDelete={onDelete}>
      <Text style={styles.title}>{client.name} {client.surname}</Text>
      <Text>Почта: {client.email}</Text>
      <Text>Телефон: {client.phone_number}</Text>
      <Text>Количество покупок: {client.sales_amount}</Text>
      <Text>Общие затраты: {client.total_expences} ₽</Text>
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
