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
    let addres = props.address.split(',').slice(0,2).toString();
    let time = convertTime(props.timeLife);

    function convertTime(timeInSeconds : number) {
        console.log(timeInSeconds, 'all seconds');
        let minutes = (timeInSeconds / 60).toFixed(0);
        console.log(minutes, 'minutes');
        let hours = '';
        if(+minutes > 59) {
            hours = Math.floor(+minutes / 60).toFixed(0);
            console.log(hours, 'hours');
            minutes = (+minutes % 60).toFixed(0);
            console.log(minutes, 'minutes');
        }
        return +hours === 0 ? `${minutes} мин`
            : +minutes === 0 ? `${hours} ч 0 мин`
            : `${hours} ч ${minutes} мин`;
    }


    return <div className="right-bar-map-popup-body">
        <BodyTitle icon={categoryIcon} titleName={props.titleName}/>        
        <div className="right-bar-map-popup-body-info">
            <PopupBodyInfo className="addres" title="Адрес:" value={addres}/>
            <PopupBodyInfo className="timeLeft" title="До конца мероприятия:" value={time}/>
            <PopupBodyInfo className="pickCount" title="Осталось мест:" value={props.countPick} />            
        </div>
        <BodyDescription description={props.description} content={props.content} />        
    </div>
})