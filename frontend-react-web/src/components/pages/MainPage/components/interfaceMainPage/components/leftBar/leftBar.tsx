import React from "react";
import { LeftBarItem } from "./leftBarItem";
import { InfoUser } from "./infoUser";
import { UserRating } from "./userRating";
import './leftBar.css'

import onMapIcon from './onMap2.svg';
import chatIcon from './chat2.svg';
import createIcon from './createBottle.svg';
import myBottlesIcon from './myBottles.svg';
import commercIcon from './commerc.svg';
// import defaultAvatar from './defaultUserAvatar.svg';
import defaultAvatar from './defaultAvatar3.svg';
import copy from './copyR.svg';

type TProps = {
    setStateLeftBar: React.Dispatch<React.SetStateAction<JSX.Element>>,
    onClickCreateButton: Function,
    onClickProfileInfo: Function,
    onClickMyBottles: Function,
    onClickChat: Function,
    onClickMap: Function
    closeChat?: Function
}

export const LeftBar : React.FC<TProps> = React.memo((props) => {
    function closeLeftBar() {
        props.setStateLeftBar(<></>);
    }

    function onClickOnMapButton() {
        closeLeftBar();
        props.onClickMap();
        // if(props.closeChat)
        //     props.closeChat()
    }

    function onClickCreateBottleButton() {
        props.onClickCreateButton();
        onClickOnMapButton();
    }

    function onClickProfileInfo() {
        props.onClickProfileInfo();
        onClickOnMapButton()
    }

    function onClickMyBottles() {
        props.onClickMyBottles();
        onClickOnMapButton();
    }

    function onClickChatButton() {
        props.onClickChat();
        closeLeftBar();
    }

    return <div className="left-bar-map">
        <div className="left-bar-map-header" >
            <InfoUser avatarUrl={defaultAvatar} nameUser="Пользователь" onClick={onClickProfileInfo}/>
            <UserRating rating={4.5}/>
        </div>
        <div className="left-bar-map-body">
            <ul className="left-bar-map-body-items">
                <LeftBarItem urlIconItem={onMapIcon} title='На карту' onClick={onClickOnMapButton} />
                <LeftBarItem urlIconItem={chatIcon} title='Диалоги тет а тет' onClick={onClickChatButton} />
                <LeftBarItem urlIconItem={createIcon} title='Создать записку' onClick={onClickCreateBottleButton} />
                <LeftBarItem urlIconItem={myBottlesIcon} title='Мои записки' onClick={onClickMyBottles} />
                <LeftBarItem urlIconItem={commercIcon} title='Коммерческий аккаунт' onClick={onClickOnMapButton} />                
            </ul>
        </div>
        <div className="left-bar-map-footer">
            <img src={copy} alt="Booble for SKB><LAB" />
        </div>
    </div>
})