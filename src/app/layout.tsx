import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BackgroundEffects from '../components/BackgroundEffects';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      {/* The body class will be managed by the ThemeProvider */}
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <ThemeProvider>
          <BackgroundEffects />
          <Navbar />
          <main className="flex-grow flex flex-col pt-16 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          {/* Footer could go here */}
        </ThemeProvider>
      </body>
    </html>
  );
}