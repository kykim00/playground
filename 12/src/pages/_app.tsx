import ErrorBoundary from '@/components/error/ErrorBoundary';
import '@/styles/globals.css';
import '@/styles/table.css';
import type { AppProps } from 'next/app';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast, { Toaster } from 'react-hot-toast';
import Modals from '@/components/ui/modals';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 2,
      cacheTime: Infinity,
      retry: false,
      useErrorBoundary: true,
    },
  },
  queryCache: new QueryCache({
    onSuccess: (error, query) => {
      if (query.state.data !== undefined || 'message' in (error as Error)) {
        toast.error(`Something went wrong: ${(error as Error).message}`);
      }
    },
  }),
});
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={client}>
      <ErrorBoundary fallback={<h1>Error occured!</h1>}>
        <Component {...pageProps} />
        <Toaster />
        <Modals />
        <ReactQueryDevtools />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
export default appWithTranslation(App);
