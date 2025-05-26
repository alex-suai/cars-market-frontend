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
import {CreateCarDto, UpdateCarDto} from '@/shared/dto/carDto';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import {CarsModelVersion} from '@/shared/types/car';
import {carApi} from '@/shared/api/cars';
import {normalizeDate} from '@/shared/utils/dateUtils';
import {useCars} from '@/store/CarContext';

type Props = {
  onSubmit: (data: UpdateCarDto) => void;
};

export default function CarForm({
                                  onSubmit,
                                }: Props) {
  const {selected} = useCars()

  const [vin, setVin] = useState(selected?.vin || '');
  const [modelVersion, setModelVersion] = useState(selected?.model_version || '');
  const [mileage, setMileage] = useState(String(selected?.mileage || ''));
  const [price, setPrice] = useState(String(selected?.price || ''));
  const [color, setColor] = useState(selected?.color || '');
  const [status, setStatus] = useState<CreateCarDto['status']>(selected?.status || 'in_stock');
  const [arrivalDate, setArrivalDate] = useState<Date>(
    selected?.arrival_date ? new Date(selected.arrival_date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [modelVersions, setModelVersions] = useState<CarsModelVersion[]>([])

  useEffect( () => {
    carApi.fetchCarModelVersions().then(response => {
      setModelVersions(response.data);
      if (modelVersion === '') setModelVersion(response.data[0].name)
    });
  }, []);

  const handleSubmit = () => {
    const modelVersionId = modelVersions.find(v => v.name === modelVersion)?.id
    if (vin && modelVersionId && mileage && price && color && status && arrivalDate) {
      onSubmit({
        vin: selected?.vin !== vin ? vin : undefined,
        model_version_id: selected?.model_version !== modelVersion ? modelVersionId : undefined,
        mileage: selected?.mileage !== parseInt(mileage) ? parseInt(mileage) : undefined,
        price: Number(selected?.price).toFixed(2) !== Number(price).toFixed(2) ? parseFloat(price) : undefined,
        color: selected?.color !== color ? color : undefined,
        status: selected?.status !== status ? status : undefined,
        arrival_date: normalizeDate(selected?.arrival_date) !== normalizeDate(arrivalDate) ? arrivalDate : undefined,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>VIN</Text>
      <TextInput
        style={styles.input}
        value={vin}
        onChangeText={setVin}
        placeholder="Введите VIN"
      />

      <Text>Версия модели</Text>
      <Picker selectedValue={modelVersion}
              onValueChange={(itemValue: string) => setModelVersion(itemValue)}
      >
        {modelVersions.map(version => (
          <Picker.Item key={version.id} label={version.name} value={version.name} />
        ))}
      </Picker>

      <Text>Пробег</Text>
      <TextInput
        style={styles.input}
        value={mileage}
        onChangeText={setMileage}
        keyboardType="numeric"
        placeholder="Введите пробег"
      />

      <Text>Цена</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="Введите цену"
      />

      <Text>Цвет</Text>
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="Введите цвет"
      />

      <Text>Статус</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue: CreateCarDto['status']) => setStatus(itemValue as CreateCarDto['status'])}
      >
        <Picker.Item label="В наличии" value="in_stock" />
        <Picker.Item label="Зарезервирован" value="reserved" />
        <Picker.Item label="Продан" value="sold" />
        <Picker.Item label="Заказан" value="ordered" />
      </Picker>

      <Text>Дата поступления</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text>{arrivalDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={arrivalDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            if (date) setArrivalDate(date);
            setShowDatePicker(false);
          }}
        />
      )}

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
