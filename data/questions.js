// Local offline question bank used by the quiz screen.
// No network calls are needed, so the app works fully offline.
const questions = [
  {
    id: 'q1',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    correctIndex: 1,
  },
  {
    id: 'q2',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctIndex: 2,
  },
  {
    id: 'q3',
    question: 'Who wrote the play "Romeo and Juliet"?',
    options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
    correctIndex: 0,
  },
  {
    id: 'q4',
    question: 'What is the capital city of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctIndex: 2,
  },
  {
    id: 'q5',
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    correctIndex: 2,
  },
  {
    id: 'q6',
    question: 'How many continents are there on Earth?',
    options: ['5', '6', '7', '8'],
    correctIndex: 2,
  },
  {
    id: 'q7',
    question: 'What is the hardest natural substance?',
    options: ['Diamond', 'Iron', 'Gold', 'Granite'],
    correctIndex: 0,
  },
  {
    id: 'q8',
    question: 'Which country gifted the Statue of Liberty to the United States?',
    options: ['France', 'Spain', 'Canada', 'Germany'],
    correctIndex: 0,
  },
];

export default questions;
