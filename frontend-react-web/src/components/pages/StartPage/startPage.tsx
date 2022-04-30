import React, { useState } from "react";
import './startPage.css';

import { HeaderStartPage } from "./components/headerStartPage/headerStartPage";
import { BodyStartPage } from "./components/bodyStartPage/bodyStartPage";
import { FooterStartPage } from "./components/footerStartPage/footerStartPage";
import { SignModal } from "./components/signModal/signModal";

export const StartPage:React.FC = React.memo(() => {
    const [modal, setModal] = useState(<></>);    

    function onClickSignIn() {
        setModal(<SignModal title="Вход" submitButtonName="Войти" /> );
    }

    function onClickSignUp() {
        setModal(<SignModal title="Регистрация" submitButtonName="Зарегистрироваться" /> );
    }

    return <div className="start-page">
        <HeaderStartPage onClickSignUp={onClickSignIn}/>        
        <BodyStartPage onClickBegin={onClickSignUp}/>
        <FooterStartPage />
        {modal}
    </div>
})