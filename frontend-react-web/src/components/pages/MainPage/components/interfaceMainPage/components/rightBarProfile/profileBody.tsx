import React from "react";
import { InputLableContainerProfileBar } from "./profileInputLabel";
import { ProfileAvatarContainer } from "./profileAvatarContainer";
import { ProfileRatingContainer } from "./profileRating";
import defaultAvatar from './defaultAvatar.svg';

export const ProfileBody:React.FC = React.memo(() => {
    return <div className="right-bar-profile-map-body">
        <ProfileAvatarContainer urlAvatar={defaultAvatar}/>
        <ProfileRatingContainer rating={4.5}/>
        <div className="profile-map-body-user-info-container">
            <InputLableContainerProfileBar labelName="Никнейм:" type="text" />
            <InputLableContainerProfileBar labelName="Почта:" type="email" />
            <InputLableContainerProfileBar labelName="Пароль:" type="password" />
        </div>
    </div>
})