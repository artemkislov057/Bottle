import React, { useContext, useEffect, useRef, useState } from "react";
import { MapMainPage } from "./components/map/map";
import { InterfaceButtonMainPage } from "./components/interfaceMainPage/interfaceButton";
import { ChatPage } from "./components/chatPage/chatPage";
// import { WebSockets, ws } from "components/connections/ws";
import { Ws } from "components/connections/ws";
import { WsDataType } from "./WsDataType";
import L, { LatLng } from 'leaflet';
import './mainPage.css';
import { WsEventContext } from "./contextWsEvents";


import { ContextForSearch } from "./contextForSearch";
import { useNavigate } from "react-router-dom";
import { ContextLogin } from "loginContext";
import { CurrentCoordinationsContext } from "./changeCoordinationContext";

type TProps = {
    isLogin: boolean
}

export const MainPage:React.FC<TProps> = React.memo((props) => {
    let wsEv : MessageEvent<any>;
    const [wsEvent, setWsEvent] = useState(wsEv);
    const [questModal, setQuestModal] = useState(<></>);
    const navigator = useNavigate();
    const loginData = useContext(ContextLogin);
    // const WS = new Ws();
    // const ws = WS.ws;
    let WS: Ws;
    let ws: WebSocket;
    
    
    useEffect(() => {
        if(loginData.isLogin) {
            // WebSockets();
            WS = new Ws();
            ws = WS.ws;
            WS.WebSokets();

            ws.onmessage = (e) => {
                setWsEvent(e);
            }
        } else {
            navigator('/');
        }
    }, []);    
    
    const [currentLatLng, setCurrentLatLng] = useState(new LatLng(56.85, 60.6));
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
            <MapMainPage setQuestModal={setQuestModal}/>
        </InterfaceButtonMainPage>

    const [interfaceMainPageContainer, setInterfaceMainPage] = useState(interfaceMapContainer);

    function updateWsCoordinates(lat: number, lng: number) {
        console.log(lat, lng)
        setCurrentLatLng(new LatLng(lat, lng));
        if(WS)
            WS.updateCoordinates(lat, lng);
    }

    function openChatPage(dialogId? : number) {
        setBackgroundGray(<></>)
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
    
    return <div className="main-page">
        <CurrentCoordinationsContext.Provider value={{currentLatLng: currentLatLng, changeCoord: updateWsCoordinates}}>
            <ContextForSearch.Provider value={[latLngForSearch, setLatLng]}>
                <WsEventContext.Provider value={wsEvent}>
                    {interfaceMainPageContainer}
                    {chatPageContainer}
                    {questModal}
                    {backgroundGray}
                </WsEventContext.Provider>
            </ContextForSearch.Provider>
        </CurrentCoordinationsContext.Provider>        
    </div>
})