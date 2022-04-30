import React from "react";
import './bodyStartPage.css';

type TProps = {
    onClickBegin: Function
}

export const BodyStartPage:React.FC<TProps> = React.memo((props) => {
    return <div className="start-page-body-container">
        <div className="start-page-body-title-container">
            <div className="start-page-body-title-name">{'Booble'}</div>
            <div className="start-page-body-title-description">
                Find everything you like
            </div>
        </div>
        <div className="start-page-body-button-container">
            <button className="start-page-body-button" onClick={() => props.onClickBegin()}>begin</button>
        </div>
    </div>
})
