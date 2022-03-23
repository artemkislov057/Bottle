import React from "react";

type TProps = {
    urlIconItem: string,
    title: string,
    onClick: Function
}

export const LeftBarItem : React.FC<TProps> = React.memo((props) => {
    
    return <li className="left-bar-map-body-item" onClick={() => props.onClick()}>
        <img className="left-bar-map-body-item-icon" src={props.urlIconItem} alt={props.title}></img>
        <div className="left-bar-map-body-item-title">{props.title}</div>
    </li>
})