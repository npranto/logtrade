import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r text-white py-16 px-8 sm:px-16 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center text-center relative">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
          LogTrade
        </h1>
        <hr className="w-16 h-1 bg-yellow-500 mb-8" />

        {/* Subheadline */}
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
          Track your daily stock trades and gain insights over time
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Get Started Button */}
          <SignedOut>
            <Link
              href="/signup"
              className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold text-lg hover:bg-yellow-400 transition duration-300"
            >
              Create New Account
            </Link>

            {/* Login Button */}
            <Link
              href="/login"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded font-semibold text-lg hover:bg-white hover:text-black transition duration-300"
            >
              Login
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold text-lg hover:bg-yellow-400 transition duration-300"
            >
              Dashboard
            </Link>
          </SignedIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
