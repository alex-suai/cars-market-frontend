// components/Card.tsx
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

type CardProps = {
  children: React.ReactNode;
  onDelete?: () => void;
  onEdit?: () => void;
  style?: ViewStyle;
};

export default function Card({ children, style, onDelete, onEdit }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.infoZone}>
        {children}
      </View>
      <View style={styles.buttonsZone}>
        {onEdit && <Feather onPress={onEdit} name="edit-2" size={24} color="black" />}
        {onDelete && <AntDesign onPress={onDelete} name="delete" size={24} color="black" />}
      </View>
    </View>);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
    minHeight: 100
  },
  infoZone: {
    flex: 1
  },
  buttonsZone: {
    flexDirection: 'column',
    width: "15%",
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
