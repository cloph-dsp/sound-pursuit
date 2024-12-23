import { FaCog } from 'react-icons/fa';

interface SettingsButtonProps {
  onClick: () => void;
}

export default function SettingsButton({ onClick }: SettingsButtonProps) {
  return (
    <button
      className="fixed top-4 right-4 flex items-center p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
      onClick={onClick}
    >
      <FaCog className="w-5 h-5" />
    </button>
  );
}