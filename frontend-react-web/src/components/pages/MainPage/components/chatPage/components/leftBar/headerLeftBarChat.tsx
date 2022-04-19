import React from "react";
import { SearchFieldChat } from "./searchFieldLeftHeader";;

type TProps = {
    onClickOtherButton: Function,
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const HeaderLeftBarChat:React.FC<TProps> = React.memo((props) => {
    return <div className="chat-page-left-header">
        <div className="chat-page-left-header-other-container">
            <button className="chat-page-left-header-other-button" onClick={() => props.onClickOtherButton()}></button>
        </div>
        <SearchFieldChat searchValue={props.searchValue} setSearchValue={props.setSearchValue}/>
    </div>
})