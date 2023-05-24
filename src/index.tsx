import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // enabled: true,
            // retry: (failureCount, error) => failureCount > 2,
            staleTime: 60 * 1000,
            // cacheTime: 5 * 60 * 1000,
            // refetchOnMount: false,
            // refetchOnWindowFocus: false,
            // refetchOnReconnect: 'always',
            // onSuccess: (data) => {},
            // onError: (err) => {},
            // onSettled: (data, error) => {},
            // initialData: [],
        }
    }
});
console.log(queryClient);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <App/>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
