import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { MainPage } from './components/pages/MainPage/mainPage';
import { StartPage } from 'components/pages/StartPage/startPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StartPage />
      {/* <MainPage></MainPage> */}
    </QueryClientProvider>    
  );
}

export default App;