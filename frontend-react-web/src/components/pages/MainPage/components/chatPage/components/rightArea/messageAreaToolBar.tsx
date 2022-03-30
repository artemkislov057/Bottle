import React from "react";

export const ToolBarMessageArea:React.FC = React.memo(() => {
    return <div className="chat-page-message-toolBar-area">
        <div className="chat-page-message-toolBar">
            <div className="chat-page-message-toolBar-data-container">
                <label className="chat-page-message-toolBar-data-helpLabel" htmlFor="toolBar-data-button"></label>
                <input type={"file"} className="chat-page-message-toolBar-data-button" id="toolBar-data-button"></input>
            </div>
            <form id="message-toolBar-form" className="chat-page-message-toolBar-form">
                <input className="chat-page-message-toolBar-input" type="text" />
            </form>
            <button className="chat-page-message-toolBar-send-button" type="submit" form="message-toolBar-form"></button>        
        </div>
    </div> 
})