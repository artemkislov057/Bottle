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
    },
    newMessage: WsGetMessageType,    
}

export const MessageArea:React.FC<TProps> = React.memo((props) => {
    let init : [{type: string, value:string, time: string, messId: number}];
    const [messages, setMessages] = useState(init);    

    useEffect(() => {
        async function getMessages() {
            let idResponse = await fetch(`https://localhost:44358/api/account`, {
                credentials: 'include',
            });
            let self  = await idResponse.json() as UserInfoType;
            let selfId = self.id

            let responseMessages = await fetch(`https://localhost:44358/api/dialogs/${props.currentDialogData.dialogInfo.id}/messages`, {
                credentials: 'include',
            });
            let allMessages = await responseMessages.json() as WsGetMessageType[];
            console.log(selfId, 'свой id')
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

    useEffect(() => {//scroll to last message
        if(!messages) return
        let allMessages = document.querySelectorAll('.chat-page-message-container-message');
        allMessages[allMessages.length - 1].scrollIntoView();
    },[messages]);

    useEffect(() => {
        let newMessage = props.newMessage;
        let currentTime = new Date(newMessage?.dateTime);
        let time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
        
        
        if(messages) {
            //@ts-ignore
            setMessages([...messages, {messId:newMessage?.id, time: time, type:'self', value: newMessage?.value}]);////////////
        } else {
            setMessages([{messId:newMessage?.id, time: time, type:'self', value: newMessage?.value}]);
        }
            
    }, [props.newMessage])

    async function onSendMessage(value: string) {
        let response = await fetch(`https://localhost:44358/api/dialogs/${props.currentDialogData.dialogInfo.id}`, {
            method: 'POST',
            body: JSON.stringify(value),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        let collbackData = await response.json() as WsGetMessageType;
        if(response.status) {
            let currentTime = new Date(collbackData.dateTime);
            let time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
            
            //@ts-ignore
            setMessages([...messages, {messId:collbackData.id, time: time, type:'self', value:value}]);////////////
        }
        console.log(value)
    }

    return <div className="chat-page-right-message-area">
        <div className="chat-page-message-container-scroll">
            <div className="chat-page-message-container-HELP">
                <div className="chat-page-message-container">
                    {messages?.map(message => 
                        <Message key={`${message.messId} ${props.currentDialogData.dialogInfo.id}`} messageFrom={message.type} value={message.value} time={message.time}/>    
                        )}                    
                </div>
            </div>
        </div>
        <ToolBarMessageArea onSubmit={onSendMessage}/>
    </div>
})