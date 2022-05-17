import React, { useContext, useEffect, useState } from "react";
import './rightBarProfile.css';

import { apiUrl } from "components/connections/apiUrl";
import { RightBarHeader } from "../rightBar/header";
import { ProfileBody } from "./profileBody";
import { RightBarFooter } from "../rightBar/footer";
import { UserInfoType } from "components/pages/MainPage/UserInfoType";
import { useNavigate } from "react-router-dom";
import { ContextLogin } from "loginContext";

type TProps = {
    setStateRightProfileBar: React.Dispatch<React.SetStateAction<JSX.Element>>,
    openLeftBar: Function
}

export const RightBarProfile:React.FC<TProps> = React.memo((props) => {
    let navigator = useNavigate();
    let init : {info: UserInfoType, avatar: string}
    const [selfInfo, setSelfInfo] = useState(init);
    const [changedData, setChangedData] = useState({nickName: '', email: ''});
    const [changedPassword, setChangedPassword] = useState({oldPassword: '', newPassword: ''});
    const loginData = useContext(ContextLogin);

    useEffect(() => {
        async function getInformation() {
            let response = await fetch(`${apiUrl}/api/account`, {
                credentials: 'include',
            });
            let data = await response.json() as UserInfoType;

            let avatarRes = await fetch(`${apiUrl}/api/account/avatar`, {
                credentials: 'include',
            }); 
            let avatar = await avatarRes.blob();
            let resAvatar = URL.createObjectURL(avatar);
            setSelfInfo({
                info: {
                    commercialData: data.commercialData,
                    id: data.id,
                    nickname: data.nickname,
                    rating: data.rating,
                    sex: data.sex,
                    type: data.type,
                    email: data.email
                },
                avatar: resAvatar
            })            
        }

        getInformation();
    }, []);

    async function saveChanges() {
        if(!(changedData.email && changedData.nickName && (changedData.email !== selfInfo.info.email || changedData.nickName !== selfInfo.info.nickname)) && !changedPassword.oldPassword && !changedPassword.newPassword) {
            return
        }
        
        if(!(await changePassword())) return

        console.log('try save')
        fetch(`${apiUrl}/api/account`, {
            method: 'PATCH',
            body: JSON.stringify({
                commercialData: selfInfo.info.commercialData,
                id: selfInfo.info.id,
                nickname: changedData.nickName,
                rating: selfInfo.info.rating,
                sex: selfInfo.info.sex,
                type: selfInfo.info.type,
                email: changedData.email
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => onClickBackButton());
    }

    async function changePassword() {
        if(!(changedPassword.oldPassword && changedPassword.newPassword && changedPassword.oldPassword !== changedPassword.newPassword)) {
            return true;
        }
        
        let response = await fetch(`${apiUrl}/api/account/password`, {
            method: "POST",
            body: JSON.stringify({
                currentPassword: changedPassword.oldPassword,
                newPassword: changedPassword.newPassword
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok) {
            console.log('pass changed')
            return true
        }
        return false
    }

    function onClickBackButton() {
        props.setStateRightProfileBar(<></>);
        props.openLeftBar();
    }

    async function onClickLogoutButton() {
        let response = await fetch(`${apiUrl}/api/account/logout`, {
            method: "POST",
            credentials: 'include'
        });
        if(response.ok) {
            loginData.setIsLogin(false);
            navigator('/');
        } else {
            navigator('/mainPage');
        }
        
    }
    
    return <div className="right-bar-profile-map">
        <RightBarHeader title="Мой профиль" onClick={onClickBackButton} />
        <ProfileBody data={selfInfo} changedData={changedData} setChangedData={setChangedData} passwordData={changedPassword} setChangedPassword={setChangedPassword}/>
        <RightBarFooter title="Выйти" onClick={onClickLogoutButton} onClickSecondButton={saveChanges} secondTitle='Сохранить'/>
    </div>
})