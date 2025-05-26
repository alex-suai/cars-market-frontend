import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import {Client} from '@/shared/types/client';
import {useModalFormContext} from '@/store/ModalFormContext';
import {useClients} from '@/store/ClientContext';

export default function ClientCard({ client }: { client: Client }) {
  const modal = useModalFormContext();
  const {deleteClient, setSelected} = useClients();

  const onEdit = () => {
    setSelected(client);
    modal.open();
  }
  const onDelete = async () => {
    await deleteClient(client.id);
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
