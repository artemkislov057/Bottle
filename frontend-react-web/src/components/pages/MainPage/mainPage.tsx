import React from "react";
import { MapMainPage } from "./components/map/map";
import { InterfaceButtonMainPage } from "./components/interfaceMainPage/interfaceButton";
import './mainPage.css';

export const MainPage:React.FC = React.memo(() => {
    return <>
    <MapMainPage>
        <InterfaceButtonMainPage />
    </MapMainPage>
    </>
})