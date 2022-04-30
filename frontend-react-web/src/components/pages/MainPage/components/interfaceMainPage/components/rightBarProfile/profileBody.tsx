import React, { useEffect, useState } from "react";
import { InputLableContainerProfileBar } from "./profileInputLabel";
import { ProfileAvatarContainer } from "./profileAvatarContainer";
import { ProfileRatingContainer } from "./profileRating";
import defaultAvatar from './defaultAvatar.svg';
import { UserInfoType } from "components/pages/MainPage/UserInfoType";

type TProps = {
    data: {
        info: UserInfoType;
        avatar: string;
    },    
    changedData: {
        nickName: string;
        email: string;
    },
    setChangedData: React.Dispatch<React.SetStateAction<{
        nickName: string;
        email: string;
    }>>
}

export const ProfileBody:React.FC<TProps> = React.memo((props) => {
    const [nickName, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');//пустое поле

    function onChangeNickName(e: React.ChangeEvent<HTMLInputElement>) {
        setNickName(e.target.value);
        props.setChangedData({email:props.changedData.email, nickName: e.target.value});
    }

    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        props.setChangedData({email: e.target.value, nickName: props.changedData.nickName});
    }
    
    function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    useEffect(() => {
        if(props.data?.info.nickname)
            setNickName(props.data?.info.nickname);
        if(props.data?.info.email)
            setEmail(props.data?.info.email);
        props.setChangedData({email:props.data?.info.email, nickName: props.data?.info.nickname})
    }, [props.data]);

    return <div className="right-bar-profile-map-body">
        <ProfileAvatarContainer urlAvatar={props.data?.avatar}/>
        <ProfileRatingContainer rating={props.data?.info.rating.value}/>
        <div className="profile-map-body-user-info-container">
            <InputLableContainerProfileBar labelName="Никнейм:" type="text" value={nickName} onChange={onChangeNickName}/>
            <InputLableContainerProfileBar labelName="Почта:" type="email" value={email} onChange={onChangeEmail}/>
            <InputLableContainerProfileBar labelName="Пароль:" type="password" value={password} onChange={onChangePassword}/>
        </div>
    </div>
})