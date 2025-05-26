import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ReactElement, ReactNode, useEffect, useState} from 'react';
import {COLORS} from '@/shared/const/colors';
import ModalForm from '@/components/forms/ModalForm';

type ShowDataScreenProps = {
  items: any[];
  loading: boolean;
  renderCard: (item: any) => ReactElement | null;
  modalTitle?: string;
  concreteModalForm?: ReactNode;
  modalControl: {
    isVisible: boolean;
    open: () => void;
    close: () => void;
  };
};

export default function ShowDataScreen({
                                         items,
                                         loading,
                                         renderCard,
                                         concreteModalForm,
                                         modalTitle = 'Новый элемент',
                                         modalControl,
                                       }: ShowDataScreenProps) {

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderCard(item)}
      />
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={modalControl.open}>
          <Text style={styles.buttonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
      <ModalForm visible={modalControl.isVisible} onClose={modalControl.close} title={modalTitle}>
        {concreteModalForm}
      </ModalForm>
    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.buttonPrimaryColor,
    fontSize: 18,
    padding: 16,
    borderRadius: 8,
    width: "75%",
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 3 },
    elevation: 3,
  },
  bottom: {
    width: "100%",
    height: "12%",
    backgroundColor: COLORS.greyBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
  }
})
