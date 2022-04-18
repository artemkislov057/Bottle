import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";
import React from "react";
import deleteIcon from './deleteIcon.svg';

type TProps = {
    bottleData: BottleRequestType,
    onClickDelete: (bottleData: BottleRequestType) => void
}

export const DeleteButton:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-my-bottles-item-delete-container" onClick={() => props.onClickDelete(props.bottleData)}>
        <img className="right-bar-map-my-bottles-item-delete-icon" src={deleteIcon} alt="delete" />
    </div>
})