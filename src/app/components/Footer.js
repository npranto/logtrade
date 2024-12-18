import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-2 gap-2">
        <p className="text-sm">Note your investments</p>

        <div className="flex items-center gap-4">
          <div className="flex gap-6 text-sm">
            <a href="/terms" className="text-gray-400 hover:text-white transition duration-300">
              Terms of Service
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-white transition duration-300">
              Privacy Policy
            </a>
          </div>

          <div className="flex gap-4">
            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-4 pt-4 text-center">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} LogTrade. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
