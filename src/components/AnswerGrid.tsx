interface AnswerGridProps {
  answers: string[];
  selectedAnswer: number | null; // Index of the shuffled selected answer
  correctAnswer: number; // Index of the shuffled correct answer
  isAnswered: boolean;
  onSelect: (index: number) => void;
}

export default function AnswerGrid({
  answers,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  onSelect,
}: AnswerGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {answers.map((answer, index) => {
        const isCorrect = isAnswered && index === correctAnswer;
        const isSelectedIncorrect =
          isAnswered && index === selectedAnswer && selectedAnswer !== correctAnswer;

        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            disabled={isAnswered} // Disable selection after answering
            className={`p-4 rounded-lg text-left font-medium border ${
              isCorrect
                ? 'bg-green-100 border-green-500 text-green-800' // Green for correct answer
                : isSelectedIncorrect
                ? 'bg-red-100 border-red-500 text-red-800' // Red for selected incorrect answer
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100' // Default state
            } dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100`}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
}
