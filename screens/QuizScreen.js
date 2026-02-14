import React, { useMemo, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import questions from '../data/questions';
import styles from '../styles/styles';

export default function QuizScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Return visual state for each answer option after a choice is made.
  const getOptionStyle = useMemo(
    () => (optionIndex) => {
      if (selectedIndex === null) return styles.optionButton;
      if (optionIndex === currentQuestion.correctIndex) {
        return [styles.optionButton, styles.optionCorrect];
      }
      if (optionIndex === selectedIndex) {
        return [styles.optionButton, styles.optionIncorrect];
      }
      return styles.optionButton;
    },
    [selectedIndex, currentQuestion.correctIndex]
  );

  const handleSelectOption = (optionIndex) => {
    if (selectedIndex !== null) return;

    setSelectedIndex(optionIndex);

    if (optionIndex === currentQuestion.correctIndex) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex === null) return;

    const selectedIsCorrect = selectedIndex === currentQuestion.correctIndex;

    if (isLastQuestion) {
      // Ensure final score is correct even if state batching has not flushed yet.
      const finalScore = selectedIsCorrect ? score + 1 : score;
      navigation.replace('Results', {
        score: finalScore,
        totalQuestions: questions.length,
      });
      return;
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelectedIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} of {questions.length}
        </Text>

        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {currentQuestion.options.map((option, optionIndex) => (
          <TouchableOpacity
            key={`${currentQuestion.id}-${option}`}
            style={getOptionStyle(optionIndex)}
            onPress={() => handleSelectOption(optionIndex)}
            activeOpacity={0.85}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            selectedIndex === null ? styles.primaryButtonDisabled : null,
          ]}
          onPress={handleNext}
          disabled={selectedIndex === null}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>{isLastQuestion ? 'Finish Quiz' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
