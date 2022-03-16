import React from "react";
import './interfaceButton.css';

export const InterfaceButtonMainPage:React.FC = React.memo(() => {
    return <>
        <button className="profile-button-mainPage">Profile</button>
        <select className="filter-select-mainPage">
            <option>Все</option>
            <option>Тусовки</option>
            <option>Продажи</option>
        </select>
        <input type={"search"} className="search-field-mainPage"></input>
        <button className="chat-button-mainPage">Chat</button>
        <button className="create-bottle-button-mainPage">Create bottle</button>
    </>
})