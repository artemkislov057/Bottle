import React from "react";
import './rightBarDescriptBottle.css';

import { RightBarHeader } from "../rightBar/header";
import { RightBarFooter } from "../rightBar/footer";
import { RightBarDescrBody } from "./rightBarDescriptBody";

import icon from './categoryIconTusovki.svg';

const tempLine = 'Описание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описаниеОписание описание'

export const RightBarDescrBottle:React.FC = React.memo(() => {
    function temp() {

    }
    return <div className="right-bar-map-popup-bottle">
        <RightBarHeader title="Записка" onClick={temp} />
        <RightBarDescrBody
            titleName="Ищу компанию, чтобы чтобы чтобы чтобы чтобы" 
            address="ул. Мира 32"
            timeLife={50}
            countPick={2}
            description={tempLine}
            content={[icon, icon]}
        />
        <RightBarFooter title="Откликнуться" onClick={temp} />
    </div>
})