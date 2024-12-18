import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LogTrade - Home',
  description: 'Track your daily stock trades and gain insights over time',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ul className="p-4 mb-4 flex space-x-2">
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/login'}>Login</Link>
          </li>
          <li>
            <Link href={'/signup'}>Signup</Link>
          </li>
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            <Link href={'/account'}>Account</Link>
          </li>
        </ul>
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
