export interface Question {
  id: number;
  question: string;
  answerChoices: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface QuizProgress {
  currentLevel: 'easy' | 'medium' | 'hard';
  correctAnswers: number;
  answeredQuestions: number[];
  questionsNeededForNextLevel: number;
}

export interface QuizState {
  progress: QuizProgress;
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  isAnswered: boolean;
  feedback: string;
  score: number;
  timer: number;
  additionalQuestionsNeeded: number;
}

export interface QuizContextType {
  handleTimerEnd: () => void;
  currentQuestion: Question | null;
  setAnswer: (index: number | null, isCorrect: boolean) => void;
}