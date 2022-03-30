import React from "react";
import './chatPage.css';

import { LeftBar } from "../interfaceMainPage/components/leftBar/leftBar";
import { LeftBarChat } from "./components/leftBar/leftBarChatPage";
import { MessageAreaChat } from "./components/rightArea/rightArea"; 

type TProps = {
    onClickOnMap: Function,
}

export const ChatPage:React.FC<TProps> = React.memo((props) => {
    return <div className="chat-page-main">
        <LeftBarChat />
        <MessageAreaChat />        
    </div>
})