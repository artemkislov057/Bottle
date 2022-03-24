import React from "react";
import './rightBar.css';

import { RightBarHeader } from "./header";
import { RightBarBody } from "./body";
import { RightBarFooter } from "./footer";

type TProps = {
    setStateRightBar: React.Dispatch<React.SetStateAction<JSX.Element>>
}

export const RightBar:React.FC<TProps> = React.memo((props) => {
    function onClickBackToMapButton() {
        props.setStateRightBar(<></>);
    }
    return <div className="right-bar-map">
        <RightBarHeader onClick={onClickBackToMapButton} />
        <RightBarBody />
        <RightBarFooter />
    </div>
})