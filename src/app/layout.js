import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import { ClerkProvider } from '@clerk/nextjs';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
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
          <Navigation />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
