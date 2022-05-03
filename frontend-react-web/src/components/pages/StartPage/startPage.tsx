import React, { useRef, useState } from "react";
import './startPage.css';

import { HeaderStartPage } from "./components/headerStartPage/headerStartPage";
import { BodyStartPage } from "./components/bodyStartPage/bodyStartPage";
import { FooterStartPage } from "./components/footerStartPage/footerStartPage";
import { SignModal } from "./components/signModal/signModal";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "components/connections/apiUrl";

type TProps = {
}

export const StartPage:React.FC<TProps> = React.memo((props) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(<></>);    

    function toMainPage() {
        navigate('/mainPage');
        // window.history.replaceState({}, document.title)
    }

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
            toMainPage();
            console.log('зарегались')
        } else {
            navigate('/');
            console.log('жопа')
        }
        
    }

    function onSubmitSignIn(data: {email: string, password: string}) {
        
    }

    function onClickSignIn() {
        setModal(<SignModal title="Вход" submitButtonName="Войти" onClickCloseModal={closeModal} onSubmit={onSubmitSignIn} /> );
    }

    function onClickSignUp() {
        setModal(<SignModal title="Регистрация" submitButtonName="Зарегистрироваться" onClickCloseModal={closeModal} onSubmit={onSubmitSignUp} /> );
    }

    function closeModal() {
        setModal(<></>);
    }

    return <div className="start-page">
        <HeaderStartPage onClickSignUp={onClickSignIn} toMainPage={toMainPage}/>        
        <BodyStartPage onClickBegin={onClickSignUp}/>
        <FooterStartPage />
        {modal}
    </div>
})