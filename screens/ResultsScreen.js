import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORY_LABELS } from '../data';
import styles from '../styles/styles';

const HIGH_SCORE_KEY = 'brainbolt_high_score';

export default function ResultsScreen({ navigation, route }) {
  const { score, totalQuestions, category = 'science' } = route.params;
  const [highScore, setHighScore] = useState(0);

  const percent = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    const persistHighScore = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        const storedHighScore = storedValue ? Number(storedValue) : 0;

        const updatedHighScore = Math.max(storedHighScore, score);
        setHighScore(updatedHighScore);

        if (updatedHighScore !== storedHighScore) {
          await AsyncStorage.setItem(HIGH_SCORE_KEY, String(updatedHighScore));
        }
      } catch (error) {
        setHighScore(score);
      }
    };

    persistHighScore();
  }, [score]);

  return (
    <SafeAreaView style={[styles.container, styles.centered]}>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Category: {CATEGORY_LABELS[category]}</Text>
        <Text style={styles.scoreText}>
          Score: {score} / {totalQuestions}
        </Text>
        <Text style={styles.percentText}>Percent: {percent}%</Text>
        <Text style={styles.highScoreText}>High Score: {highScore}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('Quiz', { category })}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.replace('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Back to Categories</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
