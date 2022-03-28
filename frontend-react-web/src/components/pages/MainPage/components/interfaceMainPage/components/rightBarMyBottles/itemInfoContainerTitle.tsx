import React from "react";
import { ChangeButton } from "./changeButton";

type TProps = {
    title: string    
}

export const InfoContainerTitle:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-my-bottles-item-information-title-container">
        <div className="right-bar-map-my-bottles-item-information-title">
            {props.title}
        </div>
        <ChangeButton />
    </div>
})