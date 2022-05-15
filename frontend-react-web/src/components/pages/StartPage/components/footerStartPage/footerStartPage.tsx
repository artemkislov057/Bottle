import React, { useContext, useState } from "react";
import { ContextWindowResolution } from "windoResolutionContext";
import './footerStartPage.css';
import a from './newFotterLeftWave.svg';

export const FooterStartPage:React.FC = React.memo(() => {
    const [greenMarker, setGreenMarker] = useState(<div className="start-page-footer-wave-first-marker left"></div>);
    const [bluetMarker, setBlueMarker] = useState(<div className="start-page-footer-wave-first-marker right"></div>);
    const currentWindowWidth = useContext(ContextWindowResolution);
    
    function onHoverLeftWave() {
        let leftWave = document.querySelector('.start-page-footer-wave-first') as HTMLElement;
        leftWave.classList.add('hovered');

        setGreenMarker(<div className="start-page-footer-wave-first-marker left show"></div>);
    }

    function onOutLeftWave() {
        let leftWave = document.querySelector('.start-page-footer-wave-first') as HTMLElement;
        leftWave.classList.remove('hovered');

        setGreenMarker(<div className="start-page-footer-wave-first-marker left"></div>)
    }

    function onHoverRightWave() {
        let leftWave = document.querySelector('.start-page-footer-wave-second') as HTMLElement;
        leftWave.classList.add('hovered');

        setBlueMarker(<div className="start-page-footer-wave-first-marker right show"></div>);
    }

    function onOutRightWave() {
        let leftWave = document.querySelector('.start-page-footer-wave-second') as HTMLElement;
        leftWave.classList.remove('hovered');

        setBlueMarker(<div className="start-page-footer-wave-first-marker right"></div>)
    }

    if(currentWindowWidth < 701) {
        return <div className="start-page-footer-container"></div>
    }

    return <div className="start-page-footer-container">
        <div className="start-page-footer-wave-first" >
            {greenMarker}
        </div>
        <div className="start-page-footer-wave-first-help-container" onMouseOver={() => onHoverLeftWave()} onMouseOut={() => onOutLeftWave()}>
                <div className="start-page-footer-wave-first-help a"></div>
                <div className="start-page-footer-wave-first-help b"></div>
                <div className="start-page-footer-wave-first-help c"></div>
                <div className="start-page-footer-wave-first-help d"></div>
                <div className="start-page-footer-wave-first-help e"></div>
                <div className="start-page-footer-wave-first-help f"></div>
                <div className="start-page-footer-wave-first-help g"></div>
                <div className="start-page-footer-wave-first-help h"></div>
                <div className="start-page-footer-wave-first-help q"></div>
                <div className="start-page-footer-wave-first-help w"></div>
                <div className="start-page-footer-wave-first-help r"></div>
            </div>
        <div className="start-page-footer-wave-second" >
            {bluetMarker}
        </div>
        <div className="start-page-footer-wave-second-help-container" onMouseOver={() => onHoverRightWave()} onMouseOut={() => onOutRightWave()}>
                <div className="start-page-footer-wave-second-help a"></div>
                <div className="start-page-footer-wave-second-help b"></div>
                <div className="start-page-footer-wave-second-help c"></div>
                <div className="start-page-footer-wave-second-help d"></div>
                <div className="start-page-footer-wave-second-help e"></div>
                <div className="start-page-footer-wave-second-help f"></div>
                <div className="start-page-footer-wave-second-help g"></div>
                <div className="start-page-footer-wave-second-help h"></div>
                <div className="start-page-footer-wave-second-help q"></div>
                <div className="start-page-footer-wave-second-help w"></div>
                <div className="start-page-footer-wave-second-help r"></div>
            </div>
    </div>
})
