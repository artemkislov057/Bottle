import React, { useContext, useEffect, useMemo, useState } from "react";
import './interfaceButton.css';
import { LeftBar } from "./components/leftBar/leftBar";
import { RightBar } from "./components/rightBar/rightBar";
import { HelpSearchContainer } from "./components/helpSearchContainer/helpSearchContainer";
import { RightBarProfile } from "./components/rightBarProfile/rightBarProfile";
import { RightBarMyBottles } from "./components/rightBarMyBottles/rightBarMyBottles";
import { ContextForCreateBottleMarker } from "../../contextForCreateBottleMarker";
import { BottleRequestType } from "../../BottleRequestType";
// import { ws } from "components/connections/ws";
import { WsDataType } from "../../WsDataType";
import { wsBottle } from "./components/wsBottle";
import { SelectCategory } from "./components/selectCategory/selectCategory";
import { WsEventContext } from "../../contextWsEvents";
import { apiUrl } from "components/connections/apiUrl";
import { Select } from "./components/mainComponents/select";
import { CreateButton } from "./components/mainComponents/createButton";
import { Toolbar } from "./components/mainComponents/toolbar";
import { ExitCreateButton } from "./components/mainComponents/exitCreateModeButton";

import { DataBottleDescType } from "../../DataBottleDescriptType";

import { RightBarDescrBottle } from "./components/rightBarDescriptBottle/rightBarDescriptBottle";
import { LatLng } from "leaflet";
import { CSSTransition } from "react-transition-group";
import { CurrentCoordinationsContext } from "../../changeCoordinationContext";
import { CommercPart } from "./components/commercPart/commercPart";
import { MapModal } from "../questModal/questModal";
import timeModalIcon from '../questModal/timeModalIcon.svg';
import bottleModalIcon from '../questModal/bottleModalIcon.svg';
import { UserInfoType } from "../../UserInfoType";

type TProps = {    
    backgroundState: React.Dispatch<React.SetStateAction<JSX.Element>>,
    openChat: Function,
    openMap: Function,
    openLeftMainBar: React.MutableRefObject<() => void>,
    setQuestModal: React.Dispatch<React.SetStateAction<JSX.Element>>
    setShowQuestModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const InterfaceButtonMainPage:React.FC<TProps> = React.memo((props) => {
    const [leftbarState, setLeftBar] = useState(<></>);    
    const [rightbarState, setRightBar] = useState(<></>);
    const [rightbarProfileState, setRightBarProfile] = useState(<></>);
    const [rightBarMyBottles, setRightBarMyBottles] = useState(<></>);
    const [rightBarPopup, setRightBarPopup] = useState(<></>);
    const [commercBar, setCommercBar] = useState(<div className="show-commerc-part"></div>);
    const leftRightBarsStates = [setLeftBar, setRightBar, setRightBarProfile, setRightBarMyBottles, setRightBarPopup, setCommercBar];
    const wsEvent = useContext(WsEventContext);
    const[currentFilterCategory, setcurrentFilterCategory] = useState('Все категории');

    let initObj : BottleRequestType;
    let initObjForSelfCreate : DataBottleDescType;
    const [dataBottleDescription, setDataBottleDesc] = useState(initObjForSelfCreate);

    const [bottlesOnMap, setBottlesOnMap] = useState([{data: initObj, coordinates: new LatLng(null, null)}]);
    const [constBottlesOnMap, setConstBottlesOnMap] = useState([{data: initObj, coordinates: new LatLng(null, null)}]);

    const [select, setSelect] = useState(<Select currentCategory={currentFilterCategory} setCategory={setcurrentFilterCategory} />);
    const [toolbar, setToolbar] = useState(<Toolbar onClick={onClickOpenLeftBar} withOtherButton={true}/>);
    const [createButton, setCreateButton] = useState(<CreateButton onClick={() => onClickOpenRightBar()} />);
    const [exitCreateButton, setExitCreateButton] = useState(<></>);
    const {currentLatLng} = useContext(CurrentCoordinationsContext);

    const [showLeftBar, setShowLeftBar] = useState(false);
    const [showRightBar, setShowRightBar] = useState(false);
    const [showProfileBar, setShowProfileBar] = useState(false);
    const [showMyBottlesBar, setShowMyBottlesBar] = useState(false);
    const [showPopupBar, setShowPopupBar] = useState(false);
    const [showCommercBar, setShowCommercBar] = useState(false);

    

    let showBarsDict: Map<React.Dispatch<React.SetStateAction<JSX.Element>>, React.Dispatch<React.SetStateAction<boolean>>> = new Map();
    showBarsDict.set(setLeftBar, setShowLeftBar);
    showBarsDict.set(setRightBar, setShowRightBar);
    showBarsDict.set(setRightBarProfile, setShowProfileBar);
    showBarsDict.set(setRightBarMyBottles, setShowMyBottlesBar);
    showBarsDict.set(setRightBarPopup, setShowPopupBar);
    showBarsDict.set(setCommercBar, setShowCommercBar);

    useEffect(() => { // при обновлении стр получение всех бутылок
        if(!props.children) return;
        async function getAllBottles() {
            let res = await fetch(`${apiUrl}/api/bottles?radius=100&lat=${currentLatLng.lat}&lng=${currentLatLng.lng}`, {
                credentials: 'include'
            });
            
            let bottles = await res.json() as Array<BottleRequestType>;
            if(bottles.length < 1) {
                return
            }
            console.log(bottles)
            let newBottles : [{data: BottleRequestType, coordinates: LatLng}] = [null];
            for(let e of bottles) {
                let currentBottleData: BottleRequestType = {
                    active: e.active,
                    created: e.created,
                    endTime: e.endTime,
                    geoObjectName: e.geoObjectName,
                    isContentLoaded: e.isContentLoaded,
                    lat: e.lat,
                    lng: e.lng,
                    maxPickingUp: e.maxPickingUp,
                    userId: e.userId,
                    address: e.address,
                    contentIds: e.contentIds,
                    contentItemsCount: e.contentIds?.length,
                    // pickingUp: e.maxPickingUp - e.pickingUp,//
                    pickingUp: e.pickingUp,
                    description: e.description,
                    lifeTime: e.lifeTime,
                    title: e.title,
                    id: e.id,
                    category: e.category
                }
                if (newBottles[0] === null) {
                    newBottles = [{coordinates: new LatLng(e.lat, e.lng), data: currentBottleData}];
                } else {                    
                    newBottles.push({coordinates: new LatLng(e.lat, e.lng), data: currentBottleData});
                }
            }
            setConstBottlesOnMap(newBottles);
            setBottlesOnMap(newBottles);
        }
        console.log('update')
        getAllBottles();

        return () => {
            setBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}]);
            setConstBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}]);
        }
    }, [props.children]);//

    useEffect(() => {
        if(!props.children) return;
        async function getAllBottles() {
            let res = await fetch(`${apiUrl}/api/bottles?radius=100&lat=${currentLatLng.lat}&lng=${currentLatLng.lng}`, {
                credentials: 'include'
            });
            
            let bottles = await res.json() as Array<BottleRequestType>;
            if(bottles.length < 1) {
                setBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}]);
                setConstBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}]);
                return
            }
            console.log(bottles)
            let newBottles : [{data: BottleRequestType, coordinates: LatLng}] = [null];
            for(let e of bottles) {
                let currentBottleData: BottleRequestType = {
                    active: e.active,
                    created: e.created,
                    endTime: e.endTime,
                    geoObjectName: e.geoObjectName,
                    isContentLoaded: e.isContentLoaded,
                    lat: e.lat,
                    lng: e.lng,
                    maxPickingUp: e.maxPickingUp,
                    userId: e.userId,
                    address: e.address,
                    contentIds: e.contentIds,
                    contentItemsCount: e.contentIds?.length,
                    pickingUp: e.pickingUp,
                    description: e.description,
                    lifeTime: e.lifeTime,
                    title: e.title,
                    id: e.id,
                    category: e.category
                }
                if (newBottles[0] === null) {
                    newBottles = [{coordinates: new LatLng(e.lat, e.lng), data: currentBottleData}];
                } else {
                    newBottles.push({coordinates: new LatLng(e.lat, e.lng), data: currentBottleData});
                }
            }
            setConstBottlesOnMap(newBottles);
            setBottlesOnMap(newBottles);           
        }
        
        console.log('update coord')
        getAllBottles();

        // return () => {
        //     setBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}]);
        //     setConstBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}]);
        // }
    }, [currentLatLng]);//

    useEffect(() => {
        if(!currentFilterCategory) return;
        if(currentFilterCategory === 'Все категории') {
            setBottlesOnMap(constBottlesOnMap);
            return;
        }
        let filteredBottles = [];
        for(let e of constBottlesOnMap) {
            if(e.data?.category === currentFilterCategory) {
                filteredBottles.push(e);
            }
        }
        setBottlesOnMap(filteredBottles);

    }, [currentFilterCategory])

    useEffect(() => {
        wsBottle({bottleOnMap: bottlesOnMap, setBotMap: setBottlesOnMap, constBotMap: constBottlesOnMap, setConstBottle: setConstBottlesOnMap, currentCategory: currentFilterCategory}, wsEvent);
    }, [wsEvent]);    
       
    useEffect(() => {//for chat?
        props.openLeftMainBar.current = onClickOpenLeftBar
    }, []);

    function onClickOpenLeftBar() {
        setShowLeftBar(true);
        closeOtherBars(setLeftBar);
        enableBackgroundGray();
        setLeftBar(<LeftBar
            setStateLeftBar={setLeftBar} 
            onClickCreateButton={onClickOpenRightBar}
            onClickProfileInfo={onClickProfileInfofromLeft}
            onClickMyBottles={onClickMyBottles}
            onClickChat={props.openChat}
            onClickMap={props.openMap}
            onClickCommercBar={tryOpenCommercPart}
            disableBackgroundGray={disableBackgroundGray}
            setShowLeftBar={setShowLeftBar}
            closeCommercPart={closeCommercPart}
        />)
    }

    async function onClickOpenRightBar(changeBottleData?: BottleRequestType, currentData?: DataBottleDescType) {
        let userInfo =  await getUserInfo();
        if(userInfo.isCommercial) {
            let accessCountBottles = await getCurrentCountMyBottles();
            if(userInfo.maxBottlesCount - accessCountBottles < 1) {
                props.setQuestModal(<MapModal 
                    imageUrl={bottleModalIcon}
                    titleQuest='У вас закончились бутылочки :( Приобретите еще!'
                    onClickOkButton={() => {
                        props.setShowQuestModal(false);
                        disableBackgroundGray();
                    }}
                />)
                props.setShowQuestModal(true);
                return;
            }
        } else if(!changeBottleData && !currentData) {
            if((await getCurrentCountMyBottles()) > 0) {
                props.setQuestModal(<MapModal 
                    imageUrl={bottleModalIcon}
                    titleQuest='Вы не можете создать больше одной бутылки :('
                    onClickOkButton={() => {
                        props.setShowQuestModal(false);
                        disableBackgroundGray();
                    }}
                />)
                props.setShowQuestModal(true);
                return;
            }
        }

        closeOtherBars(setRightBar);
        enableBackgroundGray();
        setRightBar(<RightBar 
            setStateRightBar={setRightBar} 
            disableBackgroundGray={disableBackgroundGray} 
            changeBottleData={changeBottleData} 
            currentBottleData={currentData}
            closeThis={closeRightBar}
            />);
        setShowRightBar(true);
    }

    function onClickProfileInfofromLeft() {
        setShowProfileBar(true);
        closeOtherBars(setRightBarProfile);
        setRightBarProfile(<RightBarProfile 
            setStateRightProfileBar={setRightBarProfile}
            openLeftBar={onClickOpenLeftBar}
            closeThis={closeProfileBar}    
        />)
    }

    function onClickMyBottles() {
        setShowMyBottlesBar(true);
        closeOtherBars(setRightBarMyBottles);
        setRightBarMyBottles(<RightBarMyBottles 
            setRightBarMyBottles={setRightBarMyBottles}
            openLeftBar={onClickOpenLeftBar}
            openChangeRightBar={onClickOpenRightBar}
            closeThis={closeMyBottlesBar}
            setQuestModal={props.setQuestModal}
            setShowQuestModal={props.setShowQuestModal}
        />)
    }    
    
    function onClickOpenPopup(data: BottleRequestType, onClickEdit?: Function) {
        closeOtherBars(setRightBarPopup);
        enableBackgroundGray();
        setRightBarPopup(<RightBarDescrBottle
            setSelfState={setRightBarPopup}
            data={data}
            onClickOpenDialog={openPartnerChat}
            disableBackgroundGray={disableBackgroundGray}
            onClickOpenEdit={onClickEdit}
            closeThis={closePopupBar}
            />)
        setShowPopupBar(true);
    }

    async function tryOpenCommercPart() {
        let userInfo = await getUserInfo();

        if(!userInfo.isCommercial && !userInfo.commercialData) {
            //для обычного пользователя раздел коммерции
            onClickOpenCommercPart(true);
            return
        }
        
        if(!userInfo.isCommercial && userInfo.commercialData) {
            props.setQuestModal(<MapModal 
                imageUrl={timeModalIcon}
                titleQuest='Еще чуть чуть... Пока что мы проверяем ваши данные'
                onClickOkButton={() => {
                    props.setShowQuestModal(false);
                    disableBackgroundGray();
                }}
            />)
            props.setShowQuestModal(true);
            return;
        }

        onClickOpenCommercPart();
    }

    function onClickOpenCommercPart(isOrdinary?: boolean) {
        closeOtherBars(setCommercBar);
        disableBackgroundGray();
        setCommercBar(<CommercPart 
            openLeftBar={onClickOpenLeftBar}
            closeThis={closeCommercPart}
            isOrdinary={isOrdinary || false}
            />)
        setShowCommercBar(true);
    }

    async function getUserInfo() {
        let responseUserInfo = await fetch(`${apiUrl}/api/account`, {
            credentials: "include"
        });
        let userData = await responseUserInfo.json() as UserInfoType;
        return userData;
    }

    async function getCurrentCountMyBottles() {
        let responseBottles = await fetch(`${apiUrl}/api/bottles/my`, {
            credentials: "include"
        });
        let bottles = await responseBottles.json() as Array<BottleRequestType>;
        return bottles.length;
    }

    function enableBackgroundGray() {
        props.backgroundState(<div className="background-gray"></div>);
    }

    function disableBackgroundGray() {
        props.backgroundState(<></>);
    }

    function closeProfileBar() {
        setShowProfileBar(false);
    }

    function closePopupBar() {
        setShowPopupBar(false);
    }

    function closeMyBottlesBar() {
        setShowMyBottlesBar(false);
    }

    function closeRightBar() {
        setShowRightBar(false);
    }

   function closeCommercPart() {
       setShowCommercBar(false);
    //    setCommercBar(<></>);
   } 

    function closeOtherBars(currentBar: React.Dispatch<React.SetStateAction<JSX.Element>> = null) {
        for(let e of leftRightBarsStates) {
            if(e !== currentBar) {
                // e(<></>);
                if(showBarsDict.get(e))
                    showBarsDict.get(e)(false);
                // setShowLeftBar(false)
            }
        }
    }

    function openPartnerChat(id : number) {
        console.log(id)
        fetch(`${apiUrl}/api/bottles/${id}/pick-up`, {
            method: 'POST',            
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json().then(res => {
            console.log(res);
            let result = res as {dialogId : number};
            closeOtherBars()
            props.openChat(result.dialogId);
        }))
    }

    function hideMainComponents() {
        setSelect(<></>);
        setToolbar(<Toolbar onClick={onClickOpenLeftBar} withOtherButton={false}/>);
        setCreateButton(<></>);
    }

    function showMainComponents() {
        setSelect(<Select currentCategory={currentFilterCategory} setCategory={setcurrentFilterCategory} />);
        setToolbar(<Toolbar onClick={onClickOpenLeftBar} withOtherButton={true}/>);
        setCreateButton(<CreateButton onClick={() => onClickOpenRightBar()} />);
    }

    function startBottleCreateMode(data: DataBottleDescType, map: L.Map) {
        hideMainComponents();
        setExitCreateButton(<ExitCreateButton onClick={() => backToCreateBottle(data, map)} setSelf={setExitCreateButton} />);
    }

    function backToCreateBottle(data: DataBottleDescType, map: L.Map) {
        map.removeEventListener('click');
        exitBottleCreateMode();
        onClickOpenRightBar(null, data);
    }

    function exitBottleCreateMode() {
        showMainComponents();
        setExitCreateButton(<></>);
    }    

    return <div className="interface-button-container">
        {select}
        {toolbar}
        {createButton}
        {exitCreateButton}
        <CSSTransition
            in={showLeftBar}
            timeout={300}
            classNames='show-left-bar'
            unmountOnExit
        >
            {leftbarState}
        </CSSTransition>                
        <ContextForCreateBottleMarker.Provider
            value={{
                openDescriptionBar: onClickOpenPopup, 
                data: dataBottleDescription, 
                setData: setDataBottleDesc,
                bottlesOnMap: bottlesOnMap,
                openEditRightBar: onClickOpenRightBar,
                startCreateMode: startBottleCreateMode,
                exitCreateMode: exitBottleCreateMode
        }}>
            <CSSTransition
                in={showRightBar}
                timeout={300}
                classNames='show-right-bar'
                unmountOnExit
            >
                {rightbarState}
            </CSSTransition>            
            {props.children} {/*map*/}
        </ContextForCreateBottleMarker.Provider>
        <CSSTransition
            in={showProfileBar}
            timeout={300}
            classNames='show-profile-bar'
            unmountOnExit
        >
            {rightbarProfileState}
        </CSSTransition>
        <CSSTransition
            in={showMyBottlesBar}
            timeout={300}
            classNames='show-myBottles-bar'
            unmountOnExit
        >
            {rightBarMyBottles}
        </CSSTransition>
        <CSSTransition
            in={showPopupBar}
            timeout={300}
            classNames='show-popup-bar'
            unmountOnExit
        >
            {rightBarPopup}
        </CSSTransition>
        <CSSTransition
            in={showCommercBar}
            timeout={300}
            classNames='show-commerc-part'
            unmountOnExit
        >
            {commercBar}
        </CSSTransition>
    </div>
})