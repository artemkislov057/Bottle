import React from "react";
import changeAvatarIcon from '../leftBar/renameButtonIcon.svg';

type TProps = {
    urlAvatar: string
}

export const ProfileAvatarContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="profile-map-body-avatar-container">
        <img className="profile-map-body-avatar" src={props.urlAvatar} alt='your avatar' />
        <div className="profile-map-body-change-avatar-cont">
            <img className="profile-map-body-change-avatar-icon" src={changeAvatarIcon} alt="icon button" />
            <div className="profile-map-body-change-avatar-button">Изменить</div>
        </div>
    </div>
})