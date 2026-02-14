import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, styles.centered]}>
      <View style={styles.card}>
        <Text style={styles.title}>BrainBolt</Text>
        <Text style={styles.subtitle}>Offline General Knowledge Quiz</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Quiz')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
