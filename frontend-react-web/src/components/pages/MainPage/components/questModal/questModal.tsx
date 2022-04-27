import React from "react";
import './questModal.css';

type TProps = {
    quest: string,
    onClickYesButton: Function,
    onClickNoButton: Function
}

export const MapModal:React.FC<TProps> = React.memo((props) => {
    return <div className="map-modal-container">
        <div className="map-modal-data-container">
            <div className="map-modal-data-container-addres">
                {props.quest}
            </div>
            <div className="map-modal-data-container-buttons">
                <button className="map-modal-data-container-button yes" onClick={() => props.onClickYesButton()}>Да</button>
                <button className="map-modal-data-container-button no" onClick={() => props.onClickNoButton()}>Нет</button>
            </div>
        </div>
    </div>
})