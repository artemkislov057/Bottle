import React from "react";

type TProps = {
    icon: string,
    titleName: string,
    category: string
}

export const BodyTitle:React.FC<TProps> = React.memo((props) => {
    return <div className={`right-bar-map-popup-body-title ${props.category}`}>
        <img className="right-bar-map-popup-body-title-icon" src={props.icon} alt="category icon" />
        <div className="right-bar-map-popup-body-title-name">{props.titleName}</div>
    </div>    
})