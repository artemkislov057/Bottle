import React, { useEffect, useState } from "react";
import './chatPage.css';

import { LeftBar } from "../interfaceMainPage/components/leftBar/leftBar";
import { LeftBarChat } from "./components/leftBar/leftBarChatPage";
import { MessageAreaChat } from "./components/rightArea/rightArea";
import { ws } from "components/connections/ws";
import { WsDialogType } from "../../WsDialogType";
import { UserInfoType } from "../../UserInfoType";
import { WsGetMessageType } from "../../WsGetMessageType";

type TProps = {
    openMainLeftBar: React.MutableRefObject<() => void>,
    openDialogId?: number
}

type WsAnswer = {
    eventNumber: number,
    model: WsGetMessageType
}

export const ChatPage:React.FC<TProps> = React.memo((props) => {
    let init: {dialogInfo: WsDialogType, userInfo:UserInfoType, userAvatar: string};
    const [currentDialog, setCurrentDialog] = useState(init);
    let newMessInit : WsGetMessageType;
    const [newMessage, setNewMessage] = useState(newMessInit);
    const [updateDialogsInfo, setUpdateDialogsInfo] = useState(true);
    
    ws.onmessage = (e) => {
        let data = JSON.parse(e.data) as WsAnswer;
        // console.log(data)
        if(data.eventNumber === 1) {            
            if(data.model.dialogId === currentDialog?.dialogInfo.id) {
                setNewMessage(data.model);      
            }
            setUpdateDialogsInfo(!updateDialogsInfo);
        }

        //добавить обновление диалогов при появлении нового диалога
    }
        
    return <div className="chat-page-main">
        <LeftBarChat onClickOtherButton={props.openMainLeftBar.current} setCurrentDialog={setCurrentDialog} updateDialogsInfo={updateDialogsInfo} openDialogId={props.openDialogId}/>
        <MessageAreaChat currentDialogData={currentDialog} setCurrentDialog={setCurrentDialog} newMessage={newMessage} updateDialogsInfo={updateDialogsInfo} setUpdateDialogsInfo={setUpdateDialogsInfo}/>{/*put <- currentChat*/}
    </div>
})