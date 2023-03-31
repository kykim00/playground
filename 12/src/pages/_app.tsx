import ErrorBoundary from '@/components/error/ErrorBoundary';
import '@/styles/globals.css';
import '@/styles/table.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 2,
      cacheTime: Infinity,
    },
  },
});
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={client}>
      <ErrorBoundary fallback={<h1>Error occured!</h1>}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
export default appWithTranslation(App);
