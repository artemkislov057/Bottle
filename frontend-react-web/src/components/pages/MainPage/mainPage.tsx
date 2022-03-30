import React, { useState } from "react";
import { MapMainPage } from "./components/map/map";
import { InterfaceButtonMainPage } from "./components/interfaceMainPage/interfaceButton";
import { ChatPage } from "./components/chatPage/chatPage";
import L from 'leaflet';
import './mainPage.css';


import { ContextForSearch } from "./contextForSearch";

export const MainPage:React.FC = React.memo(() => {
    const [latLngForSearch, setLatLng] = useState(new L.LatLng(0,0));
    const [backgroundGray, setBackgroundGray] = useState(<></>);
    const [interfaceMainPageContainer, setInterfaceMainPage] = useState(
        <InterfaceButtonMainPage backgroundState={setBackgroundGray} openChat={openChatPage}>                
            <MapMainPage />                 
        </InterfaceButtonMainPage>
    )
    const [chatPageContainer, setChatPageContainer] = useState(<></>);

    function openChatPage() {
        setInterfaceMainPage(<></>);
        setChatPageContainer(<ChatPage onClickOnMap={openMainPage} />);
    }

    function openMainPage() {
        setChatPageContainer(<></>);
        setInterfaceMainPage(
            <InterfaceButtonMainPage backgroundState={setBackgroundGray} openChat={openChatPage}>                
                <MapMainPage />                 
            </InterfaceButtonMainPage>
        )
    }
    
    return <>
        <ContextForSearch.Provider value={[latLngForSearch, setLatLng]}>
            {interfaceMainPageContainer}
            {chatPageContainer}
            {/* {backgroundGray} */}
        </ContextForSearch.Provider>    
    </>
})