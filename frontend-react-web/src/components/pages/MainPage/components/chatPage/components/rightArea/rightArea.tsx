import React from "react";
import './rightArea.css';
import { HeaderRightArea } from "./rightAreaHeader";
import { MessageArea } from "./messageArea";

import defaultAvatar from '../../../interfaceMainPage/components/rightBarProfile/defaultAvatar.svg';

export const MessageAreaChat:React.FC = React.memo(() => {    
    return <div className="chat-page-right-side">
        <HeaderRightArea name="Пользователь" rating={3.5} urlAvatar={defaultAvatar} />
        <MessageArea />        
    </div>
})