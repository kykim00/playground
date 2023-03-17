import ErrorBoundary from '@/components/error/ErrorBoundary';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<h1>Error occured!</h1>}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
