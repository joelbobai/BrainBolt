import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORY_LABELS } from '../data';
import styles from '../styles/styles';

const HIGH_SCORE_KEY = 'brainbolt_high_score';

export default function ResultsScreen({ navigation, route }) {
  const {
    score,
    totalQuestions,
    category = 'science',
    difficulty = 'normal',
    isPracticeMode = false,
    questionCount = 20,
    isDailyChallenge = false,
    bestStreak = 0,
  } = route.params;

  const [highScore, setHighScore] = useState(0);

  const percent = Math.round((score / totalQuestions) * 100);

  const performanceLabel = useMemo(() => {
    if (percent >= 90) return 'Legendary';
    if (percent >= 75) return 'Excellent';
    if (percent >= 60) return 'Solid';
    if (percent >= 40) return 'Keep Practicing';
    return 'Fresh Start';
  }, [percent]);

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
        <Text style={styles.quizMetaText}>Best Streak: {bestStreak}</Text>
        <Text style={styles.quizMetaText}>Difficulty: {difficulty}</Text>
        <Text style={styles.quizMetaText}>Mode: {isPracticeMode ? 'Practice' : 'Timed'}</Text>
        <Text style={styles.quizMetaText}>Question Count: {questionCount}</Text>
        {isDailyChallenge ? <Text style={styles.challengeBadge}>Daily Challenge Completed</Text> : null}
        <Text style={styles.performanceText}>Rank: {performanceLabel}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            navigation.replace('Quiz', {
              category,
              difficulty,
              isPracticeMode,
              questionCount,
              timerSeconds: difficulty === 'easy' ? 45 : difficulty === 'hard' ? 20 : 30,
            })
          }
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Retry Same Settings</Text>
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
