import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import questionsByCategory, { CATEGORY_LABELS } from '../data';
import styles from '../styles/styles';

const QUIZ_SIZE = 20;
const QUESTION_TIME_LIMIT = 30;

const shuffleQuestions = (questionList) => {
  const shuffled = [...questionList];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

export default function QuizScreen({ navigation, route }) {
  const category = route.params?.category ?? 'science';
  const categoryQuestions = questionsByCategory[category] ?? questionsByCategory.science;

  const quizQuestions = useMemo(() => {
    const shuffled = shuffleQuestions(categoryQuestions);
    return shuffled.slice(0, QUIZ_SIZE);
  }, [category, categoryQuestions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);

  const currentQuestion = quizQuestions[currentIndex];
  const isLastQuestion = currentIndex === quizQuestions.length - 1;

  useEffect(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);
  }, [currentIndex]);

  const handleNext = (timedOut = false) => {
    if (!timedOut && selectedIndex === null) return;

    const selectedIsCorrect = selectedIndex === currentQuestion.correctIndex;
    const updatedScore = selectedIsCorrect ? score + 1 : score;

    if (isLastQuestion) {
      navigation.replace('Results', {
        score: updatedScore,
        totalQuestions: quizQuestions.length,
        category,
      });
      return;
    }

    setScore(updatedScore);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(true);
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timeLeft, selectedIndex, score]);

  const getOptionStyle = (optionIndex) => {
    if (selectedIndex === null) return styles.optionButton;
    if (optionIndex === currentQuestion.correctIndex) {
      return [styles.optionButton, styles.optionCorrect];
    }
    if (optionIndex === selectedIndex) {
      return [styles.optionButton, styles.optionIncorrect];
    }
    return styles.optionButton;
  };

  const handleSelectOption = (optionIndex) => {
    if (selectedIndex !== null) return;

    setSelectedIndex(optionIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.categoryText}>Category: {CATEGORY_LABELS[category]}</Text>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} of {quizQuestions.length}
        </Text>
        <Text style={styles.timerText}>Time left: {timeLeft}s</Text>

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
          onPress={() => handleNext(false)}
          disabled={selectedIndex === null}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>{isLastQuestion ? 'Finish Quiz' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
