import React, { useEffect, useState } from "react";
import { PopupBodyInfo } from "./popupBodyInfo";
import { BodyTitle } from "./popupBodyTitle";
import { BodyDescription } from "./popupBodyDescription";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";
import categoryIcon from './categoryIconTusovki.svg';

type TProps = {
    data: DataBottleDescType    
}

export const RightBarDescrBody:React.FC<TProps> = React.memo((props) => {
    let addres = props.data.address.split(',').slice(0,2).toString();//
    let time = convertTime(props.data.timeLife);

    function convertTime(timeInSeconds : number) {
        let minutes = (timeInSeconds / 60).toFixed(0);
        let hours = '';
        if(+minutes > 59) {
            hours = Math.floor(+minutes / 60).toFixed(0);
            minutes = (+minutes % 60).toFixed(0);
        }
        return +hours === 0 ? `${minutes} мин`
            : +minutes === 0 ? `${hours} ч 0 мин`
            : `${hours} ч ${minutes} мин`;
    }

    return <div className="right-bar-map-popup-body">
        <BodyTitle icon={categoryIcon} titleName={props.data.titleName}/>        
        <div className="right-bar-map-popup-body-info">
            <PopupBodyInfo className="addres" title="Адрес:" value={addres}/>
            <PopupBodyInfo className="timeLeft" title="До конца мероприятия:" value={time}/>
            <PopupBodyInfo className="pickCount" title="Осталось мест:" value={props.data.countPick} />            
        </div>
        <BodyDescription description={props.data.description} content={props.data.content} />
    </div>
})