import React, { useEffect, useState } from "react";

type TProps = {
    urlAvatar: string,
    name: string,
    demoDescript: string,
    onClick: Function
    //мб id диалога, чтобы при нажатии делать запрос сообщений и радоваться
}

export const ChatUserItem:React.FC<TProps> = React.memo((props) => {    
    return <div className="chat-page-left-user-item" onClick={() => props.onClick()}>
        <img className="chat-page-left-user-item-avatar" src={props.urlAvatar} alt="аватар" />
        <div className="chat-page-left-user-item-info">
            <div className="chat-page-left-user-item-name">{props.name}</div>
            <div className="chat-page-left-user-item-description">{props.demoDescript}</div>
        </div>
    </div>
})