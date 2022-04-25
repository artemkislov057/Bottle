import React from "react";
import './rightBarDescriptBottle.css';

import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

import { RightBarHeader } from "../rightBar/header";
import { RightBarFooter } from "../rightBar/footer";
import { RightBarDescrBody } from "./rightBarDescriptBody";

import icon from './categoryIconTusovki.svg';
import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";

const tempLine = 'Описание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описание'

type TProps = {
    setSelfState: React.Dispatch<React.SetStateAction<JSX.Element>>,
    disableBackgroundGray: Function,
    data: BottleRequestType,
    onClickOpenDialog: Function,
    onClickOpenEdit?: Function
}

export const RightBarDescrBottle:React.FC<TProps> = React.memo((props) => {
    function onClickBackToMap() {
        props.setSelfState(<></>);
        props.disableBackgroundGray()
    }

    if(props.onClickOpenEdit) {
        console.log(props.data)
        return <div className="right-bar-map-popup-bottle">
            <RightBarHeader title="Записка" onClick={onClickBackToMap} />
            <RightBarDescrBody
                data={props.data}            
            />
            <RightBarFooter title="Редактировать" onClick={() => props.onClickOpenEdit(props.data)} />
        </div>   
    }
    
    return <div className="right-bar-map-popup-bottle">
        <RightBarHeader title="Записка" onClick={onClickBackToMap} />
        <RightBarDescrBody
            data={props.data}            
        />
        <RightBarFooter title="Откликнуться" onClick={() => props.onClickOpenDialog(props.data.id)} />
    </div>
})