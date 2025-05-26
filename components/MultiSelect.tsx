import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type MultiSelectProps<T> = {
  items: T[];
  selectedIds: string[];
  onSelectionChange: (selected: string[]) => void;
  getId: (item: T) => string;
  renderItemLabel: (item: T) => string;
};

export function MultiSelect<T>({
                                 items,
                                 selectedIds,
                                 onSelectionChange,
                                 getId,
                                 renderItemLabel,
                               }: MultiSelectProps<T>) {
  const toggle = (item: T) => {
    const id = getId(item);
    const updated = selectedIds.includes(id)
      ? selectedIds.filter(i => i !== id)
      : [...selectedIds, id];
    onSelectionChange(updated);
  };

  return (
    <>
      {items.map(item => {
        const id = getId(item);
        const selected = selectedIds.includes(id);
        return (
          <TouchableOpacity key={id} style={styles.item} onPress={() => toggle(item)}>
            <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
              {selected && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text>{renderItemLabel(item)}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#aaa',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
});
