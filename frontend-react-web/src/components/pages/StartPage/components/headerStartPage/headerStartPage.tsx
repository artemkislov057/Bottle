import React from "react";
import './headerStartPage.css';
import ic from './headerWaveNew1.svg';
// import ic from './fuuuuuuuuck.png';

type TProps = {
    onClickSignUp: Function
}

export const HeaderStartPage:React.FC<TProps> = React.memo((props) => {
    return <div className="start-page-header-container">
        {/* <div className="start-page-header-wave-first-container"> */}
            <div className="start-page-header-wave-first" ></div>
            {/* <img className="start-page-header-wave-first" src={ic} ></img> */}
        {/* </div> */}
        
        <div className="start-page-header-wave-second"></div>
        <div className="start-page-header-sign-container">
            <button className="start-page-header-exit-button">
                exit
            </button>
            <div className="start-page-header-sign-container-central-line"></div>
            <button className="start-page-header-sign-button" onClick={() => props.onClickSignUp()}>
                sign up
            </button>
        </div>
    </div>
})
