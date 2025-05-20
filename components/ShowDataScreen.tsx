import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from 'expo-router';
import {ReactElement, useEffect} from 'react';
import {COLORS} from '@/shared/const/colors';

type ShowDataScreenProps = {
  items: any[];
  loading: boolean;
  renderCard: (item: any) => ReactElement | null;
}

export default function ShowDataScreen({items, loading, renderCard}: ShowDataScreenProps) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: 'Продажи'});
  }, [navigation]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderCard(item)}
      />
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button}>Добавить</TouchableOpacity>
      </View>
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
    textAlign: "center",
  },
  bottom: {
    width: "100%",
    height: "12%",
    justifyContent: 'center',
    alignItems: 'center',
  }
})
