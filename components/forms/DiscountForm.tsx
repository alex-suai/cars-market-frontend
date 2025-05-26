import React, { useEffect, useState } from 'react';
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

import { useDiscounts } from '@/store/DiscountContext';
import { DiscountDto } from '@/shared/dto';
import {useContracts} from '@/store/ContractContext';
import {SimpleMultiSelect} from '@/components/SimpleMultiSelect';

type Props = {
  onSubmit: (data: DiscountDto) => void;
};

export default function DiscountForm({ onSubmit }: Props) {
  const { selected } = useDiscounts();
  const {items: contracts, fetchContracts} = useContracts()

  const [description, setDescription] = useState(selected?.description || '');
  const [amount, setAmount] = useState(String(selected?.amount) || '');
  const [startDate, setStartDate] = useState<Date>(
    selected?.start_date ? new Date(selected.start_date) : new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    selected?.end_date ? new Date(selected.end_date) : new Date()
  );

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [selectedContractNumbers, setSelectedContractNumbers] = useState<string[]>(
    selected?.contract_numbers || []
  );

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    const selectedContractIds = contracts
      .filter(c => selectedContractNumbers.includes(c.contract_number))
      .map(c => c.id);

    if (
      description &&
      !isNaN(parsedAmount) &&
      startDate &&
      endDate &&
      parsedAmount >= 0 && parsedAmount <= 100
    ) {
      const payload: DiscountDto = {
        description: description,
        amount: parsedAmount,
        start_date: startDate,
        end_date: endDate,
        contract_ids: selectedContractIds
      };

      onSubmit(payload);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Описание</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Введите описание скидки"
      />

      <Text>Размер скидки (%)</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Введите число от 0 до 100"
      />

      <Text>Контракты</Text>
      <SimpleMultiSelect
        contracts={contracts}
        selectedContractNumbers={selectedContractNumbers}
        onSelectionChange={setSelectedContractNumbers}
      />

      <Text>Дата начала</Text>
      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        style={styles.dateButton}
      >
        <Text>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            if (date) setStartDate(date);
            setShowStartPicker(false);
          }}
        />
      )}

      <Text>Дата окончания</Text>
      <TouchableOpacity
        onPress={() => setShowEndPicker(true)}
        style={styles.dateButton}
      >
        <Text>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            if (date) setEndDate(date);
            setShowEndPicker(false);
          }}
        />
      )}

      <Button title="Сохранить" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
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
