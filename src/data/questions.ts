import { Question } from '../types/quiz';
import { easyQuestions } from './questions/easy';
import { mediumQuestions } from './questions/medium';
import { hardQuestions } from './questions/hard';

// Combine todas as perguntas
export const allQuestions: Question[] = [
  ...easyQuestions,
  ...mediumQuestions,
  ...hardQuestions,
];

// Validar IDs únicos
const ids = new Set();
allQuestions.forEach(q => {
  if (ids.has(q.id)) {
    console.error(`Duplicate question ID found: ${q.id}`);
  }
  ids.add(q.id);
});

// Exportar individualmente caso necessário
export { easyQuestions, mediumQuestions, hardQuestions };
