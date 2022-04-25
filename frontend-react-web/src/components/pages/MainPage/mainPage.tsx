import React, { useEffect, useRef, useState } from "react";
import { MapMainPage } from "./components/map/map";
import { InterfaceButtonMainPage } from "./components/interfaceMainPage/interfaceButton";
import { ChatPage } from "./components/chatPage/chatPage";
import { WebSockets, ws } from "components/connections/ws";
import { WsDataType } from "./WsDataType";
import L from 'leaflet';
import './mainPage.css';
import { WsEventContext } from "./contextWsEvents";


import { ContextForSearch } from "./contextForSearch";

export const MainPage:React.FC = React.memo(() => {
    let wsEv : MessageEvent<any>;
    const [wsEvent, setWsEvent] = useState(wsEv);  

    useEffect(() => {
        WebSockets();
    }, []);

    ws.onmessage = (e) => {
        setWsEvent(e);        
    }

    const [latLngForSearch, setLatLng] = useState(new L.LatLng(0,0));
    const [backgroundGray, setBackgroundGray] = useState(<></>);
    
    const openLeftMainBar = useRef();
    
    const [chatPageContainer, setChatPageContainer] = useState(<></>);

    const interfaceMapContainer = <InterfaceButtonMainPage 
                backgroundState={setBackgroundGray}
                openChat={openChatPage}
                openMap={openMainPage}
                openLeftMainBar={openLeftMainBar}
                >
            <MapMainPage />
        </InterfaceButtonMainPage>

    const [interfaceMainPageContainer, setInterfaceMainPage] = useState(interfaceMapContainer);

    function openChatPage(dialogId? : number) {
        setInterfaceMainPage(
            <InterfaceButtonMainPage
                backgroundState={setBackgroundGray} 
                openChat={openChatPage} 
                openMap={openMainPage}
                openLeftMainBar={openLeftMainBar}
                >
            </InterfaceButtonMainPage>
        );
        setChatPageContainer(<ChatPage openMainLeftBar={openLeftMainBar} openDialogId={dialogId} />);
    }  
      
    function openMainPage() {
        setChatPageContainer(<></>);
        setInterfaceMainPage(interfaceMapContainer);
    }
    
    return <>
        <ContextForSearch.Provider value={[latLngForSearch, setLatLng]}>
            <WsEventContext.Provider value={wsEvent}>
                {interfaceMainPageContainer}
                {chatPageContainer}
                {backgroundGray}
            </WsEventContext.Provider>            
        </ContextForSearch.Provider>    
    </>
})