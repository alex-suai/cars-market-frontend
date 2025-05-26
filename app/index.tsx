import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { router } from 'expo-router';

type LinksType = {
  label: string;
  path: '/cars' | '/clients' | '/contracts' | '/sales' | '/discounts' | '/employees';
}

const links: LinksType[] = [
  { label: '🚗 Автомобили', path: '/cars' },
  { label: '👤 Клиенты', path: '/clients' },
  { label: '📄 Контракты', path: '/contracts' },
  { label: '💰 Продажи', path: '/sales' },
  { label: '🏷️ Скидки', path: '/discounts' },
  { label: '🧑‍💼 Сотрудники', path: '/employees' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏬 Магазин автомобилей</Text>
      <ScrollView contentContainerStyle={styles.linksWrapper} showsVerticalScrollIndicator={false}>
        {links.map(({ label, path }) => (
          <Pressable
            key={path}
            onPress={() => router.push(path)}
            style={({ pressed }) => [
              styles.link,
              pressed && styles.linkPressed
            ]}
          >
            <Text style={styles.linkText}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  linksWrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  link: {
    width: '90%',
    minWidth: '60%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    alignItems: 'center',
  },
  linkPressed: {
    backgroundColor: '#e6f0ff',
  },
  linkText: {
    fontSize: 18,
    color: '#007aff',
    fontWeight: '600',
  },
});
