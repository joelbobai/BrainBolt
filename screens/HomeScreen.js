import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { CATEGORY_LABELS } from '../data';
import styles from '../styles/styles';

const categories = ['science', 'art', 'sport'];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, styles.centered]}>
      <View style={styles.card}>
        <Text style={styles.title}>BrainBolt</Text>
        <Text style={styles.subtitle}>Select a category to begin</Text>

        {categories.map((categoryKey) => (
          <TouchableOpacity
            key={categoryKey}
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Quiz', { category: categoryKey })}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>{CATEGORY_LABELS[categoryKey]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
