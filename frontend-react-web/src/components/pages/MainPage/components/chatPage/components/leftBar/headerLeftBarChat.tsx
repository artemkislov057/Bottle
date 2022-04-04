import React from "react";
import { SearchFieldChat } from "./searchFieldLeftHeader";;

type TProps = {
    onClickOtherButton: Function
}

export const HeaderLeftBarChat:React.FC<TProps> = React.memo((props) => {
    return <div className="chat-page-left-header">
        <div className="chat-page-left-header-other-container">
            <button className="chat-page-left-header-other-button" onClick={() => props.onClickOtherButton()}></button>
        </div>
        <SearchFieldChat />        
    </div>
})