'use client';

import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggler = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div
      onClick={toggleTheme}
      className={`relative w-16 h-8 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${
        theme === 'dark' ? 'bg-indigo-800' : 'bg-white border border-gray-300'
      } shadow-md`}
    >
      {/* Sliding Circle */}
      <div
        className={`absolute w-6 h-6 rounded-full bg-white shadow-sm border border-gray-300 transition-transform ${
          theme === 'dark' ? 'transform translate-x-8' : 'transform translate-x-0'
        } flex items-center justify-center`}
      >
        {theme === 'light' ? (
          <FaSun className="text-yellow-400" size={14} />
        ) : (
          <FaMoon className="text-indigo-400" size={14} />
        )}
      </div>
    </div>
  );
};

export default ThemeToggler;
