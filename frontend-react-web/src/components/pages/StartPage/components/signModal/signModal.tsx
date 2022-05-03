import React, { useEffect, useState } from "react";
import './signModal.css';

import { ModalInput } from "./moadlInput";

type TProps = {
    title: string,
    submitButtonName: string,
    onClickCloseModal: Function,
    onSubmit: Function,    
}

export const SignModal:React.FC<TProps> = React.memo((props) => {
    const [currentTypeModal, setCurrentTypeModal] = useState('');
    const [loginData, setLoginData] = useState('');
    const [passwordData, setPasswordDate] = useState('');
    const [secondPasswordData, setSecondPasswordDate] = useState('');

    useEffect(() => {       
        setCurrentTypeModal(props.title);
        // let modal = document.querySelector('.sign-modal-container') as HTMLElement;
        // modal.focus();

    }, [props.title]);

    function checkData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(currentTypeModal === 'Вход') {
            props.onSubmit({email: loginData, password: passwordData});
            return;
        }
        if(secondPasswordData && passwordData === secondPasswordData) {
            props.onSubmit({email: loginData, password: passwordData});
        }        
    }

    return <div className="sign-modal-container-back">
        <div className="sign-modal-container" >
            <div className="sign-modal-header-container">
                <div className="sign-modal-header-title">{props.title}</div>
                <div className="sign-modal-header-close-button" onClick={() => props.onClickCloseModal()}></div>
            </div>
            <form className="sign-modal-body-container" id="sign-modal-body-container" onSubmit={(e) => checkData(e)}>
                <div className="sign-modal-body-social-container">
                    <button className="sign-modal-body-social google">Google</button>
                    <button className="sign-modal-body-social vk">VK</button>
                </div>
                <div className="sign-modal-body-central-line"></div>
                <div className="sign-modal-body-info-container">
                    <div className="sign-modal-body-info-inputs-container">
                        {
                            currentTypeModal === 'Вход' 
                                ? <ModalInput labelName={"Email, nickname"} id={"Email"} value={loginData} setValue={setLoginData} />
                                : <ModalInput labelName={"Email"} id={"Email"} value={loginData} setValue={setLoginData} />
                        }
                        <ModalInput labelName={"Пароль"} id={"Пароль"} type={'password'} value={passwordData} setValue={setPasswordDate}/>
                        {
                            currentTypeModal === 'Регистрация' 
                                ? <ModalInput labelName={"Повторите пароль"} id={"Повторите пароль"} type={'password'} value={secondPasswordData} setValue={setSecondPasswordDate} />
                                : null
                        }
                    </div>
                    <button type="submit" form="sign-modal-body-container" className="sign-modal-body-info-submit-button">{props.submitButtonName}</button>
                </div>
            </form>
        </div>
    </div>
})