import React, { useEffect, useState } from "react";
import { PopupBodyInfo } from "./popupBodyInfo";
import { BodyTitle } from "./popupBodyTitle";
import { BodyDescription } from "./popupBodyDescription";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";
import categoryIconTest from './categoryIconTusovki.svg';
import { apiUrl } from "components/connections/apiUrl";

import hangIcon from './popupHangIcon.svg'
import acquaintanceIcon from './popupAcquaintanceIcon.svg';
import otherIcon from './popupOtherIcon.svg';
import sportIcon from './popupSportIcon.svg';
import commercIcon from './popupCommercIcon.svg';
import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";

type TProps = {
    data: BottleRequestType    
}

export const RightBarDescrBody:React.FC<TProps> = React.memo((props) => {
    const [categoryIcon, setCategoryIcon] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [photosContent, setPhotosContent] = useState(['']);
    const [timeLife, setTimeLife] = useState('0');
    const [address, setAddress] = useState('');

    useEffect(() => {
        async function getPhotos() {
            // console.log(props.data)
            if(!props.data || !props.data.contentIds || !props.data.isContentLoaded) {
                setPhotosContent([''])
                return;
            }

            let resultPhotosContent = Array<string>();
            for(let e of props.data.contentIds) {
                let response = await fetch(`${apiUrl}/api/bottles/${props.data.id}/content/${e}`, {                    
                    credentials: "include"
                });

                let blobImage = await response.blob();
                let resImage = URL.createObjectURL(blobImage);
                console.log(resImage)
                resultPhotosContent.push(resImage);
            }
            // console.log(resultPhotosContent)
            setPhotosContent(resultPhotosContent);
        }

        getPhotos();
    }, [props.data, props.data.id])


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
                break;
            default:
                setCategoryIcon(otherIcon);
                setCategoryType('other');
                break;                                
        }


    }, [props.data]);

    useEffect(() => {
        setAddress(props.data.address.split(',').slice(0,2).toString());

        calculateTime(props.data);
        let interval = setInterval(() => {            
            calculateTime(props.data);
        }, 10000);
        
        return () => clearInterval(interval);
    }, [props.data]);

    function calculateTime(data: BottleRequestType) {
        let offset = new Date().getTimezoneOffset();

        let endTime = new Date(data.endTime).getTime() / 1000 + (-offset * 60);        
        let delta = endTime - new Date().getTime() / 1000;

        if(delta > data.lifeTime) {
            delta -= -offset * 60;
        }
        console.log(delta)
        setTimeLife(convertTime(delta));
    }
    
    function convertTime(timeInSeconds : number) {
        let minutes = (timeInSeconds / 60).toFixed(0);
        let hours = '';
        if(+minutes > 59) {
            hours = Math.floor(+minutes / 60).toFixed(0);
            minutes = (+minutes % 60).toFixed(0);
        }
        return +hours === 0 ? `${minutes} мин`
            : +minutes === 0 ? `${hours} ч`
            : `${hours} ч ${minutes} мин`;
    }

    return <div className="right-bar-map-popup-body">
        <BodyTitle icon={categoryIcon} titleName={props.data.title} category={categoryType}/>
        <div className="right-bar-map-popup-body-info">
            <PopupBodyInfo className="addres" title="Адрес:" value={address}/>
            <PopupBodyInfo className="timeLeft" title="До конца мероприятия:" value={timeLife}/>
            {
                props.data.maxPickingUp === -1 ? 
                null
                : <PopupBodyInfo className="pickCount" title="Осталось мест:" value={props.data.maxPickingUp - props.data.pickingUp} />
            }            
        </div>
        <BodyDescription description={props.data.description} content={photosContent} bottleId={props.data.id} />
    </div>
})