import React from "react";
import { HeaderInfoRight } from "./headerInfo";

type TProps = {
    urlAvatar: string,
    name: string,
    rating: number
    onClickCloseDialog: Function,
    activeDialog: boolean,    
}

export const HeaderRightArea:React.FC<TProps> = React.memo((props) => {
    return <div className="chat-page-right-header">
        <HeaderInfoRight name={props.name} rating={props.rating} urlAvatar={props.urlAvatar}/>
        <div className="chat-page-right-header-exitButton-container">
            <button className="chat-page-right-header-exitButton" onClick={() => props.onClickCloseDialog()}>{props.activeDialog ? 'Завершить диалог' : 'Оценить собеседника'}</button>
        </div>            
    </div>
})