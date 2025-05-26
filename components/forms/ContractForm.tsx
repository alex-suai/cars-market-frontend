import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useContracts } from '@/store/ContractContext';
import { UpdateContractDto } from '@/shared/dto/contractsDto';
import { normalizeDate } from '@/shared/utils/dateUtils';
import {useCars} from '@/store/CarContext';
import {useClients} from '@/store/ClientContext';
import {useEmployees} from '@/store/EmployeeContext';

type Props = {
  onSubmit: (data: UpdateContractDto) => void;
};

export default function ContractForm({ onSubmit }: Props) {
  const { selected } = useContracts();
  const {items: cars, fetchCars} = useCars();
  const {items: clients, fetchClients} = useClients();
  const {items: employees, fetchEmployees} = useEmployees();

  const [client, setClient] = useState(String(selected?.client_name ?? ''));
  const [carVin, setCarVin] = useState(String(selected?.car_vin ?? ''));
  const [manager, setManager] = useState(String(selected?.manager ?? ''));
  const [contractNumber, setContractNumber] = useState(selected?.contract_number ?? '');
  const [signingDate, setSigningDate] = useState<Date>(
    selected?.signing_date ? new Date(selected.signing_date) : new Date()
  );
  const [showSigningPicker, setShowSigningPicker] = useState(false);

  const [cancellationDate, setCancellationDate] = useState<Date | undefined>(
    selected?.cancellation_date ? new Date(selected.cancellation_date) : undefined
  );
  const [showCancellationPicker, setShowCancellationPicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(selected?.payment_method ?? 'cash');
  const [status, setStatus] = useState(selected?.status ?? 'pending');

  useEffect(() => {
    fetchCars().then(() => {
      fetchClients().then(() => {
        fetchEmployees().then(() => {
          if (!selected) {
            setCarVin(cars[0].vin)
            setManager(employees[0].name)
            setClient(clients[0].name)
          }
        })
      })
    });
  }, []);

  const handleSubmit = () => {
    const clientId = clients.find(c => c.name === client)?.id;
    const managerId = employees.find(e => e.name === manager)?.id;
    const carId = cars.find(c => c.vin === carVin)?.id;

    const data: UpdateContractDto = {
      clientId: selected?.client_name !== client ? clientId : undefined,
      carId: selected?.car_vin !== carVin ? carId : undefined,
      managerId: selected?.manager !== manager ? managerId : undefined,
      contract_number: selected?.contract_number !== contractNumber ? contractNumber : undefined,
      signing_date:
        normalizeDate(selected?.signing_date) !== normalizeDate(signingDate)
          ? signingDate
          : undefined,
      cancellation_date:
        normalizeDate(selected?.cancellation_date) !== normalizeDate(cancellationDate)
          ? cancellationDate
          : undefined,
      payment_method: selected?.payment_method !== paymentMethod ? paymentMethod : undefined,
      status: selected?.status !== status ? status : undefined,
    };

    onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Text>Имя клиента</Text>
      <Picker selectedValue={client}
              onValueChange={(itemValue: string) => setClient(itemValue)}
      >
        {clients.map(c => (
          <Picker.Item key={c.id} label={c.name} value={c.name} />
        ))}
      </Picker>

      <Text>VIN номер машины</Text>
      <Picker selectedValue={carVin}
              onValueChange={(itemValue: string) => setCarVin(itemValue)}
      >
        {cars.map(c => (
          <Picker.Item key={c.id} label={c.vin} value={c.vin} />
        ))}
      </Picker>

      <Text>Имя менеджера</Text>
      <Picker selectedValue={manager}
              onValueChange={(itemValue: string) => setManager(itemValue)}
      >
        {employees
          .filter(e => e.profession === 'Менеджер')
          .map(c => (<Picker.Item key={c.id} label={c.name} value={c.name} />))
        }
      </Picker>

      <Text>Номер контракта</Text>
      <TextInput
        style={styles.input}
        value={contractNumber}
        onChangeText={setContractNumber}
        placeholder="Введите номер контракта"
      />

      <Text>Дата подписания</Text>
      <TouchableOpacity onPress={() => setShowSigningPicker(true)} style={styles.dateButton}>
        <Text>{signingDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showSigningPicker && (
        <DateTimePicker
          value={signingDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            if (date) setSigningDate(date);
            setShowSigningPicker(false);
          }}
        />
      )}

      <Text>Дата отмены (необязательно)</Text>
      <TouchableOpacity onPress={() => setShowCancellationPicker(true)} style={styles.dateButton}>
        <Text>{cancellationDate ? cancellationDate.toLocaleDateString() : 'Выбрать дату'}</Text>
      </TouchableOpacity>
      {showCancellationPicker && (
        <DateTimePicker
          value={cancellationDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            setCancellationDate(date || undefined);
            setShowCancellationPicker(false);
          }}
        />
      )}

      <Text>Метод оплаты</Text>
      <Picker selectedValue={paymentMethod} onValueChange={val => setPaymentMethod(val)}>
        <Picker.Item label="Наличные" value="cash" />
        <Picker.Item label="Кредит" value="credit" />
        <Picker.Item label="Лизинг" value="leasing" />
      </Picker>

      <Text>Статус</Text>
      <Picker selectedValue={status} onValueChange={val => setStatus(val)}>
        <Picker.Item label="Подписан" value="signed" />
        <Picker.Item label="Отменён" value="canceled" />
        <Picker.Item label="В ожидании" value="pending" />
      </Picker>

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
  dateButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
  },
});
