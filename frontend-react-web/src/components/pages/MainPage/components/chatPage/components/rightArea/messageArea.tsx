import React, { useEffect, useState } from "react";
import { ToolBarMessageArea } from "./messageAreaToolBar";
import { Message } from "./message";
import { WsDialogType } from "components/pages/MainPage/WsDialogType";
import { UserInfoType } from "components/pages/MainPage/UserInfoType";
import { WsGetMessageType } from "components/pages/MainPage/WsGetMessageType";
import { apiUrl } from "components/connections/apiUrl"; 

type TProps = {
    currentDialogData: {
        dialogInfo: WsDialogType;
        userInfo: UserInfoType;
        userAvatar: string;
    },
    newMessage: WsGetMessageType,
    setUpdateDialogsInfo: React.Dispatch<React.SetStateAction<boolean>>,
    updateDialogsInfo: boolean
}


export const MessageArea:React.FC<TProps> = React.memo((props) => {
    let init : Array<{from: string, value:string, time: string, messId: number, photoUrl: string}>;
    const [messages, setMessages] = useState(init);    

    useEffect(() => {
        async function getMessages() {
            let idResponse = await fetch(`${apiUrl}/api/account`, {
                credentials: 'include',
            });
            let self  = await idResponse.json() as UserInfoType;
            let selfId = self.id

            let responseMessages = await fetch(`${apiUrl}/api/dialogs/${props.currentDialogData.dialogInfo.id}/messages`, {
                credentials: 'include',
            });
            let allMessages = await responseMessages.json() as WsGetMessageType[];

            let items : [{from: string, value:string, time: string, messId: number, photoUrl: string}];
            for(let e of allMessages) {
                let messFrom = '';
                if(e.senderId === selfId) {
                    messFrom = 'self';
                } else {
                    messFrom = 'partner';
                }

                let offset = new Date().getTimezoneOffset();
                let currentTimeInSeconds = new Date(e.dateTime).getTime() / 1000 + (-offset * 60);

                let currentTime = new Date(currentTimeInSeconds*1000);
                let time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
                time = currentTime.toLocaleTimeString().slice(0, -3);

                let urlPhoto = '';
                if(e.messageType) {
                    let getPhotoResponse = await fetch(`${apiUrl}/api/dialogs/content/${e.value}`, {
                        credentials: "include"
                    });
                    let blobPhoto = await getPhotoResponse.blob();
                    urlPhoto = URL.createObjectURL(blobPhoto);
                }

                if(items) {
                    items.push({time: time, from: messFrom, value: e.value, messId: e.id, photoUrl: urlPhoto});
                } else {
                    items = [{time: time, from: messFrom, value: e.value, messId: e.id, photoUrl: urlPhoto}];
                }
            }
            // console.log(allMessages)
            setMessages(items);
        }
        getMessages();
        
        if(props.currentDialogData.dialogInfo.active) {
            let messageInput = document.querySelector('.chat-page-message-toolBar-input') as HTMLElement;
            messageInput.focus();
        }
        
    }, [props.currentDialogData]);

    useEffect(() => {//scroll to last message
        if(!messages) return
        let allMessages = document.querySelectorAll('.chat-page-message-container-message');
        allMessages[allMessages.length - 1].scrollIntoView();

        // let messageContainer = document.querySelector('.chat-page-message-container-scroll');
        // messageContainer.scrollIntoView();
        
    },[messages]);

    useEffect(() => {  
        let newMessage = props.newMessage;

        async function setMessageWithPhoto(data: WsGetMessageType, time: string) {
            let getPhotoResponse = await fetch(`${apiUrl}/api/dialogs/content/${data.value}`, {
                credentials: "include"
            });
            let blobPhoto = await getPhotoResponse.blob();
            let urlPhoto = URL.createObjectURL(blobPhoto);

            if(messages) {
                setMessages([...messages, {messId:data?.id, time: time, from:'partner', value: data?.value, photoUrl: urlPhoto}]);
            } else {
                setMessages([{messId: data?.id, time: time, from:'partner', value: data?.value, photoUrl: urlPhoto}]);
            }
        }

        let currentTime = new Date(newMessage?.dateTime);
        let time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
        time = currentTime.toLocaleTimeString().slice(0, -3);

        if(newMessage?.messageType) {
            setMessageWithPhoto(newMessage, time);
        } else {
            if(messages) {
                setMessages([...messages, {messId:newMessage?.id, time: time, from:'partner', value: newMessage?.value, photoUrl: ''}]);
            } else {
                setMessages([{messId:newMessage?.id, time: time, from:'partner', value: newMessage?.value, photoUrl: ''}]);
            }
        }

    }, [props.newMessage])

    async function onSendMessage(value: string) {
        let response = await fetch(`${apiUrl}/api/dialogs/${props.currentDialogData.dialogInfo.id}`, {
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
            time = currentTime.toLocaleTimeString().slice(0, -3);
            if(messages)
                setMessages([...messages, {messId:collbackData.id, time: time, from:'self', value:value, photoUrl: ''}]);
            else setMessages([{messId:collbackData.id, time: time, from:'self', value:value, photoUrl: ''}]);
            props.setUpdateDialogsInfo(!props.updateDialogsInfo);
            // console.log(value, 'отправилось')
        }
    }

    async function onSendPhoto(value: File) {
        let formData = new FormData();
        formData.append('file', value);
        
        let response = await fetch(`${apiUrl}/api/dialogs/${props.currentDialogData.dialogInfo.id}/content`, {
            method: 'POST',
            body: formData,
            credentials: "include"
        });

        let collbackData = await response.json() as WsGetMessageType;

        let currentTime = new Date(collbackData.dateTime);
        let time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
        time = currentTime.toLocaleTimeString().slice(0, -3);

        let fr = new FileReader();
        fr.readAsDataURL(value);
        fr.onload = e => {
            let urlPhoto = e.target.result.toString();
            
            if(messages)
                setMessages([...messages, {messId:collbackData.id, time: time, from:'self', value: collbackData.value, photoUrl: urlPhoto}]);
            else setMessages([{messId:collbackData.id, time: time, from:'self', value: collbackData.value, photoUrl: urlPhoto}]);
            props.setUpdateDialogsInfo(!props.updateDialogsInfo);
        }
    }

    return <div className="chat-page-right-message-area">
        <div className="chat-page-message-container-scroll">
            <div className="chat-page-message-container-HELP">
                <div className="chat-page-message-container">
                    {messages?.map(message => 
                        <Message key={`${message.messId} ${props.currentDialogData.dialogInfo.id}`} messageFrom={message.from} value={message.value} time={message.time} urlPhoto={message.photoUrl}/>    
                        )}                    
                </div>
            </div>
        </div>
        <ToolBarMessageArea onSubmit={onSendMessage} onSendPhoto={onSendPhoto}/>
    </div>
})