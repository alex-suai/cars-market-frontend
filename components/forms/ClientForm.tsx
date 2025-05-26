import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { UpdateClientDto } from '@/shared/dto/clientsDto';
import {useClients} from '@/store/ClientContext';

type Props = {
  onSubmit: (data: UpdateClientDto) => void;
};

export default function ClientForm({ onSubmit }: Props) {
  const { selected } = useClients();

  const [name, setName] = useState(selected?.name || '');
  const [surname, setSurname] = useState(selected?.surname || '');
  const [phoneNumber, setPhoneNumber] = useState(selected?.phone_number || '');
  const [email, setEmail] = useState(selected?.email || '');

  const handleSubmit = () => {
    const data: UpdateClientDto = {
      name: selected?.name !== name ? name : undefined,
      surname: selected?.surname !== surname ? surname : undefined,
      phone_number: selected?.phone_number !== phoneNumber ? phoneNumber : undefined,
      email: selected?.email !== email ? email : undefined,
    };

    onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Text>Имя</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Введите имя"
      />

      <Text>Фамилия</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
        placeholder="Введите фамилию"
      />

      <Text>Номер телефона</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Введите номер телефона"
        keyboardType="phone-pad"
        textContentType={'telephoneNumber'}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Введите email"
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType={'emailAddress'}
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
