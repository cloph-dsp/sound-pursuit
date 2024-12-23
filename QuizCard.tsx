import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface QuizCardProps {
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';  // Changed from level to difficulty
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  isAnswered: boolean;
  feedback: string;
  handleAnswerSelect: (index: number) => void;
  questionsNeeded: number;
}
