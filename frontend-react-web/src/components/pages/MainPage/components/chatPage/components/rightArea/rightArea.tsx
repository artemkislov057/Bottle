import React, { useEffect, useRef, useState } from "react";
import './rightArea.css';
import { HeaderRightArea } from "./rightAreaHeader";
import { MessageArea } from "./messageArea";
import { apiUrl } from "components/connections/apiUrl";

import defaultAvatar from '../../../interfaceMainPage/components/rightBarProfile/defaultAvatar.svg';
import { WsDialogType } from "components/pages/MainPage/WsDialogType";
import { UserInfoType } from "components/pages/MainPage/UserInfoType";
import { WsGetMessageType } from "components/pages/MainPage/WsGetMessageType";
import { ChatModal } from "../chatModal/ChatModal";
import { CloseDialogQuestModal } from "../closeDialogQuestModal/closeDialogQuestModal";

type TProps = {
    currentDialogData: {
        dialogInfo: WsDialogType;
        userInfo: UserInfoType;
        userAvatar: string;        
    },
    setCurrentDialog: React.Dispatch<React.SetStateAction<{
        dialogInfo: WsDialogType;
        userInfo: UserInfoType;
        userAvatar: string;
    }>>,
    newMessage: WsGetMessageType,
    setUpdateDialogsInfo: React.Dispatch<React.SetStateAction<boolean>>,
    updateDialogsInfo: boolean,
    backToChatsList?: Function
}

export const MessageAreaChat:React.FC<TProps> = React.memo((props) => {
    const initRigthArea = 
        <div className="chat-page-right-side-empty">
            <div className="chat-page-right-header-empty"></div>
            <div className="chat-page-right-message-area-empty"></div>
        </div>;

    const [currentChat, setCurrentChat] = useState(
        initRigthArea
    );

    // const [rateModal, setRateModal] = useState(<></>);
    const rateModal = useRef(<></>);
    const [closeQuestModal, setCloseQuestModal] = useState(<></>);
    let init :{value: number, id: number};
    const [rateValue, setRateValue] = useState(init);    

    useEffect(() => {
        if(props.currentDialogData) {
            console.log(props.currentDialogData);
            if(closeQuestModal !== <></>) {
                
            }
            if(!props.currentDialogData.dialogInfo.active) {
                console.log('this dialog has been closed');
                ratePartner(props.currentDialogData.dialogInfo.id, props.currentDialogData?.userInfo.nickname);
            } else {
                rateModal.current = (<div></div>);                
            }
            
            setCurrentChat(                
                <div className="chat-page-right-side">
                    <HeaderRightArea 
                        name={props.currentDialogData?.userInfo.nickname} 
                        rating={props.currentDialogData?.userInfo.rating.value} 
                        urlAvatar={props.currentDialogData?.userAvatar}
                        activeDialog={props.currentDialogData.dialogInfo.active}
                        onClickCloseDialog={() => {
                            if(props.currentDialogData.dialogInfo.active) {
                                // return closeDialog(props.currentDialogData.dialogInfo.id, props.currentDialogData?.userInfo.nickname);
                                return openCloseQuestModal(props.currentDialogData.dialogInfo.id, props.currentDialogData?.userInfo.nickname);
                            }
                            return ratePartner(props.currentDialogData.dialogInfo.id, props.currentDialogData?.userInfo.nickname);
                        }}
                        onClickBackToChats={props.backToChatsList}
                    />
                    <MessageArea 
                        currentDialogData={props.currentDialogData} 
                        newMessage={props.newMessage} 
                        setUpdateDialogsInfo={props.setUpdateDialogsInfo} 
                        updateDialogsInfo={props.updateDialogsInfo} 
                    />
                    {closeQuestModal}
                    {rateModal.current}
                </div>
            )
        }
    }, [props.currentDialogData, props.newMessage, props.updateDialogsInfo, props.currentDialogData?.dialogInfo.active, closeQuestModal]);

    function openCloseQuestModal(id: number, name: string) {
        console.log('open modal')
        setCloseQuestModal(<CloseDialogQuestModal
            onStayButton={() => setCloseQuestModal(<></>)}
            onCloseButton={() => {
                setCloseQuestModal(<></>);
                closeDialog(id, name);
            }}
        />);
    }

    async function closeDialog(id: number, name: string) {
        console.log('fuck')
        let response = await fetch(`${apiUrl}/api/dialogs/${id}/close`, {
            method: 'POST',
            credentials: 'include',
        });
        if(response.ok) {
            console.log('close');
            
            props.setCurrentDialog({...props.currentDialogData, dialogInfo:{...props.currentDialogData.dialogInfo, active: false}});
            props.setUpdateDialogsInfo(!props.updateDialogsInfo);
            // ratePartner(id, name);
        }        
    }

    async function ratePartner(id: number, name: string) {
        // setRateModal(<ChatModal id={id} setRate={setRateValue}/>);
        rateModal.current = <ChatModal id={id} partnerName={name} setRate={setRateValue}/>;
    }

    useEffect(() => {
        if(!rateValue || rateValue?.value < 1 || rateValue?.value > 5) return;
        async function responseRatePartner() {
            let responseRate = await fetch(`${apiUrl}/api/dialogs/${rateValue?.id}/rating`, {
                method: 'POST',
                body: JSON.stringify(rateValue.value),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            
            if(responseRate.ok) {
                console.log('rate')
                props.setUpdateDialogsInfo(!props.updateDialogsInfo);
                props.setCurrentDialog(null);
                setCurrentChat(initRigthArea)
                // setRateModal(<></>);
                rateModal.current = <></>;
            }
            setRateValue(init);
        }

        responseRatePartner();
    }, [rateValue?.value]);

    return <>
        {currentChat}
    </>
})