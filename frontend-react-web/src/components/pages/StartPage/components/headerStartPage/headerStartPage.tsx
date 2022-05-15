import React, { useContext, useState } from "react";
import './headerStartPage.css';
import ic from './headerWaveNew1.svg';
// import ic from './fuuuuuuuuck.png';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ContextWindowResolution } from "windoResolutionContext";

type TProps = {
    onClickSignUp: Function,
    onClickSignIn: Function,
    toMainPage: Function
}

export const HeaderStartPage:React.FC<TProps> = React.memo((props) => {
    const [pinkMarker, setPinkMarker] = useState(<div className="start-page-header-wave-first-marker left"></div>);
    const [violetMarker, setVioletMarker] = useState(<div className="start-page-header-wave-first-marker right"></div>);
    const currentWindowWidth = useContext(ContextWindowResolution);

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

    if(currentWindowWidth < 701) {
        return <div className="start-page-header-container">
            {/* <div className="start-page-header-wave-first-help-container">
                <div className="start-page-header-wave-first-help a"></div>
                <div className="start-page-header-wave-first-help b"></div>
            </div> */}
            <div className="start-page-header-wave-mobile second"></div>
            <div className="start-page-header-wave-mobile first"></div>
        </div>
    }

    return <div className="start-page-header-container">
        <div className="start-page-header-wave-first-help-container" onMouseOver={() => onHovered()} onMouseOut={() => onBlur()}>
            <div className="start-page-header-wave-first-help a" onMouseOver={() => createMarker('left')} onMouseOut={() => deleteMarker('left')}>
                
            </div>
            <div className="start-page-header-wave-first-help b" onMouseOver={() => createMarker('right')} onMouseOut={() => deleteMarker('right')}>
                
            </div>
        </div>
        <div className="start-page-header-wave-first" >
            {pinkMarker}
            {violetMarker}
        </div>
    
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
