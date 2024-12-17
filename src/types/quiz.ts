export interface Question {
  id: number;
  question: string;
  answerChoices: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'fundamentals' | 'production' | 'technology' | 'history';
}

export interface QuizProgress {
  answeredQuestions: Set<number>;
  correctAnswers: number;
  currentLevel: 'easy' | 'medium' | 'hard';
  questionsNeededForNextLevel: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  feedback: string;
  selectedAnswer: number | null;
  isAnswered: boolean;
  level: number;
  availableQuestions: number[];
  progress: QuizProgress;
}