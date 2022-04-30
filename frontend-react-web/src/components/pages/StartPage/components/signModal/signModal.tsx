import React, { useEffect, useState } from "react";
import './signModal.css';

import { ModalInput } from "./moadlInput";

type TProps = {
    title: string,
    submitButtonName: string,
    onClickCloseModal: Function
}

export const SignModal:React.FC<TProps> = React.memo((props) => {
    let init1 = ["Логин, Email, телефон", "Пароль"];
    let init2 = ["Логин, Email, телефон", "Пароль", "Повторите пароль"];
    const [inputs, setInputs] = useState(init1);

    useEffect(() => {
        if(props.title === 'Регистрация') {
            setInputs(init2);            
        } else {
            setInputs(init1);
        }
        // let modal = document.querySelector('.sign-modal-container') as HTMLElement;
        // modal.focus();

    }, [props.title])

    return <div className="sign-modal-container-back">
        <div className="sign-modal-container" >
            <div className="sign-modal-header-container">
                <div className="sign-modal-header-title">{props.title}</div>
                <div className="sign-modal-header-close-button" onClick={() => props.onClickCloseModal()}></div>
            </div>
            <div className="sign-modal-body-container">
                <div className="sign-modal-body-social-container">
                    <button className="sign-modal-body-social google">Google</button>
                    <button className="sign-modal-body-social vk">VK</button>
                </div>
                <div className="sign-modal-body-central-line"></div>
                <div className="sign-modal-body-info-container">
                    <div className="sign-modal-body-info-inputs-container">
                        {inputs.map((input, i) =>                         
                                <ModalInput key={input} labelName={input} id={i} />
                            )}
                    </div>
                    <button className="sign-modal-body-info-submit-button">{props.submitButtonName}</button>
                </div>
            </div>
        </div>
    </div>
})