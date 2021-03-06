import React, { useEffect, useState } from "react";

type TProps = {
    onSubmit: Function,
    onSendPhoto: Function
}

export const ToolBarMessageArea:React.FC<TProps> = React.memo((props) => {
    const [message, setMessage] = useState('');

    function clearBufferInput() {
        let inputField = document.getElementById('toolBar-data-button') as HTMLInputElement;
        inputField.value = '';
    }

    useEffect(() => {
        setMessage('')
    }, [props.onSubmit])

    return <div className="chat-page-message-toolBar-area">
        <div className="chat-page-message-toolBar">
            <div className="chat-page-message-toolBar-data-container">
                <label className="chat-page-message-toolBar-data-helpLabel" htmlFor="toolBar-data-button"></label>
                <input type={"file"} className="chat-page-message-toolBar-data-button" id="toolBar-data-button" onChange={e => {props.onSendPhoto(e.target.files[0]); clearBufferInput()} }></input>
            </div>
            <form id="message-toolBar-form" className="chat-page-message-toolBar-form"                
                onSubmit={e => {
                        e.preventDefault(); 
                        if(message !== '') {                            
                            props.onSubmit(message);
                            setMessage('')
                        }                        
                    }}>
                <input className="chat-page-message-toolBar-input" type="text" value={message} onChange={e => setMessage(e.target.value)} />
            </form>
            <button className="chat-page-message-toolBar-send-button" type="submit" form="message-toolBar-form"></button>        
        </div>
    </div> 
})