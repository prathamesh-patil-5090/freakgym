import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BackgroundEffects from '../components/BackgroundEffects';
// import ThemeToggle from './components/ThemeToggle'; // Remove this import
import { ThemeProvider } from '../context/ThemeProvider';
import Navbar from '../components/Navbar'; // Import the Navbar

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FreakGym',
  description: 'Your ultimate fitness solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      {/* The body class will be managed by the ThemeProvider */}
      <body className={inter.className}>
        <ThemeProvider>
          <BackgroundEffects />
          <Navbar />
          <main className="relative z-10 pt-16 min-h-[calc(100vh-4rem)] overflow-y-auto">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}