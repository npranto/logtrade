'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import ThemeToggler from './ThemeToggler';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`py-4 px-8 transition-all ${
        theme === 'dark'
          ? 'bg-gray-800 text-gray-300 border-b border-gray-700'
          : 'bg-white text-gray-900 border-b border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold">
          <Link href="/" className="flex gap-2 hover:text-indigo-500 transition duration-300">
            <Image src="/logtrade-logo.png" width={40} height={40} alt="LogTrade Logo" />
          </Link>
        </div>

        {/* Small Screen Menu Toggle + Theme Toggler */}
        <div className="sm:hidden flex items-center gap-4">
          <ThemeToggler />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button className="hover:text-indigo-500 focus:outline-none" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links for Larger Screens */}
        <nav className="hidden sm:flex items-center space-x-8">
          <ThemeToggler />
          <SignedIn>
            <Link
              href="/dashboard"
              className={`text-lg transition duration-300 ${
                theme === 'dark' ? 'hover:text-indigo-400' : 'hover:text-indigo-500'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className={`text-lg transition duration-300 ${
                theme === 'dark' ? 'hover:text-indigo-400' : 'hover:text-indigo-500'
              }`}
            >
              Settings
            </Link>
          </SignedIn>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link
              href="/login"
              className="bg-transparent border-2 border-black text-black px-4 py-2 rounded font-semibold text-lg hover:bg-black hover:text-white transition duration-300 dark:border-gray-500 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Login
            </Link>
          </SignedOut>
          <SignedOut>
            <Link
              href="/signup"
              className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold text-lg hover:bg-yellow-400 transition duration-300 dark:bg-yellow-600 dark:text-gray-800 dark:hover:bg-yellow-500"
            >
              Create New Account
            </Link>
          </SignedOut>
        </nav>
      </div>

      {/* Collapsible Menu for Small Screens */}
      <div
        className={`${
          isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 py-0 px-0'
        } sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'
        }`}
      >
        <SignedIn>
          <Link
            onClick={toggleMenu}
            href="/dashboard"
            className={`block text-lg transition duration-300 border-b-2 border-gray-200 py-2 ${
              theme === 'dark' ? 'hover:text-indigo-400' : 'hover:text-indigo-500'
            }`}
          >
            Dashboard
          </Link>
          <Link
            onClick={toggleMenu}
            href="/settings"
            className={`block text-lg transition duration-300 border-b-2 border-gray-200 py-2 ${
              theme === 'dark' ? 'hover:text-indigo-400' : 'hover:text-indigo-500'
            }`}
          >
            Settings
          </Link>
        </SignedIn>
        <SignedOut>
          <Link
            onClick={toggleMenu}
            href="/login"
            className={`block text-lg transition duration-300 border-b-2 border-gray-200 py-2 ${
              theme === 'dark' ? 'hover:text-indigo-400' : 'hover:text-indigo-500'
            }`}
          >
            Login
          </Link>
        </SignedOut>
        <SignedOut>
          <Link
            onClick={toggleMenu}
            href="/signup"
            className={`block text-lg transition duration-300 border-b-2 border-gray-200 py-2 ${
              theme === 'dark' ? 'hover:text-indigo-400' : 'hover:text-indigo-500'
            }`}
          >
            Create New Account
          </Link>
        </SignedOut>
      </div>
    </header>
  );
};

export default Navigation;
