import {useDiscounts} from '@/store/DiscountContext';
import {useNavigation} from 'expo-router';
import {useEffect} from 'react';
import {useModalForm} from '@/shared/utils/useModalForm';
import {DiscountDto} from '@/shared/dto';
import ShowDataScreen from '@/components/ShowDataScreen';
import ContractCard from '@/components/cards/ContractCard';
import ContractForm from '@/components/forms/ContractForm';
import DiscountCard from '@/components/cards/DiscountCard';
import DiscountForm from '@/components/forms/DiscountForm';
import {useModalFormContext} from '@/store/ModalFormContext';

export default function DiscountsScreen() {
  const store = useDiscounts();
  const navigation = useNavigation();
  const modal = useModalFormContext();

  const handleSubmit = async (data: DiscountDto) => {
    if (store.selected !== null){
      await store.updateDiscount(store.selected.id, data);
      store.setSelected(null);
    }else{
      await store.createDiscount(data);
    }
    modal.close();
  };

  useEffect(() => {
    store.fetchDiscounts();
  }, []);

  useEffect(() => {
    navigation.setOptions({title: 'Скидки'});
  }, [navigation]);

  const handleCancel = () => {
    modal.close();
    store.setSelected(null)
  }

  return (
    <ShowDataScreen
      items={store.items}
      loading={store.loading}
      renderCard={(discount) => <DiscountCard discount={discount} />}
      modalTitle="Добавить скидку"
      concreteModalForm={<DiscountForm onSubmit={handleSubmit} />}
      modalControl={{...modal, close: handleCancel}} // <-- прокинем сюда управление
    />
  )
}
