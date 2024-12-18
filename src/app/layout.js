import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LogTrade',
  description: 'Track your daily stock trades and gain insights over time',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{}}>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <ul className="p-4 mb-4 flex space-x-2">
            <li>
              <UserButton />
            </li>
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <SignedOut>
              <li>
                <Link href={'/login'}>Login</Link>
              </li>
            </SignedOut>
            <SignedOut>
              <li>
                <Link href={'/signup'}>Signup</Link>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <Link href={'/dashboard'}>Dashboard</Link>
              </li>
            </SignedIn>
            <SignedIn>
              <li>
                <Link href={'/account'}>Account</Link>
              </li>
            </SignedIn>
          </ul>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
