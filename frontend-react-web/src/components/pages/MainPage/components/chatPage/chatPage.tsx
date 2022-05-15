import React, { useContext, useEffect, useState } from "react";
import './chatPage.css';

import { LeftBar } from "../interfaceMainPage/components/leftBar/leftBar";
import { LeftBarChat } from "./components/leftBar/leftBarChatPage";
import { MessageAreaChat } from "./components/rightArea/rightArea";
// import { ws } from "components/connections/ws";
import { WsDialogType } from "../../WsDialogType";
import { UserInfoType } from "../../UserInfoType";
import { WsGetMessageType } from "../../WsGetMessageType";
import { WsEventContext } from "../../contextWsEvents";
import { ContextWindowResolution } from "windoResolutionContext";

type TProps = {
    openMainLeftBar: React.MutableRefObject<() => void>,
    openDialogId?: number,    
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
    const wsEvent = useContext(WsEventContext);

    const windowWidth = useContext(ContextWindowResolution);
    const [currentWidth, setCurrentWidth] = useState(windowWidth);

    const [mobileState, setMobileState] = useState(<div className="chat-page-main">
                                                        <LeftBarChat 
                                                            onClickOtherButton={props.openMainLeftBar.current} 
                                                            setCurrentDialog={setCurrentDialog} 
                                                            updateDialogsInfo={updateDialogsInfo} 
                                                            openDialogId={props.openDialogId}
                                                            mobileClass={'mobile'}
                                                        />            
                                                    </div>);

    useEffect(() => {
        setCurrentWidth(windowWidth)
    }, [windowWidth]);
        
    useEffect(() => {
        // console.log(wsEvent)
        if(!wsEvent)return
        let data = JSON.parse(wsEvent.data) as WsAnswer;
        if(data.eventNumber === 1) { //new message
            console.log(data)
            if(data.model.dialogId === currentDialog?.dialogInfo.id) {
                setNewMessage(data.model);
            }
            setUpdateDialogsInfo(!updateDialogsInfo);
        }
        if(data.eventNumber === 4 || data.eventNumber === 2) { //появился новый диалог или закрылся какой то
            setUpdateDialogsInfo(!updateDialogsInfo);
            console.log(data.eventNumber, data.model.id, currentDialog?.dialogInfo.id)
            if(data.model.id === currentDialog?.dialogInfo.id && data.eventNumber === 2) {
                setCurrentDialog({...currentDialog, dialogInfo: {...currentDialog.dialogInfo, active: false}});
            }
        }
    }, [wsEvent]);

    useEffect(() => {
        console.log('меняется')
    }, [updateDialogsInfo])

    function backToChatsList() {
        setMobileState(<div className="chat-page-main">
            <LeftBarChat 
                onClickOtherButton={props.openMainLeftBar.current} 
                setCurrentDialog={setCurrentDialog} 
                updateDialogsInfo={updateDialogsInfo} 
                openDialogId={props.openDialogId}
                mobileClass={'mobile'}
            />           
        </div>)
    }

    useEffect(() => {
        if(currentDialog) {
            setMobileState(<div className="chat-page-main">
                {/* <LeftBarChat 
                    onClickOtherButton={props.openMainLeftBar.current} 
                    setCurrentDialog={setCurrentDialog} 
                    updateDialogsInfo={updateDialogsInfo} 
                    openDialogId={props.openDialogId}
                    mobileClass={'mobile'}
                /> */}
                <MessageAreaChat 
                    currentDialogData={currentDialog} 
                    setCurrentDialog={setCurrentDialog} 
                    newMessage={newMessage} 
                    updateDialogsInfo={updateDialogsInfo} 
                    setUpdateDialogsInfo={setUpdateDialogsInfo}
                    backToChatsList={backToChatsList}
                />
            </div>)
        }
    }, [currentDialog])

    if(currentWidth < 701) {        
        return <>
            {mobileState}
        </>
    }
        
    return <div className="chat-page-main">
        <LeftBarChat 
            onClickOtherButton={props.openMainLeftBar.current} 
            setCurrentDialog={setCurrentDialog} 
            updateDialogsInfo={updateDialogsInfo} 
            openDialogId={props.openDialogId}
            mobileClass=''
        />
        <MessageAreaChat 
            currentDialogData={currentDialog} 
            setCurrentDialog={setCurrentDialog} 
            newMessage={newMessage} 
            updateDialogsInfo={updateDialogsInfo} 
            setUpdateDialogsInfo={setUpdateDialogsInfo}
        />
    </div>
})