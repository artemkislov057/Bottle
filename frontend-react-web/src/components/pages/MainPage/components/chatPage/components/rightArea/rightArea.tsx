import React, { useEffect, useState } from "react";
import './rightArea.css';
import { HeaderRightArea } from "./rightAreaHeader";
import { MessageArea } from "./messageArea";

import defaultAvatar from '../../../interfaceMainPage/components/rightBarProfile/defaultAvatar.svg';
import { WsDialogType } from "components/pages/MainPage/WsDialogType";
import { UserInfoType } from "components/pages/MainPage/UserInfoType";
import { WsGetMessageType } from "components/pages/MainPage/WsGetMessageType";

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

export const MessageAreaChat:React.FC<TProps> = React.memo((props) => {
    const [currentChat, setCurrentChat] = useState(
        <div className="chat-page-right-side-empty">
            <div className="chat-page-right-header-empty"></div>
            <div className="chat-page-right-message-area-empty"></div>
        </div>
    );
    useEffect(() => {
        if(props.currentDialogData) {
            setCurrentChat(
                <div className="chat-page-right-side">
                    <HeaderRightArea 
                        name={props.currentDialogData?.userInfo.nickname} 
                        rating={props.currentDialogData?.userInfo.rating.value} 
                        urlAvatar={props.currentDialogData?.userAvatar} />
                    <MessageArea currentDialogData={props.currentDialogData} newMessage={props.newMessage} setUpdateDialogsInfo={props.setUpdateDialogsInfo} updateDialogsInfo={props.updateDialogsInfo}/>
                </div>
            )
        }
        
    }, [props.currentDialogData])
    return <>
        {currentChat}
    </>
})