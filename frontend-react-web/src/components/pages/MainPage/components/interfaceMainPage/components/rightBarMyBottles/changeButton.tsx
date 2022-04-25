import React from "react";
import changeIcon from '../leftBar/renameButtonIcon.svg';

type TProps = {
    onClickChange: Function
}

export const ChangeButton:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-my-bottles-item-information-change" onClick={() => props.onClickChange()}>
        <img className="right-bar-map-my-bottles-item-information-changeIcon" src={changeIcon} alt="change" />
        <div className="right-bar-map-my-bottles-item-information-changeText">Редактировать</div>
    </div>
})