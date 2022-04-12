import React, { useState } from "react";

export const ToolBarMessageArea:React.FC = React.memo(() => {
    const [message, setMessage] = useState('');

    return <div className="chat-page-message-toolBar-area">
        <div className="chat-page-message-toolBar">
            <div className="chat-page-message-toolBar-data-container">
                <label className="chat-page-message-toolBar-data-helpLabel" htmlFor="toolBar-data-button"></label>
                <input type={"file"} className="chat-page-message-toolBar-data-button" id="toolBar-data-button"></input>
            </div>
            <form id="message-toolBar-form" className="chat-page-message-toolBar-form" onSubmit={e => {e.preventDefault(); console.log('send', message); setMessage('')}}>
                <input className="chat-page-message-toolBar-input" type="text" value={message} onChange={e => setMessage(e.target.value)}/>
            </form>
            <button className="chat-page-message-toolBar-send-button" type="submit" form="message-toolBar-form"></button>        
        </div>
    </div> 
})