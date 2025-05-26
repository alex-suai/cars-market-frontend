import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import {Contract} from '@/shared/types';

type Props = {
  contracts: Contract[];
  selectedContractNumbers: string[];
  onSelectionChange: (selectedIds: string[]) => void;
};

export function SimpleMultiSelect({ contracts, selectedContractNumbers, onSelectionChange }: Props) {
  const toggleSelection = (id: string) => {
    if (selectedContractNumbers.includes(id)) {
      onSelectionChange(selectedContractNumbers.filter((item) => item !== id));
    } else {
      onSelectionChange([...selectedContractNumbers, id]);
    }
  };

  const renderItem = ({ item }: { item: Contract }) => {
    const selected = selectedContractNumbers.includes(item.contract_number);
    return (
      <TouchableOpacity style={styles.item} onPress={() => toggleSelection(item.contract_number)}>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text>{`Контракт ${item.contract_number}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={contracts}
      keyExtractor={(item) => item.contract_number}
      renderItem={renderItem}
      extraData={selectedContractNumbers}
    />
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
