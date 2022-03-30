import React from "react";

type TProps = {
    urlAvatar: string,
    name: string,
    demoDescript: string
}

export const ChatUserItem:React.FC<TProps> = React.memo((props) => {
    return <div className="chat-page-left-user-item">
        <img className="chat-page-left-user-item-avatar" src={props.urlAvatar} alt="аватар" />
        <div className="chat-page-left-user-item-info">
            <div className="chat-page-left-user-item-name">{props.name}</div>
            <div className="chat-page-left-user-item-description">{props.demoDescript}</div>
        </div>
    </div>
})