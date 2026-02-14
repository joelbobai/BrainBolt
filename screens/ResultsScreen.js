import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/styles';

const HIGH_SCORE_KEY = 'brainbolt_high_score';

export default function ResultsScreen({ navigation, route }) {
  const { score, totalQuestions } = route.params;
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
        // Fallback to current score if storage isn't available for any reason.
        setHighScore(score);
      }
    };

    persistHighScore();
  }, [score]);

  return (
    <SafeAreaView style={[styles.container, styles.centered]}>
      <View style={styles.card}>
        <Text style={styles.scoreText}>
          Score: {score} / {totalQuestions}
        </Text>
        <Text style={styles.percentText}>Percent: {percent}%</Text>
        <Text style={styles.highScoreText}>High Score: {highScore}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('Quiz')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
