import React from 'react';
import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

type CardProps = {
  children: React.ReactNode;
  onDelete?: () => void;
  onEdit?: () => void;
  style?: ViewStyle;
  accentColor?: string;
};

export default function Card({
                               children,
                               style,
                               onDelete,
                               onEdit,
                               accentColor = '#007aff',
                             }: CardProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.accentBorder, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <View style={styles.infoZone}>{children}</View>
        <View style={styles.buttonsZone}>
          {onEdit && (
            <TouchableOpacity style={styles.iconWrapper} onPress={onEdit}>
              <Feather name="edit-2" size={20} color="#333" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity style={styles.iconWrapper} onPress={onDelete}>
              <AntDesign name="delete" size={20} color="#e53935" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  accentBorder: {
    width: 5,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoZone: {
    flex: 1,
    paddingRight: 12,
  },
  buttonsZone: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    marginVertical: 4,
  },
});
