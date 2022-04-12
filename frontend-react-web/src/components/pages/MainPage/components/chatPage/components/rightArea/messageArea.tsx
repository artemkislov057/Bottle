import React, { useEffect, useState } from "react";
import { ToolBarMessageArea } from "./messageAreaToolBar";
import { Message } from "./message";
import { WsDialogType } from "components/pages/MainPage/WsDialogType";
import { UserInfoType } from "components/pages/MainPage/UserInfoType";
import { WsGetMessageType } from "components/pages/MainPage/WsGetMessageType";

const testMEss = 'ББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББ Привет Привет ААААААААААА Привет Привет ААААААААААА Привет Привет ААААААААААА Привет Привет АААААААААААПривет Привет ААААААААААА Привет Привет АААААААААААПривет Привет ААААААААААА Привет Привет АААААААААААПривет Привет ААААААААААА Привет Привет АААААААААААПривет Привет ААААААААААА Привет Привет';

type TProps = {
    currentDialogData: {
        dialogInfo: WsDialogType;
        userInfo: UserInfoType;
        userAvatar: string;
    }
}

export const MessageArea:React.FC<TProps> = React.memo((props) => {
    let init : [{type: string, value:string, time: string, messId: number}];
    const [messages, setMessages] = useState(init);    

    useEffect(() => {
        async function getMessages() {
            let idResponse = await fetch(`https://localhost:44358/api/account`, {
                credentials: 'include',
            });
            let selfId : string  = await idResponse.json();

            let responseMessages = await fetch(`https://localhost:44358/api/dialogs/${props.currentDialogData.dialogInfo.id}/messages`, {
                credentials: 'include',
            });
            let allMessages = await responseMessages.json() as WsGetMessageType[];

            let items : [{type: string, value:string, time: string, messId: number}];
            for(let e of allMessages) {
                let messFrom = '';
                if(e.senderId === selfId) {
                    messFrom = 'self';
                } else {
                    messFrom = 'partner';
                }

                let currentTime = new Date(e.dateTime);
                let time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

                if(items) {
                    items.push({time: time, type: messFrom, value: e.value, messId: e.id});
                } else {
                    items = [{time: time, type: messFrom, value: e.value, messId: e.id}];
                }
            }
            console.log(allMessages)
            setMessages(items);
        }
        getMessages();
    }, [props]);

    useEffect(() => {
        if(!messages) return
        let allMessages = document.querySelectorAll('.chat-page-message-container-message');
        allMessages[allMessages.length - 1].scrollIntoView();
    },[messages]);

    return <div className="chat-page-right-message-area">
        <div className="chat-page-message-container-scroll">
            <div className="chat-page-message-container-HELP">
                <div className="chat-page-message-container">
                    {messages?.map(message => 
                        <Message key={message.messId} messageFrom={message.type} value={message.value} time={message.time}/>    
                        )}                    
                </div>
            </div>
        </div>
        <ToolBarMessageArea />
    </div>
})