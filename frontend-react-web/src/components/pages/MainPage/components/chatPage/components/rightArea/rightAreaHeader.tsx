import React, { useContext, useEffect, useState } from "react";
import { HeaderInfoRight } from "./headerInfo";
import { ContextWindowResolution } from "windoResolutionContext";

type TProps = {
    urlAvatar: string,
    name: string,
    rating: number
    onClickCloseDialog: Function,
    activeDialog: boolean,
    onClickBackToChats: Function
}

export const HeaderRightArea:React.FC<TProps> = React.memo((props) => {
    const windowWidth = useContext(ContextWindowResolution);
    const [currentWidth, setCurrentWidth] = useState(1920);

    useEffect(() => {
        if(windowWidth < 701) {
            setCurrentWidth(windowWidth)
        }
    }, [windowWidth]);

    return <div className="chat-page-right-header">
        {currentWidth < 701 
            ? <div className="chat-page-right-header-back-button-mobile" onClick={() => props.onClickBackToChats()}></div>
            : null
        }
        <HeaderInfoRight name={props.name} rating={props.rating} urlAvatar={props.urlAvatar}/>
        <div className="chat-page-right-header-exitButton-container">
            {/* <button className="chat-page-right-header-exitButton" onClick={() => props.onClickCloseDialog()}>{props.activeDialog ? 'Завершить диалог' : 'Оценить собеседника'}</button> */}
            <button className="chat-page-right-header-exitButton" onClick={() => props.onClickCloseDialog()}></button>
        </div>            
    </div>
})