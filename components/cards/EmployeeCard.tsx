// EmployeeCard.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from './Card';
import { Employee } from '@/shared/types/employee';
import { useModalFormContext } from '@/store/ModalFormContext';
import { useEmployees } from '@/store/EmployeeContext';

type Props = {
  employee: Employee;
};

export default function EmployeeCard({ employee }: Props) {
  const modal = useModalFormContext();
  const { deleteEmployee, setSelected } = useEmployees();

  const onEdit = () => {
    setSelected(employee);
    modal.open();
  };

  const onDelete = async () => {
    await deleteEmployee(employee.id);
  };

  return (
    <Card onEdit={onEdit} onDelete={onDelete}>
      <Text style={styles.title}>{employee.name} {employee.surname}</Text>
      <Text>Должность: {employee.profession}</Text>
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
