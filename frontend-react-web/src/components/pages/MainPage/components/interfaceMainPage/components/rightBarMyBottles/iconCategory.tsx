import React from "react";

type TProps = {
    urlIcon: string
}

export const IconCategory:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-my-bottles-item-icon-container">
        <img className="right-bar-map-my-bottles-item-icon" src={props.urlIcon} alt="иконка категории"/>
    </div>
})