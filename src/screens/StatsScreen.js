// src\screens\StatsScreen.js

import { StyleSheet, Text, View } from 'react-native';

const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваша статистика</Text>
      <Text style={styles.placeholder}>Здесь будет отображаться ваш прогресс</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#FF9800',
  },
});

export default StatsScreen;
