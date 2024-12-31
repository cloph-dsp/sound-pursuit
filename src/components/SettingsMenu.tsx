import { useState, useEffect } from 'react';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsMenu({ isOpen, onClose }: SettingsMenuProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleDarkModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-xs p-4 bg-white dark:bg-gray-800 rounded-md shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold dark:text-gray-100">Settings</h2>
          <button className="flex items-center gap-2 p-2 rounded-md" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 dark:text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6L18 18"
              />
            </svg>
            <span className="text-sm font-medium dark:text-gray-100">Close</span>
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium dark:text-gray-100">Dark Mode</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={handleDarkModeToggle}
                className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
              />
              <span className="text-sm font-medium dark:text-gray-100">{isDarkMode ? 'On' : 'Off'}</span>
            </label>
          </div>
          {/* Add other settings options here */}
        </div>
      </div>
    </div>
  );
}