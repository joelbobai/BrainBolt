import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import questionsByCategory, { CATEGORY_LABELS } from '../data';
import styles from '../styles/styles';

const DEFAULT_QUESTION_TIME_LIMIT = 30;

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
  const questionCount = route.params?.questionCount ?? 20;
  const isPracticeMode = Boolean(route.params?.isPracticeMode);
  const timerSeconds = route.params?.timerSeconds ?? DEFAULT_QUESTION_TIME_LIMIT;
  const difficulty = route.params?.difficulty ?? 'normal';
  const isDailyChallenge = Boolean(route.params?.isDailyChallenge);

  const categoryQuestions = questionsByCategory[category] ?? questionsByCategory.science;

  const quizQuestions = useMemo(() => {
    const shuffled = shuffleQuestions(categoryQuestions);
    return shuffled.slice(0, Math.min(questionCount, shuffled.length));
  }, [category, categoryQuestions, questionCount]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [skipCount, setSkipCount] = useState(2);
  const [hintUsed, setHintUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const currentQuestion = quizQuestions[currentIndex];
  const isLastQuestion = currentIndex === quizQuestions.length - 1;

  useEffect(() => {
    setTimeLeft(timerSeconds);
    setHiddenOptions([]);
    setIsPaused(false);
  }, [currentIndex, timerSeconds]);

  const goToResults = (updatedScore) => {
    navigation.replace('Results', {
      score: updatedScore,
      totalQuestions: quizQuestions.length,
      category,
      difficulty,
      isPracticeMode,
      questionCount,
      isDailyChallenge,
      bestStreak,
    });
  };

  const handleNext = (timedOut = false) => {
    if (!timedOut && selectedIndex === null) return;

    const selectedIsCorrect = selectedIndex === currentQuestion.correctIndex;
    const updatedScore = selectedIsCorrect ? score + 1 : score;
    const updatedStreak = selectedIsCorrect ? streak + 1 : 0;

    if (selectedIsCorrect && updatedStreak > bestStreak) {
      setBestStreak(updatedStreak);
    }
    setStreak(updatedStreak);

    if (isLastQuestion) {
      goToResults(updatedScore);
      return;
    }

    setScore(updatedScore);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (isPracticeMode || isPaused) return undefined;

    if (timeLeft === 0) {
      handleNext(true);
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timeLeft, isPracticeMode, isPaused, selectedIndex, score]);

  const getOptionStyle = (optionIndex) => {
    if (hiddenOptions.includes(optionIndex)) return [styles.optionButton, styles.optionHidden];
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
    if (selectedIndex !== null || hiddenOptions.includes(optionIndex)) return;

    setSelectedIndex(optionIndex);
  };

  const useHint = () => {
    if (hintUsed || selectedIndex !== null) return;

    const incorrectOptionIndexes = currentQuestion.options
      .map((_, optionIndex) => optionIndex)
      .filter((optionIndex) => optionIndex !== currentQuestion.correctIndex);

    const shuffledIncorrect = shuffleQuestions(incorrectOptionIndexes);
    setHiddenOptions(shuffledIncorrect.slice(0, 2));
    setHintUsed(true);
  };

  const handleSkip = () => {
    if (skipCount === 0 || isLastQuestion) return;

    setStreak(0);
    setSkipCount((previousValue) => previousValue - 1);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelectedIndex(null);
  };

  const progress = Math.round(((currentIndex + 1) / quizQuestions.length) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.categoryText}>Category: {CATEGORY_LABELS[category]}</Text>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} of {quizQuestions.length} ({progress}%)
        </Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.quizMetaText}>Difficulty: {difficulty}</Text>
        <Text style={styles.quizMetaText}>Streak: {streak} | Best: {bestStreak}</Text>
        <Text style={styles.quizMetaText}>Skips left: {skipCount} | Hint: {hintUsed ? 'Used' : 'Ready'}</Text>

        {isPracticeMode ? (
          <Text style={styles.timerText}>Practice mode (no timer)</Text>
        ) : (
          <Text style={styles.timerText}>Time left: {timeLeft}s {isPaused ? '(Paused)' : ''}</Text>
        )}

        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {currentQuestion.options.map((option, optionIndex) => (
          <TouchableOpacity
            key={`${currentQuestion.id}-${option}`}
            style={getOptionStyle(optionIndex)}
            onPress={() => handleSelectOption(optionIndex)}
            activeOpacity={0.85}
            disabled={hiddenOptions.includes(optionIndex)}
          >
            <Text style={styles.optionText}>{hiddenOptions.includes(optionIndex) ? '— Hidden by 50/50 —' : option}</Text>
          </TouchableOpacity>
        ))}

        {selectedIndex !== null ? (
          <Text style={selectedIndex === currentQuestion.correctIndex ? styles.correctFeedback : styles.wrongFeedback}>
            {selectedIndex === currentQuestion.correctIndex ? 'Correct! Great job.' : 'Incorrect. Tap Next to continue.'}
          </Text>
        ) : null}

        <View style={styles.inlineOptionsRow}>
          <TouchableOpacity
            style={[styles.secondaryButton, styles.inlineActionButton]}
            onPress={useHint}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Use 50/50 Hint</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, styles.inlineActionButton]}
            onPress={handleSkip}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {!isPracticeMode ? (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setIsPaused((prevValue) => !prevValue)}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>{isPaused ? 'Resume Timer' : 'Pause Timer'}</Text>
          </TouchableOpacity>
        ) : null}

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
