// screens/HomeScreen.tsx
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link, useNavigation} from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Магазин автомобилей</Text>
      <Link href={'/cars'} style={styles.link}>Автомобили</Link>
      <Link href={'/clients'} style={styles.link}>Клиенты</Link>
      <Link href={'/contracts'} style={styles.link}>Контракты</Link>
      <Link href={'/sales'} style={styles.link}>Продажи</Link>
      <Link href={'/'} style={styles.link}>Скидки</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    textAlign: 'center',
    width: "75%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5
  }
});
