import React from 'react';
import './CRABasicFiles/App.css';

import { RouterProvider } from 'react-router';
import root from './router/root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={root} />
      <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
