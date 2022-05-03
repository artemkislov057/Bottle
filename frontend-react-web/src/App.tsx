import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { MainPage } from './components/pages/MainPage/mainPage';
import { StartPage } from 'components/pages/StartPage/startPage';
import { Route, Link, BrowserRouter, Routes, Router, useNavigate } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      
    }
  }
})

function App() { 
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/mainPage' element={<MainPage />} />
          <Route path='/' element={<StartPage />} />
        </Routes>        
      </BrowserRouter>      
    </QueryClientProvider>    
  );
}

export default App;