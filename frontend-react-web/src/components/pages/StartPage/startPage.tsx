import React, { useContext, useEffect, useRef, useState } from "react";
import './startPage.css';

import { HeaderStartPage } from "./components/headerStartPage/headerStartPage";
import { BodyStartPage } from "./components/bodyStartPage/bodyStartPage";
import { FooterStartPage } from "./components/footerStartPage/footerStartPage";
import { SignModal } from "./components/signModal/signModal";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "components/connections/apiUrl";
import { ContextLogin } from "loginContext";
import { ContextWindowResolution } from "windoResolutionContext";
import { MobileSignModal } from "./components/mobileSignModal/mobileSignModal";

type TProps = {
    isLogin: boolean
}

export const StartPage:React.FC<TProps> = React.memo((props) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(<></>);
    // const [modal, setModal] = useState(<div className="sign-modal-container-back hide"></div>);
    const loginData = useContext(ContextLogin);
    const currentWindowWidth = useContext(ContextWindowResolution);
    const [mobileBodyState, setMobileBodyState] = useState(<BodyStartPage onClickBegin={onClickBeginMobile}/>);
    const [mobileModal, setMobileModal] = useState(<></>);
        
    function toMainPage() {
        navigate('/mainPage');
        // window.history.replaceState({}, document.title)
    }

    useEffect(() => {
        console.log(loginData.isLogin)
        if(loginData.isLogin) {
            toMainPage();
        }
    }, [loginData.isLogin])
    

    async function onSubmitSignUp(data: {email: string, password: string}) {
        closeModal();
        let response = await fetch(`${apiUrl}/api/account`, {
            method: 'POST',
            body: JSON.stringify({
                nickname: data.email.split('@')[0],
                password: data.password,
                email: data.email,
                sex: "?",                
            }),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        if(response.ok) {
            loginData.setIsLogin(true);
            toMainPage();
            console.log('зарегались')
        } else {
            navigate('/');
            console.log('не зарегались')
        }
        
    }

    async function onSubmitSignUpGoogle(data: {provider: number, externalUserId: string, token: string, email: string}) {
        closeModal();
        let response = await fetch(`${apiUrl}/api/account/external-register`, {
            method: 'POST',
            body: JSON.stringify({
                externalLogin: {
                    provider: data.provider,
                    externalUserId: data.externalUserId,
                    accessToken: data.token,
                    rememberMe: true
                },
                nickname: data.email.split('@')[0],
                email: data.email,
                sex: "?",                
            }),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        if(response.ok) {
            loginData.setIsLogin(true);
            toMainPage();
            console.log('зарегались')
        } else {
            navigate('/');
            console.log('жопа1');
        }
        
    }

    async function onSubmitSignInGoogle(data: {provider: number, externalUserId: string, token: string, email: string}) {
        closeModal();
        let response = await fetch(`${apiUrl}/api/account/external-login`, {
            method: 'POST',
            body: JSON.stringify({
                provider: data.provider,
                externalUserId: data.externalUserId,
                accessToken: data.token,
            }),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        if(response.ok) {
            loginData.setIsLogin(true);
            toMainPage();
            console.log('login google')
        } else {
            navigate('/');
            console.log('жопа2')
        }
        
    }

    async function onSubmitSignIn(data: {email: string, password: string}) {        
        let type = data.email.includes('@') ? 'email' : 'nickname';
        let responseData;
        if(type === 'email') {
            responseData = {
                email: data.email,
                password: data.password
            }
        } else {
            responseData = {
                nickname: data.email,
                password: data.password
            }
        }
        
        let response = await fetch(`${apiUrl}/api/account/login`, {
            method: 'POST',
            body: JSON.stringify(responseData),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        
        if(response.ok) {
            closeModal();
            loginData.setIsLogin(true);
            toMainPage();
            console.log('вошли');
        } else {
            // navigate('/');
            console.log('не вошли');
            let dataInputs =  document.querySelectorAll('.sign-modal-body-info-input-input');
            for(let i = 0; i < dataInputs.length; i++) {
                let input = dataInputs[i] as HTMLElement;
                input.style.border = '2px solid red';
            }
            
        }
    }

    function onClickSignIn() {
        setModal(<SignModal title="Вход" submitButtonName="Войти" onClickCloseModal={closeModal} onSubmit={onSubmitSignIn} onSubmitGoogle={onSubmitSignInGoogle} /> );
    }

    function onClickSignUp() {
        setModal(<SignModal title="Регистрация" submitButtonName="Зарегистрироваться" onClickCloseModal={closeModal} onSubmit={onSubmitSignUp} onSubmitGoogle={onSubmitSignUpGoogle}/> );
    }

    function closeModal() {
        setModal(<></>);
        // setModal(<div className="sign-modal-container-back hide"></div>);
    }

    function onClickBeginMobile() {
        setMobileBodyState(<></>);
        setMobileModal(<MobileSignModal
            onClickSignIn={onSubmitSignIn}
            onClickSignUp={onSubmitSignUp}
            onClickSignInWithGoogle={onSubmitSignInGoogle}
            onClickSignUpWithGoogle={onSubmitSignUpGoogle}
        />)
    }

    if(currentWindowWidth < 701) {
        return <div className="start-page">
            <HeaderStartPage onClickSignUp={onClickSignUp} toMainPage={toMainPage} onClickSignIn={onClickSignIn}/>
            {mobileBodyState}
            {mobileModal}
            <FooterStartPage />            
        </div>
    }

    return <div className="start-page">
        <HeaderStartPage onClickSignUp={onClickSignUp} toMainPage={toMainPage} onClickSignIn={onClickSignIn}/>        
        <BodyStartPage onClickBegin={onClickSignUp}/>
        <FooterStartPage />
        {modal}
    </div>
})