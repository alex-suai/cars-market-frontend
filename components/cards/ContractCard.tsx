// components/CarCard.tsx
import React, {useEffect} from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import {Contract} from '@/shared/types/contract';
import {useModalFormContext} from '@/store/ModalFormContext';
import {useContracts} from '@/store/ContractContext';

export default function ContractCard({ contract }: { contract: Contract }) {
  const modal = useModalFormContext();
  const {deleteContract, setSelected} = useContracts();

  const onEdit = () => {
    setSelected(contract);
    modal.open();
  }
  const onDelete = async () => {
    await deleteContract(contract.id);
  }

  return (
    <Card onEdit={onEdit} onDelete={onDelete}>
      <Text style={styles.title}>{contract.contract_number}</Text>
      <Text>Версия модели: {contract.car_model_version}</Text>
      <Text>Вин номер авто: {contract.car_vin}</Text>
      <Text>Клиент: {contract.client_name}</Text>
      <Text>Менеджер: {contract.manager}</Text>
      <Text>Стоимость: {Number(contract.total_amount).toFixed(2)} ₽</Text>
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
