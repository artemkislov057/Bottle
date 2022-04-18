import React, { useEffect, useState } from "react";
import changeAvatarIcon from '../leftBar/renameButtonIcon.svg';

type TProps = {
    urlAvatar: string
}

export const ProfileAvatarContainer:React.FC<TProps> = React.memo((props) => {
    const [currentAvatar, setCurrentAvatar] = useState('');

    useEffect(() => {
        setCurrentAvatar(props.urlAvatar)
    }, [props.urlAvatar]);

    async function changeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
        let newAvatar = e.target.files[0];

        let formData = new FormData()
        formData.append('file', newAvatar);

        let changeAvatarResponse = await fetch(`https://localhost:44358/api/account/avatar`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
        
        if (changeAvatarResponse.ok) {
            let fr = new FileReader();        
            fr.readAsDataURL(newAvatar);
            fr.onload = e => {
                setCurrentAvatar(e.target.result.toString())
            }
        }
    }

    return <div className="profile-map-body-avatar-container">
        <img className="profile-map-body-avatar" src={currentAvatar} alt='your avatar' />
        <div className="profile-map-body-change-avatar-cont">
            <img className="profile-map-body-change-avatar-icon" src={changeAvatarIcon} alt="icon button" />
            <label className="profile-map-body-change-avatar-button" htmlFor="map-body-change-avatar-button-input">Изменить</label>
            <input type={'file'} className="profile-map-body-change-avatar-button-input" id="map-body-change-avatar-button-input" onChange={(e) => changeAvatar(e)}/>
        </div>
    </div>
})