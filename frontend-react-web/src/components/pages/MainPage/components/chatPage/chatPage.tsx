import React, { useEffect, useState } from "react";
import './chatPage.css';

import { LeftBar } from "../interfaceMainPage/components/leftBar/leftBar";
import { LeftBarChat } from "./components/leftBar/leftBarChatPage";
import { MessageAreaChat } from "./components/rightArea/rightArea";
import { ws } from "components/connections/ws";

type TProps = {
    openMainLeftBar: React.MutableRefObject<() => void>
}

export const ChatPage:React.FC<TProps> = React.memo((props) => {
    ws.onmessage = (e) => {
        console.log(e)
    }
    return <div className="chat-page-main">
        <LeftBarChat onClickOtherButton={props.openMainLeftBar.current}/>
        <MessageAreaChat />
    </div>
})