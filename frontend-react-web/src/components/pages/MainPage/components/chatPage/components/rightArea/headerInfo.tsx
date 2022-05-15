import React from "react";
import { UserRating } from "../../../interfaceMainPage/components/leftBar/userRating";

type TProps = {
    urlAvatar: string,
    name: string,
    rating: number,
    onClickBack?: Function
}

export const HeaderInfoRight:React.FC<TProps> = React.memo((props) => {
    return <div className="chat-page-right-header-info">
        <img className="chat-page-right-header-avatar" src={props.urlAvatar} alt="avatar" />
        <div className="chat-page-right-header-name">{props.name}</div>
        <UserRating rating={props.rating} width="40px" fontSize="17px"/>
    </div>
})