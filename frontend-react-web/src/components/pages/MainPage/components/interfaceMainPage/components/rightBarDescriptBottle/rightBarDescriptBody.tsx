import React, { useEffect, useState } from "react";
import { PopupBodyInfo } from "./popupBodyInfo";
import { BodyTitle } from "./popupBodyTitle";
import { BodyDescription } from "./popupBodyDescription";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";
import categoryIconTest from './categoryIconTusovki.svg';

import hangIcon from './popupHangIcon.svg'
import acquaintanceIcon from './popupAcquaintanceIcon.svg';
import otherIcon from './popupOtherIcon.svg';
import sportIcon from './popupSportIcon.svg';
import commercIcon from './popupCommercIcon.svg';

type TProps = {
    data: DataBottleDescType    
}

export const RightBarDescrBody:React.FC<TProps> = React.memo((props) => {
    const [categoryIcon, setCategoryIcon] = useState('');
    const [categoryType, setCategoryType] = useState('');

    useEffect(() => {
        switch(props.data.category) {
            case 'Продажи':
                setCategoryIcon(commercIcon);
                setCategoryType('commerc');
                break;
            case 'Тусовки':
                setCategoryIcon(hangIcon);
                setCategoryType('hang');
                break;
            case 'Знакомства':
                setCategoryIcon(acquaintanceIcon);
                setCategoryType('acquaintance');
                break;
            case 'Спорт':
                setCategoryIcon(sportIcon);
                setCategoryType('sport');
                break;
            case 'Прочее':
                setCategoryIcon(otherIcon);
                setCategoryType('other');
                break
        }
    }, [props.data])

    let addres = props.data.address.split(',').slice(0,2).toString();// // мб надо состояние?
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
        <BodyTitle icon={categoryIcon} titleName={props.data.titleName} category={categoryType}/>
        <div className="right-bar-map-popup-body-info">
            <PopupBodyInfo className="addres" title="Адрес:" value={addres}/>
            <PopupBodyInfo className="timeLeft" title="До конца мероприятия:" value={time}/>
            <PopupBodyInfo className="pickCount" title="Осталось мест:" value={props.data.countPick} />            
        </div>
        <BodyDescription description={props.data.description} content={props.data.content} />
    </div>
})