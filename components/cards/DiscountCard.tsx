import {useModalFormContext} from '@/store/ModalFormContext';
import Card from '@/components/cards/Card';
import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Discount} from '@/shared/types';
import {useDiscounts} from '@/store/DiscountContext';

export default function DiscountCard({ discount }: { discount: Discount }) {
  const modal = useModalFormContext();
  const {deleteDiscount, setSelected} = useDiscounts();

  const onEdit = () => {
    setSelected(discount);
    modal.open();
  }
  const onDelete = async () => {
    await deleteDiscount(discount.id);
  }

  return (
    <Card onEdit={onEdit} onDelete={onDelete} accentColor={'#461db0'}>
      <Text style={styles.title}>Скидка {discount.id}</Text>
      <Text>Описание: {discount.description}</Text>
      <Text>Начало действия: {new Date(discount.start_date).toDateString()}</Text>
      <Text>Конец действия: {new Date(discount.end_date).toDateString()}</Text>
      <Text>Размер скидки: {Number(discount.amount).toFixed()}</Text>
      {discount.contract_numbers.length > 0 && (
        <>
          <Text>Контракты:</Text>
          {discount.contract_numbers.map((number, index) => (
            <Text key={index} style={{ marginLeft: 10 }}>- {number}</Text>
          ))}
        </>
      )}
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