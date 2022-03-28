import React from "react";
import './rightBarMyBottles.css'
import { ListBottleItem } from "./listBottleItem";
import { RightBarHeader } from "../rightBar/header";

import commercIcon from './commercCategoryIcon.svg';
import hangIcon from './hangoutCategoryIcon.svg';
import meetIcon from './meetingCategoryIcon.svg';
import sportIcon from './sportCategoryIcon.svg';

type TProps = {
    setRightBarMyBottles: React.Dispatch<React.SetStateAction<JSX.Element>>,
    openLeftBar: Function
}


export const RightBarMyBottles:React.FC<TProps> = React.memo((props) => {
    function onClickBackButton() {
        props.setRightBarMyBottles(<></>);
        props.openLeftBar();
    }
    
    return <div className="right-bar-map-my-bottles">
        <RightBarHeader title="Мои записки" onClick={onClickBackButton} />
        <div className="right-bar-map-my-bottles-items">
            <ListBottleItem 
                title="Продам авто"
                demoDescript="Продам Продам Продам Продам Продам Продам"
                urlIcon={commercIcon}
            />
            <ListBottleItem 
                title="Тусовка"
                demoDescript="Продам Продам Продам Продам Продам Продам"
                urlIcon={hangIcon}
            />
            <ListBottleItem 
                title="Кино"
                demoDescript="Продам Продам Продам Продам Продам Продам"
                urlIcon={meetIcon}
            />
            <ListBottleItem 
                title="Баскетбол"
                demoDescript="Продам Продам Продам Продам Продам Продам"
                urlIcon={sportIcon}
            />
        </div>
    </div>
})