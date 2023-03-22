import ErrorBoundary from '@/components/error/ErrorBoundary';
import '@/styles/globals.css';
import '@/pages/table/table.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ErrorBoundary fallback={<h1>Error occured!</h1>}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
