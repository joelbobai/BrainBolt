import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1b2a49',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#415a77',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#415a77',
    marginBottom: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0d1b2a',
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: '#d9e2ec',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  optionText: {
    fontSize: 16,
    color: '#1b263b',
    fontWeight: '600',
  },
  optionCorrect: {
    borderColor: '#2a9d8f',
    backgroundColor: '#e6f8f6',
  },
  optionIncorrect: {
    borderColor: '#e63946',
    backgroundColor: '#ffebee',
  },
  primaryButton: {
    backgroundColor: '#1b2a49',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonDisabled: {
    backgroundColor: '#9aa8bb',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0d1b2a',
    marginBottom: 8,
  },
  percentText: {
    fontSize: 20,
    color: '#415a77',
    marginBottom: 10,
    fontWeight: '600',
  },
  highScoreText: {
    fontSize: 16,
    color: '#1b2a49',
    marginBottom: 24,
    fontWeight: '600',
  },
});

export default styles;
