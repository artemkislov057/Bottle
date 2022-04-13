import React, { useEffect, useRef, useState } from "react";
import { MapMainPage } from "./components/map/map";
import { InterfaceButtonMainPage } from "./components/interfaceMainPage/interfaceButton";
import { ChatPage } from "./components/chatPage/chatPage";
import { WebSockets, ws } from "components/connections/ws";
import { WsDataType } from "./WsDataType";
import L from 'leaflet';
import './mainPage.css';


import { ContextForSearch } from "./contextForSearch";

export const MainPage:React.FC = React.memo(() => {
    useEffect(() => {
        WebSockets();
    }, []);

    // ws.onmessage = (e) => {
    //     let data = JSON.parse(e.data) as WsDataType
    //     console.log(e.data)
    //     console.log(data)
    // }

    const [latLngForSearch, setLatLng] = useState(new L.LatLng(0,0));
    const [backgroundGray, setBackgroundGray] = useState(<></>);
    
    const openLeftMainBar = useRef();
    
    const [chatPageContainer, setChatPageContainer] = useState(<></>);

    const [interfaceMainPageContainer, setInterfaceMainPage] = useState(
        <InterfaceButtonMainPage 
                backgroundState={setBackgroundGray}
                openChat={openChatPage}
                openMap={openMainPage}
                openLeftMainBar={openLeftMainBar} >
            <MapMainPage />
        </InterfaceButtonMainPage>
    )    

    function openChatPage(dialogId? : number) {
        setInterfaceMainPage(
            <InterfaceButtonMainPage 
                backgroundState={setBackgroundGray} 
                openChat={openChatPage} 
                openMap={openMainPage}
                openLeftMainBar={openLeftMainBar} >
            </InterfaceButtonMainPage>
        );
        setChatPageContainer(<ChatPage openMainLeftBar={openLeftMainBar} openDialogId={dialogId}/>);
    }  
      
    function openMainPage() {
        setChatPageContainer(<></>);
        setInterfaceMainPage(
            <InterfaceButtonMainPage 
                    backgroundState={setBackgroundGray} 
                    openChat={openChatPage} 
                    openMap={openMainPage}
                    openLeftMainBar={openLeftMainBar} >
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