import React from "react";
import { PopupBodyInfo } from "./popupBodyInfo";
import { BodyTitle } from "./popupBodyTitle";
import { BodyDescription } from "./popupBodyDescription";
import categoryIcon from './categoryIconTusovki.svg';

type TProps = {
    titleName: string,
    address: string,
    timeLife: number,//
    countPick: number,
    description: string,
    content: string[]
}

export const RightBarDescrBody:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-popup-body">
        <BodyTitle icon={categoryIcon} titleName={props.titleName}/>        
        <div className="right-bar-map-popup-body-info">
            <PopupBodyInfo className="addres" title="Адрес:" value={props.address}/>
            <PopupBodyInfo className="timeLeft" title="До конца мероприятия:" value={props.timeLife}/>
            <PopupBodyInfo className="pickCount" title="Осталось мест:" value={props.countPick} />            
        </div>
        <BodyDescription description={props.description} content={props.content} />        
    </div>
})