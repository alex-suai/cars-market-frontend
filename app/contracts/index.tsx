import {useContracts} from '@/store/ContractContext';
import ContractCard from '@/components/cards/ContractCard';
import {useNavigation} from 'expo-router';
import {useEffect} from 'react';
import ShowDataScreen from '@/components/ShowDataScreen';
import ContractForm from '@/components/forms/ContractForm';
import {useModalForm} from '@/shared/utils/useModalForm';
import {CreateContractDto, UpdateContractDto} from '@/shared/dto/contractsDto';
import {useModalFormContext} from '@/store/ModalFormContext';

export default function ContractsScreen() {
  const store = useContracts();
  const navigation = useNavigation();
  const modal = useModalFormContext();

  const handleSubmit = async (data: UpdateContractDto) => {
    if (store.selected !== null){
      await store.updateContract(store.selected.id, data);
      store.setSelected(null);
    }else{
      await store.createContract(data as CreateContractDto);
    }
    modal.close();
  };

  useEffect(() => {
    store.fetchContracts();
  }, []);

  useEffect(() => {
    navigation.setOptions({title: 'Контракты'});
  }, [navigation]);

  const handleCancel = () => {
    modal.close();
    store.setSelected(null)
  }

  return (
    <ShowDataScreen
      items={store.items}
      loading={store.loading}
      renderCard={(contract) => <ContractCard contract={contract} />}
      modalTitle="Добавить контракт"
      concreteModalForm={<ContractForm onSubmit={handleSubmit} />}
      modalControl={{...modal, close: handleCancel}} // <-- прокинем сюда управление
    />
  );
}
