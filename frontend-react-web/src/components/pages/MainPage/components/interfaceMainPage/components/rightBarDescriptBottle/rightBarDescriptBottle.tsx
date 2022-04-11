import React from "react";
import './rightBarDescriptBottle.css';

import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

import { RightBarHeader } from "../rightBar/header";
import { RightBarFooter } from "../rightBar/footer";
import { RightBarDescrBody } from "./rightBarDescriptBody";

import icon from './categoryIconTusovki.svg';

const tempLine = 'Описание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описание'

type TProps = {
    setSelfState: React.Dispatch<React.SetStateAction<JSX.Element>>,
    data: DataBottleDescType,
    onClickOpenDialog: Function,
}

export const RightBarDescrBottle:React.FC<TProps> = React.memo((props) => {
    function onClickBackToMap() {
        props.setSelfState(<></>);
    }

    function temp(){}

    return <div className="right-bar-map-popup-bottle">
        <RightBarHeader title="Записка" onClick={onClickBackToMap} />
        <RightBarDescrBody
            data={{
                address: props.data.address,
                content:props.data.content,
                countPick: props.data.countPick,
                description: props.data.description,
                timeLife: props.data.timeLife,
                titleName:props.data.titleName,
                bottleId: props.data.bottleId            
            }}            
        />
        <RightBarFooter title="Откликнуться" onClick={() => props.onClickOpenDialog(props.data.bottleId)} />
    </div>
})