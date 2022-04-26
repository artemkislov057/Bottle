import React, { useEffect, useState } from "react";
import { LeftBarItem } from "./leftBarItem";
import { InfoUser } from "./infoUser";
import { UserRating } from "./userRating";
import './leftBar.css';
import { apiUrl } from "components/connections/apiUrl";
import onMapIcon from './onMap2.svg';
import chatIcon from './chat2.svg';
import createIcon from './createBottle.svg';
import myBottlesIcon from './myBottles.svg';
import commercIcon from './commerc.svg';
// import defaultAvatar from './defaultUserAvatar.svg';
import defaultAvatar from './defaultAvatar3.svg';
import copy from './copyR.svg';
import { UserInfoType } from "components/pages/MainPage/UserInfoType";

type TProps = {
    setStateLeftBar: React.Dispatch<React.SetStateAction<JSX.Element>>,
    disableBackgroundGray: Function,
    onClickCreateButton: Function,
    onClickProfileInfo: Function,
    onClickMyBottles: Function,
    onClickChat: Function,
    onClickMap: Function
    closeChat?: Function
}

export const LeftBar : React.FC<TProps> = React.memo((props) => {
    const [userInfo, setUserInfo] = useState({avatar: '', name: '', rating: 0});

    useEffect(() => {
        async function getInformation() {
            let response = await fetch(`${apiUrl}/api/account`, {
                credentials: 'include',
            });
            let data = await response.json() as UserInfoType;

            let avatarRes = await fetch(`${apiUrl}/api/account/avatar`, {
                credentials: 'include',
            }); 
            let avatar = await avatarRes.blob();
            let resAvatar = URL.createObjectURL(avatar);
            setUserInfo({
                name: data.nickname,
                rating: data.rating.value,
                avatar: resAvatar
            })            
        }

        getInformation();
    }, []);


    function closeLeftBar() {        
        props.setStateLeftBar(<></>);        
    }

    function closeLeftAndSendToMap() {
        props.onClickMap();
        closeLeftBar();
    }

    function onClickOnMapButton() {
        closeLeftAndSendToMap();
        props.disableBackgroundGray();
        // if(props.closeChat)
        //     props.closeChat()
    }

    function onClickCreateBottleButton() {
        props.onClickCreateButton();
        closeLeftAndSendToMap();
        // onClickOnMapButton();
    }

    function onClickProfileInfo() {
        props.onClickProfileInfo();
        closeLeftAndSendToMap();
        // onClickOnMapButton()
    }

    function onClickMyBottles() {
        props.onClickMyBottles();
        closeLeftAndSendToMap();
        // onClickOnMapButton();
    }

    function onClickChatButton() {
        props.onClickChat();
        closeLeftBar();
    }

    return <div className="left-bar-map">
        <div className="left-bar-map-header" >
            <InfoUser avatarUrl={userInfo.avatar} nameUser={userInfo.name} onClick={onClickProfileInfo}/>
            <UserRating rating={userInfo.rating}/>
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