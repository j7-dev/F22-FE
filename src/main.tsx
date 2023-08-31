import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import '@/local/i18n';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

const id = 'f22';

if (id) {
    ReactDOM.createRoot(document.getElementById(id) as HTMLElement).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </React.StrictMode>,
    );
}
