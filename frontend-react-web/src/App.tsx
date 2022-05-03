import React, { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { MainPage } from './components/pages/MainPage/mainPage';
import { StartPage } from 'components/pages/StartPage/startPage';
import { Route, Link, BrowserRouter, Routes, Router, useNavigate } from 'react-router-dom';
import { apiUrl } from 'components/connections/apiUrl';
import { ContextLogin } from 'loginContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      
    }
  }
})

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        let response = await fetch(`${apiUrl}/api/account`, {
          credentials:'include'
        });
        if (response.ok) {
          console.log('login')
          setIsLogin(true)
        }  
      } catch {
        console.log('logout')
      }      
    }

    getUser();
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ContextLogin.Provider value={{isLogin: isLogin, setIsLogin:setIsLogin}}>
        <BrowserRouter>
          <Routes>
            <Route path='/mainPage' element={<MainPage isLogin={isLogin} />} />
            <Route path='/' element={<StartPage isLogin={isLogin} />} />
          </Routes>        
        </BrowserRouter>
      </ContextLogin.Provider>      
    </QueryClientProvider>    
  );
}

export default App;