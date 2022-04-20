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
    data: BottleRequestType,
    onClickOpenDialog: Function,
}

export const RightBarDescrBottle:React.FC<TProps> = React.memo((props) => {
    function onClickBackToMap() {
        props.setSelfState(<></>);
    }
    
    return <div className="right-bar-map-popup-bottle">
        <RightBarHeader title="Записка" onClick={onClickBackToMap} />
        <RightBarDescrBody
            data={props.data}            
        />
        <RightBarFooter title="Откликнуться" onClick={() => props.onClickOpenDialog(props.data.id)} />
    </div>
})