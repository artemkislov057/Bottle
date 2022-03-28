import React from "react";

type TProps = {
    className: string,
    title: string,
    value: string | number
}

export const PopupBodyInfo:React.FC<TProps> = React.memo((props) => {
    return <div className={`right-bar-map-popup-body-info-container ${props.className}`}>
        <div className={`right-bar-map-popup-body-info-container-title`}>{props.title}</div>
        <div className={`right-bar-map-popup-body-info-container-value`}>{props.value}</div>
    </div>
})