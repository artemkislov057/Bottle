import React from "react";
import changeIcon from '../leftBar/renameButtonIcon.svg';

export const ChangeButton:React.FC = React.memo(() => {
    return <div className="right-bar-map-my-bottles-item-information-change">
        <img className="right-bar-map-my-bottles-item-information-changeIcon" src={changeIcon} alt="change" />
        <div className="right-bar-map-my-bottles-item-information-changeText">Редактировать</div>
    </div>
})