import React from "react";
import './questModal.css';

type TProps = {
    titleQuest: string
    quest?: string
    address?: string
    onClickYesButton: Function
    onClickNoButton: Function
    imageUrl: string
}

export const MapModal:React.FC<TProps> = React.memo((props) => {
    return <div className="map-modal-container">
        <div className="map-modal-data-container">
            <img className="map-modal-data-container-image" alt="изображение к вопросу" src={props.imageUrl} />
            <div className="map-modal-data-container-text">
                <span className="map-modal-data-container-text-quest">{props.titleQuest}</span>
                {
                    props.quest ?
                    <span className="map-modal-data-container-text-caption">
                        {props.quest}
                        <span className="map-modal-data-container-text-caption-address"> {props.address}?</span>
                    </span>
                    : null
                }
                
            </div>
            <div className="map-modal-data-container-buttons">
                <button className="map-modal-data-container-button no" onClick={() => props.onClickNoButton()}>Нет</button>
                <button className="map-modal-data-container-button yes" onClick={() => props.onClickYesButton()}>Да</button>
            </div>
        </div>
    </div>
})