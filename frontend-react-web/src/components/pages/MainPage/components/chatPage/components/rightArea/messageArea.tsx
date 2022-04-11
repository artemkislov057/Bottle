import React, { useEffect } from "react";
import { ToolBarMessageArea } from "./messageAreaToolBar";
import { Message } from "./message";

const testMEss = 'ББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББ Привет Привет ААААААААААА Привет Привет ААААААААААА Привет Привет ААААААААААА Привет Привет АААААААААААПривет Привет ААААААААААА Привет Привет АААААААААААПривет Привет ААААААААААА Привет Привет АААААААААААПривет Привет ААААААААААА Привет Привет АААААААААААПривет Привет ААААААААААА Привет Привет';

export const MessageArea:React.FC = React.memo(() => {
    useEffect(() => {
        let a = document.querySelectorAll('.chat-page-message-container-message');
        a[18].scrollIntoView();
    },[])
    return <div className="chat-page-right-message-area">
        <div className="chat-page-message-container-scroll">
            <div className="chat-page-message-container-HELP">
                <div className="chat-page-message-container">
                    <Message messageFrom="partner" value="Аааааа" time="15:00"/>
                    <Message messageFrom="partner" value="Аа" time="15:01"/>
                    <Message messageFrom="self" value="Ааааааааааа" time="15:02"/>
                    <Message messageFrom="self" value="new message" time="15:03"/>
                    <Message messageFrom="self" value="new message" time="15:04"/>
                    <Message messageFrom="partner" value="Аааааа" time="15:00"/>
                    <Message messageFrom="partner" value="Аа" time="15:01"/>
                    <Message messageFrom="self" value="Ааааааааааа" time="15:02"/>
                    <Message messageFrom="self" value="new message" time="15:03"/>
                    <Message messageFrom="self" value="new message" time="15:04"/>
                    <Message messageFrom="partner" value="Аааааа" time="15:00"/>
                    <Message messageFrom="partner" value="Аа" time="15:01"/>
                    <Message messageFrom="self" value="Ааааааааааа" time="15:02"/>
                    <Message messageFrom="self" value="new message" time="15:03"/>
                    <Message messageFrom="self" value="new message" time="15:04"/>
                    <Message messageFrom="self" value="AAAAA" time="17:04"/>
                    <Message messageFrom="partner" value="AAAAA" time="17:05"/>
                    <Message messageFrom="partner" value={testMEss} time="17:06"/>
                    <Message messageFrom="self" value={testMEss} time="17:06"/>                    
                </div>
            </div>
        </div>
        <ToolBarMessageArea />        
    </div>
})