// EmployeesScreen.tsx
import { useEmployees } from '@/store/EmployeeContext';
import EmployeeCard from '@/components/cards/EmployeeCard';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import ShowDataScreen from '@/components/ShowDataScreen';
import EmployeeForm from '@/components/forms/EmployeeForm';
import { useModalFormContext } from '@/store/ModalFormContext';
import { CreateEmployeeDto, UpdateEmployeeDto } from '@/shared/dto/employeeDto';

export default function EmployeesScreen() {
  const store = useEmployees();
  const navigation = useNavigation();
  const modal = useModalFormContext();

  const handleSubmit = async (data: UpdateEmployeeDto) => {
    if (store.selected !== null) {
      await store.updateEmployee(store.selected.id, data);
      store.setSelected(null);
    } else {
      await store.createEmployee(data as CreateEmployeeDto);
    }
    modal.close();
  };

  useEffect(() => {
    store.fetchEmployees();
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: 'Сотрудники' });
  }, [navigation]);

  const handleCancel = () => {
    modal.close();
    store.setSelected(null);
  };

  return (
    <ShowDataScreen
      items={store.items}
      loading={store.loading}
      renderCard={(employee) => <EmployeeCard employee={employee} />}
      modalTitle="Добавить сотрудника"
      concreteModalForm={<EmployeeForm onSubmit={handleSubmit} />}
      modalControl={{ ...modal, close: handleCancel }}
      />
    );
}
