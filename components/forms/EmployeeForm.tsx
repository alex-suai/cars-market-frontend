// EmployeeForm.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UpdateEmployeeDto } from '@/shared/dto/employeeDto';
import { useEmployees } from '@/store/EmployeeContext';

type Props = {
  onSubmit: (data: UpdateEmployeeDto) => void;
};

export default function EmployeeForm({ onSubmit }: Props) {
  const { selected } = useEmployees();

  // Инициализируем стейты значениями выбранного сотрудника (если есть)
  const [firstName, setFirstName] = useState(selected?.name || '');
  const [lastName, setLastName] = useState(selected?.surname || '');
  const [position, setPosition] = useState(selected?.profession || '');

  const handleSubmit = () => {
    const data: UpdateEmployeeDto = {
      name: selected?.name !== firstName ? firstName : undefined,
      surname: selected?.surname !== lastName ? lastName : undefined,
      profession: selected?.profession !== position ? position : undefined,
    };
    onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Text>Имя</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Введите имя"
      />

      <Text>Фамилия</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Введите фамилию"
      />

      <Text>Должность</Text>
      <TextInput
        style={styles.input}
        value={position}
        onChangeText={setPosition}
        placeholder="Введите должность"
      />

      <Button title="Сохранить" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 4,
  },
});
