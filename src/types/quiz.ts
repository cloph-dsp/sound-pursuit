export interface Question {
  id: number;
  question: string;
  answerChoices: string[]; 
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizProgress {
  currentLevel: 'easy' | 'medium' | 'hard';
  correctAnswers: number;
  answeredQuestions: number[];
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