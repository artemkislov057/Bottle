import React from "react";
import renameIcon from './renameButtonIcon.svg'

type TProps = {
    avatarUrl: string,
    nameUser: string,
    onClick: Function
}

export const InfoUser:React.FC<TProps> = React.memo((props) => {
    return <div className="left-bar-map-header-info">
        <div className="left-bar-map-header-info-avatar-container">
            <img className="left-bar-map-header-info-avatar" src={props.avatarUrl} alt="Your avatar" />
        </div>        
        <div className="left-bar-map-header-info-name-container">
            <h3 className="left-bar-map-header-info-name">{props.nameUser}</h3>
            <div className="left-bar-map-header-info-rename-button" onClick={() => props.onClick()}>
                 <img className="rename-button-icon" src={renameIcon} alt='rename icon'></img>
                 <div className="rename-button-title">Редактировать</div>
            </div>
        </div>
    </div>
})