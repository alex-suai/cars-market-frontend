import {useClients} from '@/store/ClientContext';
import ClientCard from '@/components/cards/ClientCard';
import {useNavigation} from 'expo-router';
import {useEffect} from 'react';
import ShowDataScreen from '@/components/ShowDataScreen';
import CarForm from '@/components/forms/CarForm';
import {useModalForm} from '@/shared/utils/useModalForm';
import {CreateCarDto, UpdateCarDto} from '@/shared/dto/carDto';
import {CreateClientDto, UpdateClientDto} from '@/shared/dto/clientsDto';
import ClientForm from '@/components/forms/ClientForm';
import {useModalFormContext} from '@/store/ModalFormContext';

export default function ClientsScreen() {
  const store = useClients();
  const navigation = useNavigation();
  const modal = useModalFormContext();

  const handleSubmit = async (data: UpdateClientDto) => {
    if (store.selected !== null){
      await store.updateClient(store.selected.id, data);
      store.setSelected(null);
    }else{
      await store.createClient(data as CreateClientDto);
    }
    modal.close();
  };

  useEffect(() => {
    store.fetchClients();
  }, []);

  useEffect(() => {
    navigation.setOptions({title: 'Клиенты'});
  }, [navigation]);

  const handleCancel = () => {
    modal.close();
    store.setSelected(null)
  }

  return (
    <ShowDataScreen
      items={store.items}
      loading={store.loading}
      renderCard={(client) => <ClientCard client={client} />}
      modalTitle="Добавить клиента"
      concreteModalForm={<ClientForm onSubmit={handleSubmit} />}
      modalControl={{...modal, close: handleCancel}} // <-- прокинем сюда управление
    />
  );
}
