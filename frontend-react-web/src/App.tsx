import React, { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { MainPage } from './components/pages/MainPage/mainPage';
import { StartPage } from 'components/pages/StartPage/startPage';
import { Route, Link, BrowserRouter, Routes, Router, useNavigate } from 'react-router-dom';
import { apiUrl } from 'components/connections/apiUrl';
import { ContextLogin } from 'loginContext';
import { ContextWindowResolution } from 'windoResolutionContext';
import { CommercRegistrationPage } from 'components/pages/StartPage/components/commercRegistrPage/commercRegisterPage';
import { UserInfoType } from 'components/pages/MainPage/UserInfoType';
import { PaymentPage } from 'components/pages/PaymentPage/paymentPage';
import { ContextForRegisterOrdinaryCommerc } from 'registerOrdinaryToCommercContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      
    }
  }
})

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);
  const [currentWindowWidth, setCurrentWindowWidth] = useState(window.screen.availWidth);
  const [registerOrdinaryUserToCommerc, setRegisterOrdinaryUserToCommerc] = useState<{email: string}>();

  window.addEventListener('resize', e => {
    //@ts-ignore
    setCurrentWindowWidth(e.currentTarget.screen.availWidth);    
  });

  useEffect(() => {
    async function getUser() {
      try {
        let response = await fetch(`${apiUrl}/api/account`, {
          credentials:'include'
        });
        if (response.ok) {
          console.log('login');
          setIsLogin(true);

          let data = await response.json() as UserInfoType;
          
          if(data.isCommercial) {
            setIsCommercial(true);
          }
        }  
      } catch {
        console.log('logout')
      }      
    }

    getUser();
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ContextLogin.Provider value={{isLogin: isLogin, setIsLogin:setIsLogin, isCommercial: isCommercial}}>
        <ContextWindowResolution.Provider value={currentWindowWidth}>
          <ContextForRegisterOrdinaryCommerc.Provider value={{registerOrdinaryUserToCommerc: registerOrdinaryUserToCommerc, setRegisterOrdinaryUserToCommerc: setRegisterOrdinaryUserToCommerc}}>
            <BrowserRouter>
              <Routes>
                <Route path='/main-page' element={<MainPage isLogin={isLogin} />} />
                <Route path='/' element={<StartPage isLogin={isLogin} />} />
                <Route path='/commercial-registration' element={<CommercRegistrationPage />} />
                <Route path='/payment' element={<PaymentPage />} />
              </Routes>        
            </BrowserRouter>
          </ContextForRegisterOrdinaryCommerc.Provider>          
        </ContextWindowResolution.Provider>
      </ContextLogin.Provider>      
    </QueryClientProvider>    
  );
}

export default App;