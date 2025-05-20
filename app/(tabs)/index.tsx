// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в Car Market</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
});
