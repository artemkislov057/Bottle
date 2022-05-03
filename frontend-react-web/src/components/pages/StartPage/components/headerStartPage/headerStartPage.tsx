import React, { useState } from "react";
import './headerStartPage.css';
import ic from './headerWaveNew1.svg';
// import ic from './fuuuuuuuuck.png';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

type TProps = {
    onClickSignUp: Function,
    onClickSignIn: Function,
    toMainPage: Function
}

export const HeaderStartPage:React.FC<TProps> = React.memo((props) => {
    const [pinkMarker, setPinkMarker] = useState(<div className="start-page-header-wave-first-marker left"></div>);
    const [violetMarker, setVioletMarker] = useState(<div className="start-page-header-wave-first-marker right"></div>);
    function onHovered() {
        let wave = document.querySelector('.start-page-header-wave-first') as HTMLElement;
        wave.classList.add('hovered');
    }

    function onBlur() {
        let wave = document.querySelector('.start-page-header-wave-first') as HTMLElement;
        wave.classList.remove('hovered');
    }

    function createMarker(type: string) {
        if(type === 'left') {
            setPinkMarker(<div className="start-page-header-wave-first-marker left show"></div>);
        } else {
            setVioletMarker(<div className="start-page-header-wave-first-marker right show"></div>);
        }
    }

    function deleteMarker(type: string) {
        if(type === 'left') {
            setPinkMarker(<div className="start-page-header-wave-first-marker left"></div>);
        } else {
            setVioletMarker(<div className="start-page-header-wave-first-marker right"></div>);
        }
    }

    return <div className="start-page-header-container">
        <div className="start-page-header-wave-first-help-container" onMouseOver={() => onHovered()} onMouseOut={() => onBlur()}>
            <div className="start-page-header-wave-first-help a" onMouseOver={() => createMarker('left')} onMouseOut={() => deleteMarker('left')}>
                {pinkMarker}
            </div>
            <div className="start-page-header-wave-first-help b" onMouseOver={() => createMarker('right')} onMouseOut={() => deleteMarker('right')}>
                {violetMarker}
            </div>
        </div>
        <div className="start-page-header-wave-first" ></div>
    
        <div className="start-page-header-sign-container">
            <button className="start-page-header-exit-button" onClick={() => props.onClickSignIn()}>
                sign in
            </button>
            <div className="start-page-header-sign-container-central-line"></div>
            <button className="start-page-header-sign-button" onClick={() => props.onClickSignUp()}>
                sign up
            </button>
        </div>
    </div>
})
