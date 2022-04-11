import React, { useEffect, useState } from "react";
import './leftBarChatPage.css';
import { HeaderLeftBarChat } from "./headerLeftBarChat";
import { ChatUserItem } from "./chatUserItem";

import defaultAvatar from '../../../interfaceMainPage/components/rightBarProfile/defaultAvatar.svg';

type TProps = {
    onClickOtherButton: Function
}

export const LeftBarChat:React.FC<TProps> = React.memo((props) => {
    const [chatUsers, setChatUsers] = useState(<></>);

    useEffect(() => {
        async function getChatUsers() {
            let response = await fetch('https://localhost:44358/api/dialogs', {
                credentials: 'include'
            });
            let users = await response.json();
            
        }

        getChatUsers();
    }, [])

    return <div className="chat-page-left-bar">
        <HeaderLeftBarChat onClickOtherButton={props.onClickOtherButton}/>{/*сделать поиск*/}
        <div className="chat-page-left-user-items">
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
            <ChatUserItem urlAvatar={defaultAvatar} name="Пользователь" demoDescript="demo demo demo demo"/>
        </div>
    </div>
})