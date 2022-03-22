import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { MainPage } from './components/pages/MainPage/mainPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage></MainPage>
    </QueryClientProvider>    
  );
}

export default App;