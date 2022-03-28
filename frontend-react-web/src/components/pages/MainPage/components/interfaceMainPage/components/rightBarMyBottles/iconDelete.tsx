import React from "react";
import deleteIcon from './deleteIcon.svg';

export const IconDelete:React.FC = React.memo(() => {
    return <div className="right-bar-map-my-bottles-item-delete-container">
        <img className="right-bar-map-my-bottles-item-delete-icon" src={deleteIcon} alt="delete" />
    </div>
})