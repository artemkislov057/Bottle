import React from "react";
import { PopupBodyInfo } from "./popupBodyInfo";
import categoryIcon from './categoryIconTusovki.svg';

type TProps = {
    address: string,
    timLife: number,//
    countPick: number,
    description: string,
    content: string[]
}

export const RightBarDescrBody:React.FC = React.memo((props) => {
    return <div className="right-bar-map-popup-body">
        <div className="right-bar-map-popup-body-title">
            <img className="categoty-icon" src={categoryIcon} alt="category icon" />
            <div className="right-bar-map-popup-body-title-name">Ищу компанию, чтобы чтобы чтобы чтобы чтобы</div>
        </div>
        <div className="right-bar-map-popup-body-info">
            <PopupBodyInfo className="addres" title="Адрес:" value='ул. Мира 32'/>
            <PopupBodyInfo className="timeLeft" title="До конца мероприятия:" value={50}/>
            <PopupBodyInfo className="pickCount" title="Осталось мест:" value={2} />            
        </div>
        <div className="right-bar-map-popup-body-description">
            <div className="right-bar-map-popup-body-description-text">
                Описание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описание
            </div>
            <div className="right-bar-map-popup-body-description-content">
                <img className="right-bar-map-popup-body-description-content-photo" src={categoryIcon} alt="фотография" />
                <img className="right-bar-map-popup-body-description-content-photo" src={categoryIcon} alt="фотография" />
            </div>
        </div>
    </div>
})