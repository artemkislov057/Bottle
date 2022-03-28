import React from "react";
import './rightBarDescriptBottle.css';

import { RightBarHeader } from "../rightBar/header";
import { RightBarFooter } from "../rightBar/footer";
import { RightBarDescrBody } from "./rightBarDescriptBody";

export const RightBarDescrBottle:React.FC = React.memo(() => {
    function temp() {

    }

    return <div className="right-bar-map-popup-bottle">
        <RightBarHeader title="Записка" onClick={temp} />
        <RightBarDescrBody />
        <RightBarFooter title="Откликнуться" onClick={temp} />
    </div>
})