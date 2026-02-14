import scienceQuestions from './science/questions';
import artQuestions from './art/questions';
import sportQuestions from './sport/questions';

export const CATEGORY_LABELS = {
  science: 'Science',
  art: 'Art',
  sport: 'Sport',
};

const questionsByCategory = {
  science: scienceQuestions,
  art: artQuestions,
  sport: sportQuestions,
};

export default questionsByCategory;
