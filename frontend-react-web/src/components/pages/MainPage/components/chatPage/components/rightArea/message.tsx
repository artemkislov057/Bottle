import React from "react";

type TProps = {
    messageFrom: string // self or partner,
    value: string,
    time: string,
    urlPhoto: string
}

export const Message:React.FC<TProps> = React.memo((props) => {
    return <div className={`chat-page-message-container-message ${props.messageFrom} ${props.urlPhoto? 'image' : ''}`}>
        {
            props.urlPhoto 
            ? <img className="chat-page-message-container-message-value-image" alt="contnent" src={props.urlPhoto}/>
            : <div className="chat-page-message-container-message-value">
                {props.value}
            </div>
        }
        <div className="chat-page-message-container-message-time">
            {props.time}
        </div>
    </div>
})