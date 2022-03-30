import React from "react";
import { HeaderInfoRight } from "./headerInfo";

type TProps = {
    urlAvatar: string,
    name: string,
    rating: number
}

export const HeaderRightArea:React.FC<TProps> = React.memo((props) => {
    return <div className="chat-page-right-header">
        <HeaderInfoRight name={props.name} rating={props.rating} urlAvatar={props.urlAvatar}/>
        <div className="chat-page-right-header-exitButton-container">
            <button className="chat-page-right-header-exitButton">Завершить диалог</button>
        </div>            
    </div>
})