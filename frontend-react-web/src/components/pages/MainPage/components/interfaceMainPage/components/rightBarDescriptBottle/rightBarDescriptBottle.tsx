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
    data: DataBottleDescType    
}

export const RightBarDescrBottle:React.FC<TProps> = React.memo((props) => {
    function onClickBackToMap() {
        props.setSelfState(<></>);
    }

    function temp(){}

    return <div className="right-bar-map-popup-bottle">
        <RightBarHeader title="Записка" onClick={onClickBackToMap} />
        <RightBarDescrBody
            titleName={props.data.titleName}
            address={props.data.address}
            countPick={props.data.countPick}
            timeLife={props.data.timeLife}
            description={props.data.description}
            content={props.data.content}
        />
        <RightBarFooter title="Откликнуться" onClick={temp} />
    </div>
})