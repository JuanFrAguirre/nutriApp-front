import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { LoadingSpinnerProvider } from './services/useLoading';
import { ModalProvider } from './services/useModal';
import { LoadingSpinner } from './components/loadingSpinner/loadingSpinner';
import { CalculatorProvider } from './services/useCalculator';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NutriApp',
  description: 'Nutritional app for better calculating meals!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ModalProvider>
        <LoadingSpinnerProvider>
          <CalculatorProvider>
            <body className={openSans.className}>{children}</body>
          </CalculatorProvider>
          <LoadingSpinner />
        </LoadingSpinnerProvider>
      </ModalProvider>
    </html>
  );
}
