import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { LoadingSpinner } from './components/loadingSpinner/loadingSpinner';
import './globals.css';
import { CalculatorProvider } from './services/useCalculator';
import { LoadingSpinnerProvider } from './services/useLoading';
import { ModalProvider } from './services/useModal';
import { ToastContainer } from 'react-toastify';
import ToastProvider from './components/toastContainer/toastContainer';
import { ProductsProvider } from './services/useProducts';

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
      <body className={openSans.className}>
        <ToastProvider>
          <ModalProvider>
            <LoadingSpinnerProvider>
              <ProductsProvider>
                <CalculatorProvider>{children}</CalculatorProvider>
              </ProductsProvider>
              <LoadingSpinner />
            </LoadingSpinnerProvider>
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
