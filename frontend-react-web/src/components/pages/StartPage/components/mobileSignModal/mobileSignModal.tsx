import React, { useState } from "react";
import './mobileSignModal.css';

type TProps = {
    onClickSignIn: Function,
    onClickSignUp: Function,
    onClickSignInWithGoogle: Function,
    onClickSignUpWithGoogle: Function,
}

export const MobileSignModal:React.FC<TProps> = React.memo((props) => {
    const [currentActiveSection, setCurrentActiveSection] = useState('signIn');
    const [loginData, setLoginData] = useState('');
    const [passwordData, setPasswordDate] = useState('');
    const [secondPasswordData, setSecondPasswordDate] = useState('');

    function onClickSignInSection() {
        setCurrentActiveSection('signIn');
    }

    function onClickSignUpSection() {
        setCurrentActiveSection('signUp');
    }

    function checkData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(currentActiveSection === 'signIn') {
            props.onClickSignIn({email: loginData, password: passwordData});
            return;
        }
        if(secondPasswordData && passwordData === secondPasswordData) {
            props.onClickSignUp({email: loginData, password: passwordData});
        }        
    }

    return <div className="sign-modal-mobile-container-help">
        <div className="sign-modal-mobile-container">
            <div className="sign-modal-mobile-header">
                <button className={`sign-modal-mobile-header-button signin ${currentActiveSection === 'signIn' ? 'active' : ''}`} onClick={() => onClickSignInSection()}>Вход</button>
                <div className={`sign-modal-mobile-header-central-line`}></div>
                <button className={`sign-modal-mobile-header-button signup ${currentActiveSection === 'signUp' ? 'active' : ''}`} onClick={() => onClickSignUpSection()}>Регистрация</button>
            </div>
            <form id="sign-modal-mobile-form" className="sign-modal-mobile-inputs" onSubmit={(e) => checkData(e)}>
                <input 
                    type={currentActiveSection === 'signUp' ? 'email' : 'text'} 
                    className="sign-modal-mobile-input login" 
                    placeholder={currentActiveSection === 'signUp' ? 'Email' : 'Логин, email'}
                    onChange={e => setLoginData(e.target.value)}
                    required
                >
                </input>
                <input 
                    type={'password'} 
                    className="sign-modal-mobile-input password" 
                    placeholder="Пароль" 
                    onChange={e => setPasswordDate(e.target.value)}
                    minLength={6}
                    required>
                </input>
                {
                    currentActiveSection === 'signUp' 
                    ? <input type={'password'} className="sign-modal-mobile-input password" placeholder="Повторите пароль" onChange={e => setSecondPasswordDate(e.target.value)} required></input>
                    : null
                }
            </form>
            <div className="sign-modal-mobile-submit-buttons-container">
                <button type="submit" form="sign-modal-mobile-form" className="sign-modal-mobile-submit">{currentActiveSection === 'signUp' ? 'Зарегистрироваться' : 'Войти'}</button>
                <div className="sign-modal-mobile-submit-buttons-text">или</div>
                <div className="sign-modal-mobile-submit-social-container">
                    <button className="sign-modal-mobile-submit-social-button google">{}</button>
                    <button className="sign-modal-mobile-submit-social-button vk">{}</button>
                </div>
            </div>
        </div>
    </div>    
})