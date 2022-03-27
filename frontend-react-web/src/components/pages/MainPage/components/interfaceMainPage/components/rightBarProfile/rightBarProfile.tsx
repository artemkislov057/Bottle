import React from "react";
import './rightBarProfile.css';

import { RightBarHeader } from "../rightBar/header";
import { ProfileBody } from "./profileBody";
import { RightBarFooter } from "../rightBar/footer";

type TProps = {
    setStateRightProfileBar: React.Dispatch<React.SetStateAction<JSX.Element>>,
    openLeftBar: Function
}

export const RightBarProfile:React.FC<TProps> = React.memo((props) => {
    function temp() {

    }

    function onClickBackButton() {
        props.setStateRightProfileBar(<></>);
        props.openLeftBar();
    }
    
    return <div className="right-bar-profile-map">
        <RightBarHeader title="Мой профиль" onClick={onClickBackButton} />
        <ProfileBody />
        <RightBarFooter title="Сохранить" onClick={temp} />
    </div>
})