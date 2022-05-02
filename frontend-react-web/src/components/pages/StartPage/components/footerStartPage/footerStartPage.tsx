import React from "react";
import './footerStartPage.css';
import a from './newFotterLeftWave.svg';

export const FooterStartPage:React.FC = React.memo(() => {
    function onHoverLeftWave() {
        let leftWave = document.querySelector('.start-page-footer-wave-first') as HTMLElement;
        leftWave.classList.add('hovered');
    }

    function onOutLeftWave() {
        let leftWave = document.querySelector('.start-page-footer-wave-first') as HTMLElement;
        leftWave.classList.remove('hovered');
    }

    function onHoverRightWave() {
        let leftWave = document.querySelector('.start-page-footer-wave-second') as HTMLElement;
        leftWave.classList.add('hovered');
    }

    function onOutRightWave() {
        let leftWave = document.querySelector('.start-page-footer-wave-second') as HTMLElement;
        leftWave.classList.remove('hovered');
    }

    return <div className="start-page-footer-container">
        <div className="start-page-footer-wave-first" >
            
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
