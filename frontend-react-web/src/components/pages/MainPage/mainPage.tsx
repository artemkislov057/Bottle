import React, { useState } from "react";
import { MapMainPage } from "./components/map/map";
import { InterfaceButtonMainPage } from "./components/interfaceMainPage/interfaceButton";
import L from 'leaflet';
import './mainPage.css';


import { ContextForSearch } from "./contextForSearch";

export const MainPage:React.FC = React.memo(() => {
    const [latLngForSearch, setLatLng] = useState(new L.LatLng(0,0));
    return <>
        <ContextForSearch.Provider value={[latLngForSearch, setLatLng]}>
            <InterfaceButtonMainPage>
                <MapMainPage />                    
            </InterfaceButtonMainPage>
        </ContextForSearch.Provider>    
    </>
})