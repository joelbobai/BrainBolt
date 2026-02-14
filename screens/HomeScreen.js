import React, { useMemo, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { CATEGORY_LABELS } from '../data';
import styles from '../styles/styles';

const categories = ['science', 'art', 'sport'];
const difficultyOptions = [
  { key: 'easy', label: 'Easy', timerSeconds: 45 },
  { key: 'normal', label: 'Normal', timerSeconds: 30 },
  { key: 'hard', label: 'Hard', timerSeconds: 20 },
];
const questionCountOptions = [5, 10, 20];

const getDailyChallengeCategory = () => {
  const daySeed = new Date().toISOString().slice(0, 10);
  const sum = daySeed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return categories[sum % categories.length];
};

export default function HomeScreen({ navigation }) {
  const [difficulty, setDifficulty] = useState('normal');
  const [questionCount, setQuestionCount] = useState(20);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  const selectedDifficulty = useMemo(
    () => difficultyOptions.find((option) => option.key === difficulty) ?? difficultyOptions[1],
    [difficulty]
  );

  const startQuiz = (category, isDailyChallenge = false) => {
    navigation.navigate('Quiz', {
      category,
      questionCount,
      timerSeconds: selectedDifficulty.timerSeconds,
      isPracticeMode,
      difficulty,
      isDailyChallenge,
    });
  };

  return (
    <SafeAreaView style={[styles.container, styles.centered]}>
      <View style={styles.card}>
        <Text style={styles.title}>BrainBolt</Text>
        <Text style={styles.subtitle}>Select a category to begin</Text>

        <Text style={styles.settingLabel}>Difficulty</Text>
        <View style={styles.inlineOptionsRow}>
          {difficultyOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.chipButton, difficulty === option.key ? styles.chipButtonActive : null]}
              onPress={() => setDifficulty(option.key)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.chipButtonText,
                  difficulty === option.key ? styles.chipButtonTextActive : null,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.settingLabel}>Question Count</Text>
        <View style={styles.inlineOptionsRow}>
          {questionCountOptions.map((count) => (
            <TouchableOpacity
              key={count}
              style={[
                styles.chipButton,
                questionCount === count ? styles.chipButtonActive : null,
              ]}
              onPress={() => setQuestionCount(count)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.chipButtonText,
                  questionCount === count ? styles.chipButtonTextActive : null,
                ]}
              >
                {count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setIsPracticeMode((prevValue) => !prevValue)}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>
            {isPracticeMode ? 'Practice Mode: ON' : 'Practice Mode: OFF'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dailyChallengeButton}
          onPress={() =>
            startQuiz(getDailyChallengeCategory(), true)
          }
          activeOpacity={0.85}
        >
          <Text style={styles.dailyChallengeText}>Play Daily Challenge</Text>
        </TouchableOpacity>

        {categories.map((categoryKey) => (
          <TouchableOpacity
            key={categoryKey}
            style={styles.primaryButton}
            onPress={() => startQuiz(categoryKey)}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>{CATEGORY_LABELS[categoryKey]}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => startQuiz(categories[Math.floor(Math.random() * categories.length)])}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Surprise Me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
