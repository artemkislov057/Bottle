import React from "react";

type TProps = {
    onClick: Function,
    title: string
}

export const RightBarHeader:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-header">
        <button className="right-bar-map-back-map-button" onClick={() => props.onClick()}></button>
        <h3 className="right-bar-map-create-title">{props.title}</h3>
    </div>
})