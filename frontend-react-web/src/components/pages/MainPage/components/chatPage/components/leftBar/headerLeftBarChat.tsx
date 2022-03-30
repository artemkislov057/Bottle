import React from "react";
import { SearchFieldChat } from "./searchFieldLeftHeader";;

export const HeaderLeftBarChat:React.FC = React.memo(() => {
    return <div className="chat-page-left-header">
        <div className="chat-page-left-header-other-container">
            <button className="chat-page-left-header-other-button"></button>
        </div>
        <SearchFieldChat />        
    </div>
})