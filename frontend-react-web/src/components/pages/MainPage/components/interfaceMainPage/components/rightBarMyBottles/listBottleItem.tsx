import React from "react";

import { IconCategory } from "./iconCategory";
import { InfoContainerTitle } from "./itemInfoContainerTitle";
import { DeleteButton } from "./DeleteButton";

import changeIcon from '../leftBar/renameButtonIcon.svg';
import deleteItemIcon from './deleteIcon.svg';
import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";

type TProps = {
    title: string
    demoDescript: string,
    urlIcon: string,
    bottleData: BottleRequestType,
    onClickDelete: (bottleData: BottleRequestType) => void,
    onClickChange: Function
}

export const ListBottleItem:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-my-bottles-item">
        <IconCategory urlIcon={props.urlIcon}/>        
        <div className="right-bar-map-my-bottles-item-information-container">
            <InfoContainerTitle title={props.title} onClickChange={props.onClickChange}/>            
            <div className="right-bar-map-my-bottles-item-information-descritpion">
                {props.demoDescript}
            </div>
        </div>
        <DeleteButton bottleData={props.bottleData} onClickDelete={props.onClickDelete}/>
    </div>
})