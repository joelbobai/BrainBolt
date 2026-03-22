import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import questionsByCategory, { CATEGORY_LABELS } from '../data';
import styles from '../styles/styles';

const categories = Object.keys(CATEGORY_LABELS);

export default function StudyScreen() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const studyCards = useMemo(
    () => questionsByCategory[selectedCategory] ?? questionsByCategory.science,
    [selectedCategory]
  );

  const currentCard = studyCards[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  }, [selectedCategory]);

  const goToPrevious = () => {
    if (currentIndex === 0) return;

    setCurrentIndex((previousIndex) => previousIndex - 1);
    setIsAnswerVisible(false);
  };

  const goToNext = () => {
    if (currentIndex === studyCards.length - 1) return;

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setIsAnswerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.studyScrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Permission-Free Study Deck</Text>
          <Text style={styles.subtitle}>
            Review questions and answers at your own pace. This study mode stays fully inside the app and does not request any device permissions.
          </Text>

          <Text style={styles.settingLabel}>Choose a category</Text>
          <View style={styles.inlineOptionsRow}>
            {categories.map((categoryKey) => (
              <TouchableOpacity
                key={categoryKey}
                style={[
                  styles.chipButton,
                  selectedCategory === categoryKey ? styles.chipButtonActive : null,
                ]}
                onPress={() => setSelectedCategory(categoryKey)}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.chipButtonText,
                    selectedCategory === categoryKey ? styles.chipButtonTextActive : null,
                  ]}
                >
                  {CATEGORY_LABELS[categoryKey]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.studyCard}>
            <Text style={styles.categoryText}>{CATEGORY_LABELS[selectedCategory]} Study Card</Text>
            <Text style={styles.progressText}>
              Card {currentIndex + 1} of {studyCards.length}
            </Text>
            <Text style={styles.questionText}>{currentCard.question}</Text>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setIsAnswerVisible((previousValue) => !previousValue)}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>
                {isAnswerVisible ? 'Hide Answer' : 'Reveal Answer'}
              </Text>
            </TouchableOpacity>

            {isAnswerVisible ? (
              <View style={styles.answerPanel}>
                <Text style={styles.answerLabel}>Correct answer</Text>
                <Text style={styles.answerText}>{currentCard.options[currentCard.correctIndex]}</Text>
              </View>
            ) : (
              <Text style={styles.studyHintText}>
                Tap Reveal Answer when you are ready to check yourself.
              </Text>
            )}
          </View>

          <View style={styles.inlineOptionsRow}>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                styles.inlineActionButton,
                currentIndex === 0 ? styles.secondaryButtonDisabled : null,
              ]}
              onPress={goToPrevious}
              disabled={currentIndex === 0}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                styles.inlineActionButton,
                currentIndex === studyCards.length - 1 ? styles.primaryButtonDisabled : null,
              ]}
              onPress={goToNext}
              disabled={currentIndex === studyCards.length - 1}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Next Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
