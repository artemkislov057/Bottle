import React from "react";
import './leftBarChatPage.css';
import { HeaderLeftBarChat } from "./headerLeftBarChat";
import { ChatUserItem } from "./chatUserItem";

import defaultAvatar from '../../../interfaceMainPage/components/rightBarProfile/defaultAvatar.svg';

export const LeftBarChat:React.FC = React.memo(() => {
    return <div className="chat-page-left-bar">
        <HeaderLeftBarChat />
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