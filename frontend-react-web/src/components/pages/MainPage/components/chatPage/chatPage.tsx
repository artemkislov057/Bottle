import React, { useEffect, useState } from "react";
import './chatPage.css';

import { LeftBar } from "../interfaceMainPage/components/leftBar/leftBar";
import { LeftBarChat } from "./components/leftBar/leftBarChatPage";
import { MessageAreaChat } from "./components/rightArea/rightArea"; 

type TProps = {
    openMainLeftBar: React.MutableRefObject<() => void>
}

export const ChatPage:React.FC<TProps> = React.memo((props) => {    
    return <div className="chat-page-main">
        <LeftBarChat onClickOtherButton={props.openMainLeftBar.current}/>
        <MessageAreaChat />        
    </div>
})